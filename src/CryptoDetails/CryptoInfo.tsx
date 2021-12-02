import { useEffect, useRef, useState} from 'react';
import CryptoDetails from './CryptoDetails';
import CryptoChart from './CryptoChart';

export interface Props {
  eachCurrency: string | null;
  getCryptoURL: string;
  firstRender: {}
};

type Ticker= {
  open: string | null,
  high: string | null,
  low: string | null,
  volume: string | null,
  last: string | null
};

type Wsmsg = {
  type: string;
  product_ids: (string | null)[];
  channels: any[]
}

const CryptoInfo = (props: Props) => {
  const ws = useRef<any | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>("0.00");
  let ticker: any = props.eachCurrency;
  if (ticker === null) {
    ticker = ['BTC-USD'];
  }

  const [tickerInfo, setTickerInfo] = useState<Ticker>({} as Ticker);

  // useEffect(() => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     ticker = ticker[0];
  //     axios('http://localhost:3002/getTickerData', { params: { ticker } })
  //       .then((res: any) => {
  //         if (res.status === 200) {
  //           console.log('in axios get', res)
  //           return setTickerInfo(res.data)
  //         }
  //       })
  //       .catch((err: any) => {
  //         if (err.request) {
  //           console.log(err.request)
  //         }
  //         if (err.response) {
  //           console.log(err.response)
  //         }
  //       }, []);


  // }, [ticker]);

  useEffect( ()=>{

    if (!props.firstRender) {
      return;
    }

    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com')

    if (props.eachCurrency !== null) {
      let currentCrypto: string = props.eachCurrency[0]

      console.log('hmmmm ', currentCrypto)
      ws.current.onopen = ()=> {
        const msg: Wsmsg = {
          type: "subscribe",
          product_ids: [currentCrypto],
          channels: ["ticker"]
        };

        console.log('worked?')
        const msgJson: string = JSON.stringify(msg);
        console.log('msg ', msgJson)
        ws.current.send(msgJson);
        ws.current.onmessage = function(e: any) {
          console.log(`[message] Data received from server${e.data}`);
        };
    };

    }

  }, [props.firstRender, props.eachCurrency, ws])


  return (
    <div>
      <h1>{ticker}</h1>
      <CryptoChart eachCurrency={props.eachCurrency} getCryptoURL={props.getCryptoURL} firstRender={props.firstRender}/>
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;