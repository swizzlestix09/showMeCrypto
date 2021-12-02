import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
//import { useEffect, useRef, useState} from 'react';

export interface Props {
  eachCurrency: string | null;
  getCryptoURL: string;
  firstRender: {}
};

const CryptoChart = (props: Props) => {

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