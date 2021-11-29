import CryptoItem from "./CryptoItem";

//might need to add proptype to this..
export interface Props {
  currencies: any[],
  clickCurrency: any
};

const CryptoMenu = (props: Props) => {
  let currencies = props.currencies;
  let listOfCrypto = currencies.map(token => {
    return (
      <CryptoItem key={token.id} tokenId={token.id} tokenName={token.name} tokenSym={token.symbol} clickCurrency={props.clickCurrency}/>
    );
  })

  return (
    <>
      <ul>
      <h3>CryptoCurrencies</h3>
      {listOfCrypto}
      </ul>
    </>
  )
};

export default CryptoMenu;