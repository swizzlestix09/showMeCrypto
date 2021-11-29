import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3002;

app.get('/getTickerData', (req, res) => {
  console.log(req.query.ticker)
  res.send('hullo there')
})

app.listen(port, ()=> {
  console.dir(`We are listening on port: ${port}`);
})