import CryptoItem from "./CryptoItem";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

export interface Props {
  currencies: any[],
  clickCurrency: any,
  handleCurrencyChange: any
};

const CryptoMenu = (props: Props) => {

  let listOfCrypto = props.currencies.map(token => {
    return (
      <CryptoItem key={token.id} tokenId={token.id} tokenName={token.name} tokenSym={token.symbol} clickCurrency={props.clickCurrency} handleCurrencyChange={props.handleCurrencyChange}/>
    );
  })

  return (
    <>
      <Paper sx={{ width: '30%', maxWidth: '100%' }}>
        <ul>
          <h3>CryptoCurrencies</h3>
          <MenuList>
          {listOfCrypto}
          </MenuList>
        </ul>
      </Paper>
    </>
  )
};

export default CryptoMenu;