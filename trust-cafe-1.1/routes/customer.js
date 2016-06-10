var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/:customerId', function(req, res, next) {
  Customer.get(req.params.customerId, function(err, customer) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.render('customer', {
            customer : customer
          });
        }
    }
  });
});

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('updateCustomer', {
    customer : req.session.customer || null
  });
});

router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  // 增加要輸入event資料的位置
  var newCustomer = new Customer({
    id : req.session.customer.id,
    customerName : req.body.customerName,
    account : req.session.customer.account,
    password : req.body.password,
    phone : req.body.phone,
    email : req.body.email,
    jobTitle : req.body.jobTitle,
    address : req.body.address,
    birthday : req.body.birthday
  });

  newCustomer.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
