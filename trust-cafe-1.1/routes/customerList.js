var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {
  Customer.getAll(function(err, customerList) {
    if(err) {
      next();
    } else {
      res.render('customerList',
      { customer : req.session.customer || null,
        customerList : customerList
      })
    }
  });
});

module.exports = router;
