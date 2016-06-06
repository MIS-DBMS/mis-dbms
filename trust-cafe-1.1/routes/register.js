var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    customer : null
  });
});

// customers test
router.get('/customers/:customerId', function(req, res) {
  Customer.get(req.params.customerId, function(err, customer) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(customer);
    }
  })

});

router.post('/', function(req, res, next) {

  //首先必須先產生出一個 Customer 的物件在進行save
  var newCustomer = new Customer({
    customerName : req.body.customerName,
    account : req.body.account,
    password : req.body.password
  });

  newCustomer.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.customer = newCustomer;
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.customer = null;
  res.redirect('/');
});


module.exports = router;
