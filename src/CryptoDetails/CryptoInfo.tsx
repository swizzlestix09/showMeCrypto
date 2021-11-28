import * as React from 'react';
const axios = require('axios').default;


export interface Props {
  eachCurrency: string | null;
};

type Config = {
  method: any,
  url: string,
  body: any,
  headers?: any
};

const CryptoInfo = (props: Props) => {
  const [tickerInfo, setTickerInfo] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    let ticker = props.eachCurrency;
    console.log(ticker)
    let config: Config = {
      method: 'get',
      url: '/getTickerData',
      body: ticker,
      headers: { 'Content-Type': 'application/json' }
    };

    axios(config)
      .then((res:any) => { if (res.status === 200) { console.log(res) } })
      .catch( (err:any) => { if (err.request) { console.log(err.request) } if (err.response) { console.log(err.response) } });

  });

  console.log('in crypto info ', props)
  //send ticker to coinbase + usd for now
  //render information retrieved from source

  return (
    <div>help.</div>
  )
};

export default CryptoInfo;