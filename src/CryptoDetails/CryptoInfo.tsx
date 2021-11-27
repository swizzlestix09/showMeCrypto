import axios from 'axios';
import * as React from 'react';


export interface Props {
  eachCurrency: string | null;
};

type Config = {
  method: any,
  url: string,
  data: any
};

const CryptoInfo = (props: Props) => {
  const [tickerInfo, setTickerInfo] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    let ticker = props.eachCurrency;
    let config:Config = {
      method: 'POST',
      url: 'http://localhost:3000/getTickerData',
      data: {
        ticker
      }
    }

    axios( config )
    .then((res) => {
      console.log(res);
    })
    .catch(err => console.error(err))
  });

  console.log('in crypto info ', props)
  //send ticker to coinbase + usd for now
  //render information retrieved from source

  return(
    <div>help.</div>
  )
};

export default CryptoInfo;