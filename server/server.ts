import express from 'express';

const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 5000;


app.listen(()=> {
  console.dir(`We are listening on port: ${port}`);
})