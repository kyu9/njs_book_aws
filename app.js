var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

const redis = require('redis');
var json = require('JSON');
client = redis.createClient(6379, '127.0.0.1');

app.use(function(req, res, next){
  req.cache = client;
  next();
})

app.post('/profile',function(req, res, next){
  req.accepts('application/json');

  var key = req.body.name;
  var value = JSON.stringify(req.body);

  req.cache.set(key, value, function(err, data){
    if(err){
      console.log(err);
      res.send(err);
      return;
    }
    req.cache.expire(key, 20);
    res.json(value);
  });
})

app.get('/profile/:name', function (req, res, next){
  var key = req.params.name;

  req.cache.get(key, function(err, data){
    if(err){
      console.log(err);
      res.send(err);
      return;
    }
    var value = JSON.parse(data);
    res.json(value);
  })
})

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
