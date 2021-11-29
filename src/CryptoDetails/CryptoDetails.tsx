import * as React from 'react';

export interface Props {
  tickerInfo: {
    open: string | null,
    high: string | null,
    low: string | null,
    volume: string | null

  }
};

const CryptoDetails = (props: Props) =>{
  console.log('in details... ', props.tickerInfo)
  return(
    <div>
      <ul>
        <li>Open: {props.tickerInfo.open}</li>
        <li>High: {props.tickerInfo.high}</li>
        <li>Low: {props.tickerInfo.low}</li>
        <li>Volume: {props.tickerInfo.volume}</li>
        <li>Market Cap:</li>
      </ul>
    </div>
  )
};


export default CryptoDetails;