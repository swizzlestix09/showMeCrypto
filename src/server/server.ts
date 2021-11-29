import express from "express";
import cors from "cors";
//import path from 'path';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'build')));

app.get('/getTickerData', (req:any, res:any)=>{
  console.log('help..', req)
});


app.listen(()=> {
  console.dir(`We are listening on port: ${port}`);
})