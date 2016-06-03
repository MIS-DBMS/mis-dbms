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
