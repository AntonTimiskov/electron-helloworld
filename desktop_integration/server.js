var express = require('express');
var app = express();

app.get('/', function(req,res){
  res.send(200, '<h1>'+process.pid+'</h1>');
});

var server = app.listen(9999);
module.exports.close = server.close.bind(server);
