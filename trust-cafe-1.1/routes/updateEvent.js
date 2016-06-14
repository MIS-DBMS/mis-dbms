var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/:eventId', function(req, res, next) {
  Event.get(req.params.eventId, function(err, event) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.render('updateEvent', {
            event :  event,
            customer : req.session.customer || null
          });
        }
    }
  });
});

router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  // 增加要輸入event資料的位置
  var newEvent = new Event({
    id : req.body.id,
    eventName : req.body.eventName,
    location : req.body.location,
    description : req.body.description,
    date : req.body.date,
    startTime : req.body.startTime,
    endTime : req.body.endTime,
    eventTag : req.body.eventTag
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


module.exports = router;
