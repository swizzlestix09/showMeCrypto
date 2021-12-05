import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CryptoDetails from './CryptoDetails';
import CryptoChart from './CryptoChart';

export interface Props {
  ws: any;
  eachCurrency: any[];
  getCryptoURL: string;
  firstRender: {}
  ip: any
};

type Ticker = {
  token: string | null,
  price: string | null,
  open_24h: string | null,
  volume_24h: string | null,
  low_24h: string | null,
  volume_30d: string | null
};


type Wsmsg = {
  type: string;
  product_ids?: any;
  channels: any[]
}

const CryptoInfo = (props: Props) => {
  const currentCrypto = useRef<any>(false);
  const [ faveCrypto, setFaveCrypto ]= useState<boolean>(false);
  const [tickerInfo, setTickerInfo] = useState<Ticker>({} as Ticker);
  const [favoritesList, updateFavoritesList] = useState<any[]>([])
  const { firstRender, eachCurrency, getCryptoURL, ws , ip} = props;

  const handleChange = (e: any) => {
    let list: [] = []
    setFaveCrypto(!faveCrypto)
    let selectedCrypto = e.target.value;

    if (favoritesList.length === 0) {
      axios.post('http://localhost:3002/saveCrypto', { selectedCrypto, ip })
      .then( (res:any) => {
        list = res.data
      })
      .then( (list: any) => {
        updateFavoritesList(list);
      })
      .catch(err => console.error(err))
    }
    // else if (favoritesList.length > 0) {
    //   //update list
    // } else {
    // }
  };

  useEffect(() => {
    if (!firstRender) {
      return;
    }
    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    currentCrypto.current = eachCurrency[0];

    ws.current.onopen = () => {
      const msg: Wsmsg = {
        type: "subscribe",
        product_ids: [currentCrypto.current],
        channels: ["ticker"]
      };

      const msgJson: string = JSON.stringify(msg);

      ws.current.send(msgJson);
      ws.current.onmessage = function (e: any) {
        //console.log(`[message] Data received from server${e.data}`);
        let data: any = JSON.parse(e.data)
        if (currentCrypto.current === data.product_id) {
          let ticker: Ticker = {
            token: data.product_id,
            price: data.price,
            open_24h: data.open_24h,
            volume_24h: data.volume_24h,
            low_24h: data.low_24h,
            volume_30d: data.volume_30d
          };
          setTickerInfo(ticker)
        } else {
          return;
        }
      };

    }

  }, [firstRender, eachCurrency, ws, currentCrypto])

  return (
    <div className='cryptoInfo'>
      <h1>{currentCrypto.current}</h1>
      <FormControlLabel value={currentCrypto.current} control={<Switch defaultChecked />} label="Favorite" onChange={(e) => { handleChange(e)} } />
      <CryptoChart eachCurrency={eachCurrency} getCryptoURL={getCryptoURL} firstRender={firstRender} />
      <CryptoDetails tickerInfo={tickerInfo} />
    </div>
  )
};

export default CryptoInfo;

// checked={checked}
// onChange={handleChange}