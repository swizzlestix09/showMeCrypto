import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CryptoDetails from './CryptoDetails';
import CryptoChart from './CryptoChart';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

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
  const isDeleted = useRef<any>('');
  const [email, setEmail] = useState<string>('');
  const [tickerInfo, setTickerInfo] = useState<Ticker>({} as Ticker);
  const { firstRender, eachCurrency, getCryptoURL, ws, ip } = props;

  const deleteRecord = () => {
    axios.delete('http://localhost:3002/deleteRecord', { data: { ip } })
      .then(confirmed => {
        isDeleted.current = `deleted ${confirmed}`;
      })
      .catch(error => {
        console.error(error);
      })

  };

  const emailChange = (e: any) => {
    let emailToStore = e.target.value;
    setEmail(emailToStore);
  }

  const submitEmail = () => {
    let ipAdd = ip.current;
    axios.put('http://localhost:3002/emailUpdate', {data: {ipAdd, email}} )
  }

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
      <CryptoChart eachCurrency={eachCurrency} getCryptoURL={getCryptoURL} firstRender={firstRender} />
      <CryptoDetails tickerInfo={tickerInfo} />
      <h6> We're saving your IP address for future features. Don't like that? Hit Delete Below:</h6>
      <Button variant="outlined" onClick={deleteRecord} > Outlined </Button>
      <h6>{isDeleted.current && 'deleted'}</h6>
      <h6> Are you someone that wants to be in the know? Give us your email!:</h6>
      <form onSubmit={submitEmail}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="enter email"
          value={email}
          onChange={(e) => { emailChange(e) }}
        />
        <Button type="submit" variant="outlined"> Submit </Button>
      </form>
    </div>
  )
};

export default CryptoInfo;

// checked={checked}
// onChange={handleChange}

//const handleChange = (e: any) => {
  //   // let list: [] = []
  //   // setFaveCrypto(!faveCrypto)
  //   // let selectedCrypto = e.target.value;

  //   // if (favoritesList.length === 0) {
  //   //   axios.post('http://localhost:3002/saveCrypto', { selectedCrypto, ip })
  //   //     .then((res: any) => {
  //   //       list = res.data
  //   //     })
  //   //     .then((list: any) => {
  //   //       updateFavoritesList(list);
  //   //     })
  //   //     .catch(err => console.error(err))
  //   // }
  //   // else if (favoritesList.length > 0) {
  //   //   //update list
  //   // } else {
  //   // }
  // };

  // <FormControlLabel value={currentCrypto.current} control={<Switch defaultChecked />} label="Favorite" onChange={(e) => { handleChange(e) }} />