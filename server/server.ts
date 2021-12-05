import express from "express";
import cors from "cors";
import { getHistoricalCoinData, apiCallForCurrencies } from "../src/utils";
import { saveIp, saveCrypto } from "../database/index";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;

app.get("/getHistoricalData", (req, res) => {
  const { getCryptoURL, eachCurrency } = req.query;
  const history: [] = [];

  getHistoricalCoinData( getCryptoURL, history, eachCurrency )
    .then((data: {}) => {
      res.status(200).json(data);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(401).send(err);
    });
});

app.get("/getAllCurrencies", (req, res) => {

  const { getCryptoURL } = req.query;
  apiCallForCurrencies( getCryptoURL )
  .then((data: {}) => {
    res.status(200).json(data);
  })
  .catch((err: any) => {
    console.log(err);
    res.status(401).send(err);
  });
})

app.post("/saveIP", (req, res) => {
  saveIp(req.body.ipAddress);
});

app.post("/saveCrypto", (req, res) => {
  let { selectedCrypto, ip } = req.body;
  saveCrypto(ip.current, selectedCrypto)
  .then(( data ) => {
    res.status(200).json(data);
  })
  .catch( (error) => {
    console.error(error);
    res.status(502);
  })
});

app.delete("/removeCrypto", (req, res) => {
  res.send('Got a DELETE request at /removeCrypto')
});

app.put('/updateFavorites', (req, res) => {
  res.send('Got a PUT request at /user')
})


app.listen(port, () => {
  console.dir(`We are listening on port: ${port}`);
});
