import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { useEffect } from 'react';

export interface Props {
  eachCurrency: string | null;
  ws: any;
  getCryptoURL: string;
  firstRender: {}
};

type Wsmsg = {
  type: string;
  ticker: (string | null)[];
  channels: any[]
}

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

  useEffect( ()=>{
    if (!props.firstRender) {
      return;
    }

    const msg: Wsmsg = {
      type: "subscribe",
      ticker: [props.eachCurrency],
      channels: ["ticker"]
    };

    const msgJson: string = JSON.stringify(msg);

    if (props.ws.current !== null) {
      props.ws.current.send(msgJson);
    }



  }, [props.firstRender, props.eachCurrency, props.ws])


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