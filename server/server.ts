import express from "express";
import cors from "cors";
import { getHistoricalCoinData, apiCallForCurrencies } from "../src/utils";
import { saveIp, deleteRec, updateRec} from "../database/index";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('./', express.static('public'));

const port = process.env.PORT || 3002;

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

app.delete("/deleteRecord", (req, res) => {
  let ip = req.body.ip.current
  deleteRec(ip)
  .then(deleted => {
    res.status(202).send(deleted)
  })
  .catch( (error) =>
    res.sendStatus(409)
  )
});

app.put('/emailUpdate', (req, res) => {
  let { ipAdd, email } = req.body;
  updateRec(ipAdd, email)
  .then(success => {
    res.status(202).send(success)
  })
  .catch(error => {
    console.log(error)
    res.sendStatus(500)
  })
})


app.listen(port, () => {
  console.dir(`We are listening on port: ${port}`);
});
