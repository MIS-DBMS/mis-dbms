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



module.exports = router;
