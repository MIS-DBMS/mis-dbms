var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('req-flash');

var routes = require('./routes/index');
var signup = require('./routes/signup');
var users = require('./routes/users');
var event = require('./routes/event');
var login = require('./routes/login');
var searchEvent = require('./routes/searchEvent');
var searchEventTag = require('./routes/searchEventTag');
var eventMember = require('./routes/eventMember');
var eventDetail = require('./routes/event');
var item = require('./routes/item');
var customer = require('./routes/customer');
var updateEvent = require('./routes/updateEvent');
var updateOrganization = require('./routes/updateOrganization');
var organization = require('./routes/organization');
var organizationList = require('./routes/organizationList');
var customerList = require('./routes/customerList');
var profile = require('./routes/profile');
var eventTagMember = require('./routes/eventTagMember');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret : 'HelloExpressSESSION'}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('123456789'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// use (用在url的哪裡, 哪個已宣告的routes變數)
app.use('/', routes);
app.use('/users', users);
app.use('/event', event);
app.use('/signup', signup);
app.use('/login', login);
app.use('/eventMember', eventMember);
app.use('/searchEvent', searchEvent);
app.use('/searchEventTag', searchEventTag);
app.use('/eventDetail', eventDetail);
app.use('/item', item);
app.use('/customer', customer);
app.use('/updateEvent', updateEvent);
app.use('/updateOrganization', updateOrganization);
app.use('/organization', organization);
app.use('/organizationList', organizationList);
app.use('/customerList', customerList);
app.use('/profile', profile);
app.use('/eventTagMember',eventTagMember);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
