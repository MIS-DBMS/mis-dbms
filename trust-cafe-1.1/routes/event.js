var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
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

router.get('/',function(req, res) {
  Event.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        eventList : eventList
      })
    }
  });
});



router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

// 增加要輸入event資料的位置
  var newEvent = new Event({
    eventName : req.body.eventName,
    location : req.body.location,
    description : req.body.description
    // eventId : req.body.eventId,
    // customerId : req.session.customer.id
  });

  newEvent.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {

      res.redirect("/");
    }
  });
});

router.get('/',function(req, res) {
  Event.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        eventList : eventList
      })
    }
  });
});



module.exports = router;
