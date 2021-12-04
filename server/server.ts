import express from "express";
import cors from "cors";
import { getHistoricalCoinData, apiCallForCurrencies } from "../src/utils";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;

app.get("/getHistoricalData", (req, res) => {
  console.log("NOOOOO", req.query);
  const { getCryptoURL, eachCurrency } = req.query;
  const history: [] = [];

  console.log(getCryptoURL, eachCurrency);

  getHistoricalCoinData( getCryptoURL, history, eachCurrency)
    .then((data: {}) => {
      res.status(200).json(data);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(401).send(err);
    });
});

app.listen(port, () => {
  console.dir(`We are listening on port: ${port}`);
});
