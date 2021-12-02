import React, {useEffect, useState, useRef} from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import CryptoInfo from './CryptoDetails/CryptoInfo';
import axios from 'axios';
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com';

const App: React.FC = () => {
  const ws = useRef<any>('');
  const firstRender = useRef<boolean>(false);
  const [currencies, setCurrencies] = useState<any[] >([]);
  const [eachCurrency, getCurrencyInfo] = useState<any[] >(['BTC-USD']);

  function clickCurrency(currencyId: any) {
    let ticker = currencyId.textContent.split(' ');
    ws.current.close()
    getCurrencyInfo(ticker);
  };

  useEffect(() => {

    const apiCallForCurrencies = async () => {
      let usCurrencies: [] = [];

      await axios.get(getCryptoURL + '/products')
        .then(res => res.data)
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

  return !currencies ? null :
    (
      <div className="App">
        <CryptoMenu currencies={currencies} clickCurrency={clickCurrency} />
        <CryptoInfo eachCurrency={eachCurrency} getCryptoURL={getCryptoURL} firstRender={firstRender} ws={ws}/>
      </div>
    );
}

export default App;
