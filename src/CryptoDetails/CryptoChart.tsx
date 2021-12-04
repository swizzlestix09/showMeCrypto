import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Chart,
  Series,
  Size,
  Grid,
  Tooltip,
  ValueAxis,
  ArgumentAxis,
} from 'devextreme-react/chart';
import { Container } from '@mui/material';

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
        setHistoricalData,
        getCryptoURL,
        eachCurrency
      }
    })
      .then(res => {
        setHistoricalData(res.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eachCurrency, getCryptoURL, setHistoricalData]);

  const customizeTooltip = (arg: any) => {
    return {
      text: `Date: ${arg.argument}
      Price: ${arg.valueText}`
    };
  }

  return (
    <>
      <Container>
        <Chart id="priceChart" dataSource={historicalCoinData}>
          <Size height={500} width={700} />
          <ValueAxis valueType={"price"}>
            <Grid opacity={0.2} />
          </ValueAxis>
          <Series
            name="Prices and Dates"
            argumentField="dateTime"
            valueField="price"
            type="spline"
          />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <ArgumentAxis />
        </Chart>
        <Divider variant="middle" />
      </Container>
    </>
  )
};

export default CryptoChart;
