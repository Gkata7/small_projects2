var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contacts',['contacts']);
var bodyParser = require('body-parser');
var path = require('path');

// app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use(express.static(__dirname + "/templates"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contacts', function(req,res){
  console.log("GET Request");
  db.contacts.find(function(err,docs){
    console.log("docs");
    res.json(docs);
  });
});

app.post('/contacts', function(req,res){
  console.log(req.body);
  db.contacts.insert(req.body, function(err,doc){
    res.json(doc);
  });
});

app.delete('/contacts/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  })
});

app.get('/contacts/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});

app.put('/contacts/:id', function(req,res){
  var id = req.params.id;
  console.log(req.body.name);
  db.contacts.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new:true}, function(err,doc){
      res.json(doc);
    });
});

app.listen(8000);
console.log("Running on port 8000");
