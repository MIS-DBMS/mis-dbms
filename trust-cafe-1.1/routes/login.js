/**
* Created by moons_000 on 2016/5/14.
*/
var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    customer : null,
    message: req.flash('loginMessage')
  });
});

// 判斷帳密是否正確
router.post('/', function(req, res) {
  var inputAccount = req.body.account;
  var inputPassword = req.body.password;
  Customer.getByAccount(inputAccount,  function(err, customer,message) {
    if(err ) {
      res.render('login',{
        customer : null,
        message:  'There do not exist this account'
      });
    } else {
      if(inputPassword != customer.password) {
        res.render('login',{
          customer : null,
          message:  'Oops! Wrong password.'
        });
      } else {
        req.session.customer = customer;
        res.cookie('account', req.body.account, { path: '/', signed: true});
        res.cookie('password', req.body.password, { path: '/', signed: true });
        res.redirect('/');
      }
    }
  });
});

// logout
router.post('/logout', function(req, res) {
  req.session.customer = null;
  res.clearCookie('account', { path: '/' });
  res.clearCookie('password', { path: '/' });
  res.redirect('/');
});



module.exports = router;
