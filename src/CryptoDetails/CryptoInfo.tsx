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

  let ticker = props.eachCurrency;
  console.log('AJFKEAFKAGD ', props.eachCurrency);
  const [tickerInfo, setTickerInfo] = React.useState<Ticker>({} as Ticker);

  React.useEffect(() => {
    if (ticker) {
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
    }

  }, [ticker]);

  //send ticker to coinbase + usd for now
  //render information retrieved from source
  //dont forget edge case - non crypto currencies




  return (
    <div>
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;