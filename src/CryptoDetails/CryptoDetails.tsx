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
        <li>Change %: </li>
      </ul>
    </div>
  )
};


export default CryptoDetails;

// Percentage change - Take the selling price and subtract the initial purchase price. The result is the gain or loss. Take the gain or loss from the investment and divide it by the original amount or purchase price of the investment. Finally, multiply the result by 100 to arrive at the percentage change in the investment.

// In crypto, market cap is calculated by multiplying the total number of coins that have been mined by the price of a single coin at any given time.