import * as React from 'react';
import CryptoDetails from './CryptoDetails';
const axios = require('axios').default;

export interface Props {
  eachCurrency: string | null
};

type Ticker= {
  open: string | null,
  high: string | null,
  low: string | null,
  volume: string | null,
  last: string | null
};

const CryptoInfo = (props: Props) => {
  let ticker: any = props.eachCurrency;
  if (ticker === null) {
    ticker = ['BTC-USD'];
  }

  const [tickerInfo, setTickerInfo] = React.useState<Ticker>({} as Ticker);

  React.useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ticker = ticker[0];
      axios('http://localhost:3002/getTickerData', { params: { ticker } })
        .then((res: any) => {
          if (res.status === 200) {
            console.log('in axios get', res)
            setTickerInfo(res.data)
          }
        })
        .then(() => {
          //handle info to render
        })
        .catch((err: any) => {
          if (err.request) {
            console.log(err.request)
          }
          if (err.response) {
            console.log(err.response)
          }
        });


  }, [ticker]);


  return (
    <div>
      <h1>{ticker}</h1>
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;