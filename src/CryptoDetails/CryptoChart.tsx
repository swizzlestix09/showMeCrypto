import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { formatData } from '../utils';

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

    const candleURL: string = `${getCryptoURL}/products/${eachCurrency[0]}/candles?granularity=300&start=12-01-2021&end=12-02-2021`;
    let history: [] = [];

    const gethistoricalCoinData = async () => {
      await axios.get(candleURL)
        .then((res: any) => (res.data))
        .then((data) => (history = data))
        .catch(error => console.error(error))

      let formattedHistory: any = formatData(history);
      console.log(formattedHistory)
      setHistoricalData(formattedHistory);
    }
    gethistoricalCoinData();

  }, [eachCurrency, firstRender, getCryptoURL, historicalCoinData]);

  return (
    <div>
      <Paper>
        <Chart data={historicalCoinData}>
          <ValueAxis />
          <LineSeries valueField="1" argumentField="0" />
          <ArgumentAxis />
        </Chart>
      </Paper>
    </div>
  )
};

export default CryptoChart