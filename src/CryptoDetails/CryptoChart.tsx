import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';


const CryptoChart = () => {
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

  let dateData: any[] = dummydata.map( (arr: any) => {
    let actualDate = arr[0] = new Date(arr[0]);
    return [actualDate, arr[1]]
  })
  console.log('datedata', dateData)
  return (
    <div>
      <Paper>
        <Chart data={dateData}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="1" argumentField="0" />
        </Chart>
      </Paper>
    </div>
  )
};

export default CryptoChart