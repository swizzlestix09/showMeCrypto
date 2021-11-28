import express from 'express';
import cors from'cors';

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'build')));

app.get('/getTickerData', (req:any, res:any)=>{
  console.log('help..', req)
});

app.listen(()=> {
  console.dir(`We are listening on port: ${port}`);
})