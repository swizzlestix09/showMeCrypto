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
  .then((data: any) => {
    console.log('in server ', data)
  })
  .catch((err: any) => {
    console.log(err)
    res.send(err)
  })
  res.send('hullo there')
})

app.listen(port, ()=> {
  console.dir(`We are listening on port: ${port}`);
})