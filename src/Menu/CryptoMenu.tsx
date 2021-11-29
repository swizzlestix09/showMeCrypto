import CryptoItem from "./CryptoItem";

//might need to add proptype to this..
export interface Props {
  currencies: any[],
  clickCurrency: any
};

const CryptoMenu = (props: Props) => {
  let currencies = props.currencies;

  return (
    <>
      <h3>CryptoCurrencies</h3>
      <ul>
      {currencies.map(token => {
        return (
          <CryptoItem key={token.id} tokenId={token.id} tokenName={token.name} tokenSym={token.symbol} clickCurrency={props.clickCurrency}/>
        );
      })
      }
      </ul>
    </>
  )
};

export default CryptoMenu;