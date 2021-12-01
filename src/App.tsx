import * as React from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import CryptoInfo from './CryptoDetails/CryptoInfo';
import axios from 'axios';
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com';

type Token = {
  id: string,
  name: string,
  symbol: string
};

const App: React.FC = () => {
  const ws = React.useRef<any | null>(null);
  const firstRender = React.useRef<boolean>(false);
  const [currencies, setCurrencies] = React.useState<any[] >([]);
  const [eachCurrency, getCurrencyInfo] = React.useState<string | null>(null);

  function clickCurrency(currencyId: any) {
    let ticker = currencyId.textContent.split(' ');
    getCurrencyInfo(ticker);
  };

  React.useEffect(() => {

    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com')

    const apiCallForCurrencies = async() => {
      let cryptoInfo: [] = [];
      let usCurrencies: [] = [];
      await axios.get(getCryptoURL + '/products')
        .then(res => cryptoInfo = res.data)
        .then(cryptoInfo => {

          usCurrencies = cryptoInfo.filter((curr: any) => {
            if (curr.quote_currency === 'USD') {
              return curr;
            }
          });
        })
        .catch(err => {
          console.error(err);
        })


        usCurrencies = usCurrencies.sort((a: any, b: any) => {
          if (a.base_currency < b.base_currency) {
            return -1;
            }
          if (a.base_currency > b.base_currency) {
            return 1;
            }
          return 0;
        })
      setCurrencies(usCurrencies);
      firstRender.current = true;
    };

      apiCallForCurrencies();

  }, []);

  console.log('before return ', currencies)
  return !currencies ? null :
    (
      <div className="App">
        <CryptoMenu currencies={currencies} clickCurrency={clickCurrency}/>
        <CryptoInfo eachCurrency={eachCurrency === null ? null : eachCurrency} />
      </div>
    );
}

export default App;
