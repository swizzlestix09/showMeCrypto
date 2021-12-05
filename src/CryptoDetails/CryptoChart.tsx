import Divider from '@mui/material/Divider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Chart,
  Series,
  Label,
  Size,
  Grid,
  Tooltip,
  LoadingIndicator,
  ValueAxis
} from 'devextreme-react/chart';
import { Container } from '@mui/material';

interface IChartOptions {
  id: string,
  dataSource: any[]
};
export interface Props {
  eachCurrency: any[];
  getCryptoURL: string;
  firstRender: {}
  IChartOptions: any
};

const CryptoChart: React.FC <Props> = (props: Props) => {
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

  let chartProps: IChartOptions = {
    id: "priceChart" ,
    dataSource: historicalCoinData
  }
  return (
    <>
      <Container>
        <Chart {...chartProps} >
          <Size height={500} width={700} />
          <ValueAxis valueType={"price"}>
            <Grid opacity={0.2} />
          </ValueAxis>
          <Series
            name="Prices"
            argumentField="dateTime"
            valueField="price"
            type="spline"
          />
          <Tooltip
            enabled={true} />
            <LoadingIndicator enabled={true} />
          <Label visible={false} />
        </Chart>
        <Divider variant="middle" />
      </Container>
    </>
  )
};

export default CryptoChart;
