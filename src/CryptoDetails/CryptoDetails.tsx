import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';

export interface Props {
  tickerInfo: {
    open: string | null,
    high: string | null,
    low: string | null,
    volume: string | null,
    last: string | null
  }
};


const CryptoDetails = (props: Props) => {
  console.log('in details... ', props.tickerInfo)
  return (
    <div className="cryptoDetails">
      <Paper sx={{ width: '100vh', maxWidth: '100%' }} elevation={16} >
        <CardContent>
          <p>Price: {props.tickerInfo.open}</p>
          <p>Open: {props.tickerInfo.high}</p>
          <p>Daily Low: {props.tickerInfo.low}</p>
          <p>Daily Volume: {props.tickerInfo.volume}</p>
          <p>Monthly Volume: {props.tickerInfo.last}</p>
          <p>Change %: </p>
        </CardContent>
      </Paper>
    </div>
  )
};


export default CryptoDetails;

// Percentage change - Take the selling price and subtract the initial purchase price. The result is the gain or loss. Take the gain or loss from the investment and divide it by the original amount or purchase price of the investment. Finally, multiply the result by 100 to arrive at the percentage change in the investment.

// In crypto, market cap is calculated by multiplying the total number of coins that have been mined by the price of a single coin at any given time.