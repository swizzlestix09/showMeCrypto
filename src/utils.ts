import axios from "axios";

type PriceData = {
  dateTime: string;
  price: number;
};

export const formatData = (data: []) => {
  let modifiedData = data.map((info: any[]) => {
    let timestamp: number = info[0];
    let price: number = info[4] > 1 ? Math.round(info[4] * 100) / 100 : info[4];
    let date: Date = new Date(timestamp * 1000);

    let newDate: string = date.toUTCString();

    let dayAndTime: string = `${newDate}
    ${price}`;

    let PriceDateInfo: PriceData = {
      dateTime: dayAndTime,
      price,
    };
    return PriceDateInfo;
  });

  return modifiedData.reverse();
};

export const apiCallForCurrencies = async (url: any) => {
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
  url: any,
  historyArr: [],
  eachCur: any,
  start: string = "12-01-2021",
  end: string = "12-02-2021"
) => {
  const candleURL: string = `${url}/products/${eachCur[0]}/candles?granularity=3600`;

  await axios
    .get(candleURL)
    .then((res: any) => res.data)
    .then((data: any) => (historyArr = data))
    .catch((error: any) => console.error(error));

  let formattedHistory: any = formatData(historyArr);

  return formattedHistory;
};

export const grabIP = async () => {
  let currentIP: any = {};
  await axios.get('https://geolocation-db.com/json/')
  .then(res => {
    currentIP = res.data;
  })
  .catch(error => {
    console.error(error)
  })

  return currentIP.IPv4;
};
//maybe button for 3 mo or 6 mo... values stores are 3/6 respectively then use this
// var d = new Date();
// d.setMonth(d.getMonth() - 6);
// console.log(d);
//how to change dates however need to change mo to number & need to get rid of additional unnecessary information
//default value can be the day. day, 3 mo, 6 mo.
