import { useEffect, useRef, useState} from 'react';
import CryptoDetails from './CryptoDetails';
import CryptoChart from './CryptoChart';


export interface Props {
  ws: any;
  eachCurrency: any[];
  getCryptoURL: string;
  firstRender: {}
};

type Ticker = {
  token: string | null,
  price: string | null,
  open_24h: string | null,
  volume_24h: string | null,
  low_24h: string | null,
  volume_30d: string | null
};


type Wsmsg = {
  type: string;
  product_ids?: any;
  channels: any[]
}

const CryptoInfo = (props: Props) => {
  const currentCrypto = useRef< any | null>(null);
  const [tickerInfo, setTickerInfo] = useState<Ticker>({} as Ticker);
  let {firstRender, eachCurrency, ws} = props;

  useEffect( ()=>{
    if (!firstRender) {
      return;
    }
   ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com')

      currentCrypto.current = eachCurrency[0];

      ws.current.onopen = ()=> {
        const msg: Wsmsg = {
          type: "subscribe",
          product_ids: [currentCrypto.current],
          channels: ["ticker"]
        };

        const msgJson: string = JSON.stringify(msg);

        ws.current.send(msgJson);
        ws.current.onmessage = function(e: any) {
          console.log(`[message] Data received from server${e.data}`);
          let data: any = JSON.parse(e.data)
          if (currentCrypto.current === data.product_id) {
            let ticker: Ticker = {
              token: data.product_id,
              price: data.price,
              open_24h: data.open_24h,
              volume_24h: data.volume_24h,
              low_24h: data.low_24h,
              volume_30d: data.volume_30d
            };
            setTickerInfo(ticker)
          } else {
            return;
          }
        };

    }

  }, [firstRender, eachCurrency, ws, currentCrypto])

  return (
    <div>
      <h1>{currentCrypto.current}</h1>
      <CryptoChart eachCurrency={props.eachCurrency} getCryptoURL={props.getCryptoURL} firstRender={props.firstRender}/>
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;