import { useEffect, useRef, useState} from 'react';
import CryptoDetails from './CryptoDetails';
import CryptoChart from './CryptoChart';


export interface Props {
  eachCurrency: string | null;
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
  const ws = useRef<any | null>(null);
  const currentCrypto = useRef< any | null>(null);
  const [tickerInfo, setTickerInfo] = useState<Ticker>({} as Ticker);

  useEffect( ()=>{
    if (!props.firstRender) {
      return;
    }
    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com')

    if (props.eachCurrency !== null) {
      console.log('TESTERRRRRRRR curCryp', currentCrypto.current, 'EachCur', props.eachCurrency[0])
      currentCrypto.current = props.eachCurrency[0];
      if (currentCrypto.current !== props.eachCurrency[0] ) {
        //unsubscribe from currentcrypto
        let unsubscribe: Wsmsg = {
          type: "unsubscribe",
          product_ids: [ currentCrypto.current ],
          channels: ["ticker"]
        };
        let unsub: string = JSON.stringify(unsubscribe)
        ws.current.disconnect()
        currentCrypto.current = props.eachCurrency[0];
        //set current to props.eachCurrency
      }


      ws.current.onopen = ()=> {
        const msg: Wsmsg = {
          type: "subscribe",
          product_ids: [ currentCrypto.current ],
          channels: ["ticker"]
        };

        const msgJson: string = JSON.stringify(msg);

        ws.current.send(msgJson);
        ws.current.onmessage = function(e: any) {
          console.log(`[message] Data received from server${e.data}`);
          let data: any = JSON.parse(e.data)
          if (currentCrypto !== data.product_id) {
            return;
          } else {
            let ticker: Ticker = {
              token: data.product_id,
              price: data.price,
              open_24h: data.open_24h,
              volume_24h: data.volume_24h,
              low_24h: data.low_24h,
              volume_30d: data.volume_30d
            };
            setTickerInfo(ticker)
          }
        };
    };

    }

  }, [props.firstRender, props.eachCurrency, ws, currentCrypto])


  return (
    <div>
      <h1>{currentCrypto.current}</h1>
      <CryptoChart eachCurrency={props.eachCurrency} getCryptoURL={props.getCryptoURL} firstRender={props.firstRender}/>
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;