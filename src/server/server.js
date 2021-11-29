"use strict";
exports.__esModule = true;
var express = require("express");
// import cors from 'cors'
//import path from 'path';
var app = express();
var port = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'build')));
app.get('/getTickerData', function (req, res) {
    console.log('help..', req);
});
app.listen(function () {
    console.dir("We are listening on port: ".concat(port));
});
