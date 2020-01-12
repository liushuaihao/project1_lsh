var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (JSON.stringify(req.body) == "{}") {
    var json = req.query
  } else {
    var json = req.body
  }
  var type = true;
  for (i in json) {
    if (json[i] == '') {
      type = false
    }
  }
  if (type) {
    req.data = json;
    next()
  } else {
    res.send({ type: 0, data: '' })
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
