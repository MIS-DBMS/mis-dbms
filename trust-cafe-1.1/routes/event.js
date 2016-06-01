var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('postEvent', {
    customer : req.session.customer || null
  });
});

// customers test
router.get('/:eventId', function(req, res, next) {
  Host.get(req.params.hostId, function(err, host) {
    if(err) {
      console.log(err);
      next();
    } else {
      Customer.get(host.customerId, function(err, customer) {
        if(err) {
          console.log(err);
        } else {
          host.customer = customer;
          res.render('eventDetail', {
            type : type,
            customer : req.session.customer || null
          });
        }
      })

    }
  });
});

// router.post('/', function(req, res, next) {
//
//   //首先必須先產生出一個 Customer 的物件在進行save
//   var newCustomer = new Customer({
//     name : req.body.name,
//     account : req.body.account,
//     password : req.body.password,
//     phone : req.body.phone,
//     email : req.body.email,
//     jobTitle : req.body.jobTitle,
//     address : req.body.address,
//     birthday : req.body.birthday
//   });
//
//   newCustomer.save(function(err) {
//     if(err) {
//       next(err);
//     } else {
//       //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
//       req.session.customer = newCustomer;
//       res.redirect('/');
//     }
//   });
// });

router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  var newHost = new Host({
    type : req.body.type,
    eventId : req.body.eventId,
    customerId : req.session.customer.id
  });

  newHost.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {

      res.redirect("/");
    }
  });
});


module.exports = router;
