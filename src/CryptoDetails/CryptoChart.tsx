import Paper from '@mui/material/Paper';
import { getHistoricalCoinData } from '../utils';
import { useEffect, useState } from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

export interface Props {
  eachCurrency: any[];
  getCryptoURL: string;
  firstRender: {}
};

const CryptoChart = (props: Props) => {
  const { eachCurrency, getCryptoURL } = props;
  const [historicalCoinData, setHistoricalData] = useState<[]>([]);

  useEffect(() => {


    let history: [] = [];

    getHistoricalCoinData(getCryptoURL, setHistoricalData, history, eachCurrency);

  }, [eachCurrency, getCryptoURL, historicalCoinData]);

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