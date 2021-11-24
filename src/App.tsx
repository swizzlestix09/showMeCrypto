import React from 'react';
import CryptoMenu from './Menu/CryptoMenu';
import axios from 'axios';
import './App.css';

const App = () => {
  const [currencies, getCurrencies] = React.useState();

  React.useEffect( ()=> {

  });

  return (
    <div className="App">
     <CryptoMenu />
    </div>
  );
}

export default App;
