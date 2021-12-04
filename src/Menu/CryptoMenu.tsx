import React from 'react';
import CryptoItem from "./CryptoItem";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
export interface Props {
  currencies: any[],
  clickCurrency: any
};

const CryptoMenu = (props: Props) => {
  let listOfCrypto = props.currencies.map(token => {
    return (
      <CryptoItem key={token.id} tokenId={token.id} tokenName={token.name} tokenSym={token.symbol} clickCurrency={props.clickCurrency} />
    );
  })

  return (
    <>
      <Paper sx={{ maxWidth: 'fit-content', padding: '20px 20px' }}>
        <h3>CryptoCurrencies</h3>
        <Typography noWrap>
          <MenuList dense style={{maxHeight: 800, overflow: 'auto'}}>
            {listOfCrypto}
          </MenuList>
        </Typography>
      </Paper>
    </>
  )
};

export default CryptoMenu;