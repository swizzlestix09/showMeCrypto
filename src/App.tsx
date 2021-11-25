import * as React from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import axios from 'axios';
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com/currencies';

type Token = {
  id: string,
  name: string,
  symbol: string
};

const App: React.FC = () => {
  const [currencies, getCurrencies] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    axios.get(getCryptoURL)
      .then(res => {
        const cryptoList = res.data.map((token: any) => {
          let eachToken: Token = {
            id: token.id,
            name: token.name,
            symbol: token.details.symbol
          }
          return eachToken;
        });
        return cryptoList;
      })
      .then(cryptoList => {
        getCurrencies(cryptoList);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  return !currencies ? null :
    (
      <div className="App">
        <CryptoMenu currencies={currencies} />
      </div>
    );
}

export default App;
