import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
//import { useEffect, useRef, useState} from 'react';

export interface Props {
  eachCurrency: any[];
  getCryptoURL: string;
  firstRender: {}
};

const CryptoChart = (props: Props) => {
  const { eachCurrency, getCryptoURL, firstRender } = props;
  const [historicalCoinData, setHistoricalData] = useState<[]>([]);
  const dummydata: any[] = [
    [
      1638152337353,
      57689.123283968656
    ],
    [
      1638152548111,
      57663.57807384742
    ],
    [
      1638152988373,
      57618.347730756235
    ]
  ]

  useEffect(() => {
    if (!firstRender) {
      return;
    }

    const candleURL: string = `${getCryptoURL}/products/${eachCurrency}/candles?granularity=21600`
    let history: [] = [];

    const gethistoricalCoinData = async () => {
      await axios.get(candleURL)
        .then( (res: any) => (res.data))
        .then( (data) => (history = data))
        .catch( error => console.error(error))
        console.log('its here ', history)
    }
    gethistoricalCoinData();

  },[ eachCurrency, firstRender, getCryptoURL]);


  return (
    <div>
      <Paper>
        <Chart data={dummydata}>
          <ValueAxis />
          <LineSeries valueField="1" argumentField="0" />
          <ArgumentAxis/>
        </Chart>
      </Paper>
    </div>
  )
};

export default CryptoChart