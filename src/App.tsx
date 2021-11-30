import * as React from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import CryptoInfo from './CryptoDetails/CryptoInfo';
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
  const [eachCurrency, getCurrencyInfo] = React.useState<string | null>(null);

  function clickCurrency(currencyId: any) {
    let ticker = currencyId.textContent.split(' ')[0];
    getCurrencyInfo(ticker);
  };

  React.useEffect(() => {

    axios.get(getCryptoURL)
      .then(res => {
        res.data = res.data.sort();
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
        <CryptoMenu currencies={currencies} clickCurrency={clickCurrency}/>
        <CryptoInfo eachCurrency={eachCurrency === null ? null : eachCurrency}/>
      </div>
    );
}

export default App;
