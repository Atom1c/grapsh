// Setup basic express server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 4000;
var fs = require('fs');
var file = __dirname + '/public/pack.json';
var jsdiff = require('diff');
var empty = [ { value: '{}' } ];
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));



server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


io.sockets.on('connection', function (socket) {
  console.log("connection");

app.post('/', function (req, res) {
  value = req.body;
  console.log("taken:",req.body);
  //fs.writeFile(__dirname+'/test',value);
  //console.log("REQUEST:",req.param);
  res.json(req.body);
  io.sockets.emit('getting', {
    value: value
  });
});
});



