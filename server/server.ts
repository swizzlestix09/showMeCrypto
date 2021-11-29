import express from 'express';
import cors from 'cors';
const apiHelpers = require('./helpers/apiCalls');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;

app.get('/getTickerData', (req, res) => {
  apiHelpers.getTickerInfo(req.query.ticker)
  .then((data: {}) => {
    res.status(200).json(data)
  })
  .catch((err: any) => {
    console.log(err)
    res.status(401).send(err)
  })
})

app.listen(port, ()=> {
  console.dir(`We are listening on port: ${port}`);
})