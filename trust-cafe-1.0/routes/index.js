var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  Host.getAll(function(err, hostList) {
    if(err) {
      next();
    } else {
      //這邊的做法是使用async each這樣的方式幫我們從articleList中一筆筆去找到member，然後新增一個key叫member在article物件中
      async.each(hostList, function(host, cb) {
        Customer.get(host.customerId, function(err, customer) {
          if(err) {
            cb(err);
          } else {
            host.customer = customer;
            cb(null);
          }
        });
      }, function(err){
        if(err) {
          res.status = err.code;
          next();
        } else {
          res.render('index',
          {
            customer : req.session.customer || null,
            customerList: customerList
          });
        }
      });

    }
  });
});


module.exports = router;
