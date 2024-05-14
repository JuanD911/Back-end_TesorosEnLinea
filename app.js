
var cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth.router');
var usersRouter = require('./routes/users.router');
var auctionsRouter = require('./routes/auctions.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Conexion a base de datos
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.on('error', () => {
  console.log('Error en la conexion a la base de datos');
});

connection.once('open', () => { 
  console.log('Conectado a la base de datos');
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/auctions', auctionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'The endpoint dos not exist'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    errorcode: err.status || 500, 
    message: res.locals.message})
});

module.exports = app;
