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
        </CardContent>
      </Paper>
    </div>
  )
};


export default CryptoDetails;
