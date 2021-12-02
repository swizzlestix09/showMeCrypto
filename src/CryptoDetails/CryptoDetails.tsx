import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';

export interface Props {
  tickerInfo: {
    token: string | null,
    price: string | null,
    open_24h: string | null,
    volume_24h: string | null,
    low_24h: string | null,
    volume_30d: string | null
  }
};


const CryptoDetails = (props: Props) => {
  //console.log('in details... ', props.tickerInfo)
  return (
    <div className="cryptoDetails">
      <Paper sx={{ width: '100vh', maxWidth: '100%' }} elevation={16} >
        <CardContent>
          <h4>{props.tickerInfo.token}</h4>
          <p>Price: {props.tickerInfo.price}</p>
          <p>Open: {props.tickerInfo.open_24h}</p>
          <p>Daily Low: {props.tickerInfo.low_24h}</p>
          <p>Daily Volume: {props.tickerInfo.volume_24h}</p>
          <p>Monthly Volume: {props.tickerInfo.volume_30d}</p>
          <p>Change %: </p>
        </CardContent>
      </Paper>
    </div>
  )
};


export default CryptoDetails;

// Percentage change - Take the selling price and subtract the initial purchase price. The result is the gain or loss. Take the gain or loss from the investment and divide it by the original amount or purchase price of the investment. Finally, multiply the result by 100 to arrive at the percentage change in the investment.

// In crypto, market cap is calculated by multiplying the total number of coins that have been mined by the price of a single coin at any given time.