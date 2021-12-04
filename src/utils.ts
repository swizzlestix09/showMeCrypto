import axios from "axios";

export const formatData = (data: []) => {
  //Candle schema is of the form [timestamp, price_low, price_high, price_open, price_close]
  let modifiedData = data.map((info: any[]) => {
    let timestamp: number = info[0];
    let price: number = info[4];
    let date: Date = new Date(timestamp * 1000);

    let day: number = date.getDay();
    let month: number = date.getMonth();
    let year: number = date.getFullYear();
    let hour: number = date.getHours();
    let minutes: number = date.getMinutes();

    let dayAndTime: string = `${day}-${month}-${year}, ${hour}:${minutes}0 GMT`;
    return [dayAndTime, price];
  });

  return modifiedData.reverse();
};

export const apiCallForCurrencies = async (
  url: string
) => {
  let usCurrencies: [] = [];

  await axios
    .get(url + "/products")
    .then((res: any) => {
      return res.data;
    })
    .then((cryptoInfo: any) => {
      usCurrencies = cryptoInfo.filter((curr: any) => {
        if (curr.quote_currency === "USD") {
          return curr;
        }
      });
    })
    .catch((err: any) => console.error(err));

  usCurrencies = usCurrencies.sort((a: any, b: any) => {
    if (a.base_currency < b.base_currency) {
      return -1;
    }
    if (a.base_currency > b.base_currency) {
      return 1;
    }
    return 0;
  });

  return usCurrencies;
};

export const getHistoricalCoinData = async (
  url: string,
  historyArr: [],
  eachCur: any
) => {
  const candleURL: string = `${url}/products/${eachCur[0]}/candles?granularity=300&start=12-01-2021&end=12-02-2021`;

  await axios
    .get(candleURL)
    .then((res: any) => res.data)
    .then((data: any) => (historyArr = data))
    .catch((error: any) => console.error(error));

  let formattedHistory: any = formatData(historyArr);

  return formattedHistory;
};
//maybe button for 3 mo or 6 mo... values stores are 3/6 respectively then use this
// var d = new Date();
// d.setMonth(d.getMonth() - 6);
// console.log(d);
//how to change dates however need to change mo to number & need to get rid of additional unnecessary information
//default value can be the day. day, 3 mo, 6 mo.
