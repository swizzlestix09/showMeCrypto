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
  const [tickerInfo, setTickerInfo] = React.useState< string | {}>({});

  React.useEffect(() => {
    let ticker = props.eachCurrency;
    console.log('wetdg ', ticker)
    // let config: Config = {
    //   method: 'get',
    //   url: 'http://localhost:3001/getTickerData',
    //   param: { ticker },
    //   headers: { 'Content-Type': 'application/json' },
    //   mode: "cors"
    // };
    axios('http://localhost:3001/getTickerData')
      .then((res:any) => { if (res.status === 200) { console.log(res) } })
      .catch( (err:any) => { if (err.request) { console.log(err.request) } if (err.response) { console.log(err.response) } });

  }, [props.eachCurrency]);

  //send ticker to coinbase + usd for now
  //render information retrieved from source

  return (
    <div>help.</div>
  )
};

export default CryptoInfo;