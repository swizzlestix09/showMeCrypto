const axios = require("axios");

const getTickerInfo = (ticker: string) => {
  var config = {
    method: 'get',
    url: `https://api.exchange.coinbase.com/products/${ticker}-usd/ticker`,
    headers: { }
  };

  return axios(config)
  .then(function (response: { data?: {} }) {
    return response.data;
  })
  .catch(function (error: any) {
    console.log(error);
  });

};

module.exports.getTickerInfo = getTickerInfo;