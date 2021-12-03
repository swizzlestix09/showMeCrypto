import React, { useEffect, useState, useRef } from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import CryptoInfo from './CryptoDetails/CryptoInfo';
import { apiCallForCurrencies } from './utils';
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com';

const App: React.FC = () => {
  const ws = useRef<any>('');
  const firstRender = useRef<boolean>(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [eachCurrency, getCurrencyInfo] = useState<any[]>(['BTC-USD']);

  function clickCurrency(currencyId: any) {
    let ticker = currencyId.textContent.split(' ');
    ws.current.close()
    getCurrencyInfo(ticker);
  };

  useEffect(() => {
    apiCallForCurrencies(getCryptoURL, setCurrencies, firstRender.current);
  }, []);

  return !currencies ? null :
    (
      <div className="App">
        <CryptoMenu currencies={currencies} clickCurrency={clickCurrency} />
        <CryptoInfo eachCurrency={eachCurrency} getCryptoURL={getCryptoURL} firstRender={firstRender} ws={ws} />
      </div>
    );
}

export default App;
