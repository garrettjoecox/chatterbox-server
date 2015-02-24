var messages = require('./messages.json');
var bodyParser = require('body-parser');
var fsUtils = require('fs-utils');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client'));

app.get('/messages', function(req, res){
  res.set('Content-Type', 'application/json');
  res.send(messages);
});

app.post('/messages', function(req, res){
  var date = new Date();
  req.body.createdAt = date.toISOString();
  req.body.updatedAt = date.toISOString();
  req.body.objectId = Date.parse(date);
  messages.results.push(req.body);
  fsUtils.writeJSON('./messages.json', messages);
  res.send(req.body);
});

app.listen(5000, function(){
    console.log("Listening on 5000");
});