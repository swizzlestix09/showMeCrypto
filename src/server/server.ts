import express from 'express';

const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 3000;

app.post('/getTickerData', (req, res)=>{
  console.log('help..', req)
});

app.listen(()=> {
  console.dir(`We are listening on port: ${port}`);
})