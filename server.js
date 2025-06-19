require('rootpath')();
const cors = require('cors');
const express = require('express');
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();

const errorHandler = require('_middleware/error-handler');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// For testing api
app.get('/', (req, res) => {
  res.status(200).json('Welcome, ITSM start');
});

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});
// For testing api

app.use('/users', require('./users/users.controller')); 
app.use('/userNoToken', require('./userNoToken/userNoToken.controller'));
app.use('/announcements', require('./announcements/announcements.controller')); 
app.use('/departments', require('./departments/departments.controller')); 
app.use('/feedbacks', require('./feedbacks/feedbacks.controller')); 
app.use('/notes', require('./notes/notes.controller')); 
app.use('/roles', require('./roles/roles.controller')); 
app.use('/todos', require('./todos/todos.controller')); 
app.use('/categorys', require('./categorys/categorys.controller')); 
app.use('/subcategory', require('./subcategory/subcategory.controller')); 
app.use('/knowledges', require('./knowledges/knowledges.controller')); 
app.use('/incidents', require('./incidents/incidents.controller')); 
app.use('/incident_category', require('./incident_category/incident_category.controller')); 
app.use('/products', require('./products/products.controller')); 
app.use('/requests', require('./requests/requests.controller')); 
app.use('/cmdb', require('./cmdb/cmdb.controller')); 
app.use('/myversions', require('./myversion/myversion.controller')); 
app.use('/incident_photos', require('./incident_photos/incident_photos.controller'));
app.use('/req_function', require('./req_function/req_function.controller')); 
app.use('/req_subcategory', require('./req_subcategory/req_subcategory.controller')); 
app.use('/req_category', require('./req_category/req_category.controller')); 
app.use('/request_photos', require('./request_photos/request_photos.controller')); 
app.use('/req_notes', require('./req_notes/req_notes.controller')); 

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