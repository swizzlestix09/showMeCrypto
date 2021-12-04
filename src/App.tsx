import React, { useEffect, useState, useRef } from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import CryptoInfo from './CryptoDetails/CryptoInfo';
import axios from "axios";
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com';

const App = () => {
  const ws = useRef<any>('');
  const firstRender = useRef<boolean>(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [eachCurrency, getCurrencyInfo] = useState<any[]>(['BTC-USD']);

  const clickCurrency = (currencyId: any) => {
    console.log(typeof currencyId)
    let ticker = currencyId.textContent.split(' ');
    ws.current.close()
    getCurrencyInfo(ticker);
  };

  useEffect(() => {

    axios.get('http://localhost:3002/getAllCurrencies', {
      params: {
        getCryptoURL,
        setCurrencies,
        firstRender
      }
    })
      .then( (res: any) => {
        setCurrencies(res.data)
        firstRender.current = true;
      })

  }, []);

  return (
    <div className="App">
      <CryptoMenu currencies={currencies} clickCurrency={clickCurrency} />
      <CryptoInfo eachCurrency={eachCurrency} getCryptoURL={getCryptoURL} firstRender={firstRender} ws={ws} />
    </div>
  );
};

export default App;
