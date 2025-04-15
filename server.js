require('rootpath')();
const cors = require('cors');
const express = require('express');
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// For testing api
app.get('/', (req, res) => {
  res.status(200).json('Welcome, ITSM start');
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.use('/users', require('./users/users.controller')); 

app.use(errorHandler);

const options = {
    key: fs.readFileSync("hsa-key.key"),
    cert: fs.readFileSync("hongsenghq_ddns_net.pem"),
    passphrase: "hsonlinehsgroup1234%"
};

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5300;
const port_ssl = process.env.NODE_ENV === 'production' ? (process.env.PORT || 443) : 5301;

http.createServer(options, app).listen(port, () => 
    console.log('HTTP server listening on port ' + port)
);

https.createServer(options, app).listen(port_ssl, () => 
    console.log('HTTPS server listening on port ' + port_ssl)
); 