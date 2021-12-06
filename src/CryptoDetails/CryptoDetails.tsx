import Container from '@mui/material/Container';

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
  const { token, price, open_24h, volume_24h, low_24h, volume_30d } = props.tickerInfo;
  return (
    <Container>
      <h4>{token}</h4>
      <p>Price: {price}</p>
      <p>Open: {open_24h}</p>
      <p>Daily Low: {low_24h}</p>
      <p>Daily Volume: {volume_24h}</p>
      <p>Monthly Volume: {volume_30d}</p>
    </Container>

  )
};


export default CryptoDetails;
