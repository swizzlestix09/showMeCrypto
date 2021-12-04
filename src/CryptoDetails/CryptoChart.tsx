import Paper from '@mui/material/Paper';
import axios from 'axios';
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
    axios.get('http://localhost:3002/getHistoricalData', {
      params: {
        getCryptoURL,
        setHistoricalData,
        eachCurrency
      }
    })
    .then( res => {
      setHistoricalData(res.data)
    })

    console.log(historicalCoinData)
  }, [eachCurrency, getCryptoURL]);



  return (
    <div>
      <Paper>
        <Chart data={historicalCoinData}>
          <ValueAxis />
          <LineSeries valueField="1" argumentField="0" />
          <ArgumentAxis showLabels={false} showTicks={false}/>
        </Chart>
      </Paper>
    </div>
  )
};

export default CryptoChart