import * as React from 'react';
const axios = require('axios').default;


export interface Props {
  eachCurrency: string | null;
};

// type Config = {
//   method: any,
//   url: string,
//   param: any,
//   headers?: any,
//   mode?: any
// };


const CryptoInfo = (props: Props) => {
  console.log('props recieved ', props.eachCurrency)
  let ticker = props.eachCurrency;
  const [tickerInfo, setTickerInfo] = React.useState< string | {}>({});

  React.useEffect(() => {
    console.log('wetdg ', ticker)
    if(ticker) {
      axios('http://localhost:3002/getTickerData', { params: { ticker }})
        .then((res:any) => { if (res.status === 200) { console.log(res) } })
        .catch( (err:any) => { if (err.request) { console.log(err.request) } if (err.response) { console.log(err.response) } });
    }

  }, [ticker]);

  //send ticker to coinbase + usd for now
  //render information retrieved from source

  return (
    <div>help.</div>
  )
};

export default CryptoInfo;