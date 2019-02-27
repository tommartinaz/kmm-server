const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require("cors");
const knex = require('./db/knex.js');
require('dotenv').config();
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(cors())

app.get('/', function(req, res){
  res.redirect('/home');
});

app.get('/home', function(req, res){
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/portfolio', function(req, res){
  knex('projects').then((projects)=>{

    res.render('portfolio', {projects: projects});
  })
});

app.get('/services', function(req, res){
  res.render('services');
});

app.get('/faq', function(req, res){
  res.render('faq');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/thanks', function(req, res){
  res.render('thanks');
});




var routes_setter = require('./config/routes.js');
routes_setter(app);

app.listen(port, function() {
  console.log('Listening on', port);
});
