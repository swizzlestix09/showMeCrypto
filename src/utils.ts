import axios from 'axios';

export const formatData = ( data: [] ) => {
  //Candle schema is of the form [timestamp, price_low, price_high, price_open, price_close]
  let modifiedData = data.map( ( info: any[]) => {
    let timestamp: number = info[0]
    let price: string = info[4]
    let date: Date = new Date(timestamp * 1000);

    let day: number= date.getDay();
    let month: number= date.getMonth();
    let year: number = date.getFullYear();
    let hour: number = date.getHours();
    let minutes: number = date.getMinutes();


    let dayAndTime: string = `${day}-${month}-${year}, ${hour}:${minutes}0 GMT`
    return [dayAndTime, price]
  })

  return modifiedData.reverse();

};

export const apiCallForCurrencies = async (url:string, setCurrency: any, renderTrue: any) => {
  let usCurrencies: [] = [];

  await axios.get(url + '/products')
    .then( (res: any) => {
      return res.data
    })
    .then( (cryptoInfo: any) => {
      usCurrencies = cryptoInfo.filter((curr: any) => {
        if (curr.quote_currency === 'USD') {
          return curr;
        }
      });
    })
    .catch( (err: any) =>
      console.error(err)
    )

    usCurrencies = usCurrencies.sort((a: any, b: any) => {
      if (a.base_currency < b.base_currency) {
        return -1;
        }
      if (a.base_currency > b.base_currency) {
        return 1;
        }
      return 0;
    })
    setCurrency(usCurrencies);
  renderTrue = true;
};


