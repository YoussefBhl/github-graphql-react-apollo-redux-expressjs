var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
var app = express(),
  request = require('request');

//const accessToken = 'f2e80704c45afd1a9b60d9c1b79f8d524938c95c';

const client_id = "59facfdca2f48eb7fab2",
      scope = "notifications+repo",
      client_secret = "0ebdb2aba153a7f99c9a60c98e4b4c83c06cb872";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/auth/github", function (req, res) {
  console.log("started scope");
  res.redirect("https://github.com/login/oauth/authorize/?client_id="+client_id+"&scope="+scope);
  //return githubOAuth.login(req, res);
});

app.get("/auth/github/callback", function (req, res) {
  console.log(req.query.code)
  console.log("received callback");
  request.post("https://github.com/login/oauth/access_token/?client_id="+client_id +
    "&client_secret="+client_secret+"&code=" + req.query.code, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred and handle it
      //console.log('error:', response); // Print the error if one occurred and handle it
      console.log(body); // Print the response status code if a response was received
      res.redirect('http://localhost:8080?'+body)
    }

  )
});
/*
else{
  req.redirect('/auth/github')
}*/


module.exports = app;
