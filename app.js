"use strict";

var config = require(process.cwd() + "/config/general.js");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require("consolidate");
var session = require("express-session");
var FileStore = require('session-file-store')(session);
var uuid = require("uuid");

var index = require("./routes/index");
var client = require("./routes/client");
var login = require("./routes/login");
var games = require("./routes/games");

var app = express();

// view engine setup
/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.handlebars);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Sessions */
app.use(session(
{
  store: new FileStore(
  {
    path: "./data/sessions",
    ttl: 3600
  }),
  secret: config.secret ? config.secret : "secrety secret",
  cookie:
  {
    maxAge: config.maxAge ? config.maxAge : 3600000 /* An hour */
  },
  resave: true,
  saveUninitialized: true,
  genid: function(request)
  {
    return uuid.v4();
  }
}));

app.use("/", index);
app.use("/client", client);
app.use("/login", login);
app.use("/games", games);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development')
// {
//   app.use(function(err, req, res, next)
//   {
//     res.status(err.status || 500);
//     res.render('error',
//     {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next)
{
  res.status(err.status || 500);
  res.send(JSON.stringify(
  {
    message: err.message,
    error: err
  }));
});

module.exports = app;
