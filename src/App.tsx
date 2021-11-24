import React from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import axios from 'axios';
import './App.css';
const getCryptoURL = 'https://api.exchange.coinbase.com/currencies';

const App = () => {
  const [currencies, getCurrencies] = React.useState(null);

  React.useEffect(() => {
    axios.get(getCryptoURL)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }, []);

  return (
    <div className="App">
      <CryptoMenu />
    </div>
  );
}

export default App;
