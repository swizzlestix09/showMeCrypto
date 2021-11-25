import CryptoItem from "./CryptoItem";

//might need to add proptype to this..
export interface Props {
  currencies: any[]
};

const CryptoMenu = (props: Props) => {
  let currencies = props.currencies;

  return (
    <div className="CryptoMenu">
      <h3>CryptoCurrencies</h3>
      {currencies.map(token => {
        return (
          <CryptoItem key={token.id} tokenId={token.id} tokenName={token.name} tokenSym={token.symbol} />
        )
      })

      };
    </div>
  )
};

export default CryptoMenu;