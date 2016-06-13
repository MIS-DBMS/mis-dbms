var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');
var Participate = require('../models/Participate');

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('postEvent', {
    customer : req.session.customer || null
  });
});


router.get('/Byname', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('searchEvent', {
    customer : req.session.customer || null,
    message: req.flash('SearchMessage')
  });
});

router.post('/:eventId', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  var newParticipate = new Participate({
    customerId : req.body.customerId,
    eventId : req.body.eventId
  });

  newParticipate.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect(req.body.eventId+'/success');
    }
  });
});

router.get('/:eventId/success', function (req, res) {
  Event.get(req.params.eventId, function(err, event) {
    if(err) {
      console.log(err);
      next();
    } else {
      if(err) {
        console.log(err);
      } else {
        res.render('success', {
          event : event,
          customer : req.session.customer || null,
          message: "報名成功"});
        }
      }
    });
  });

  router.get('/:eventId', function(req, res, next) {
    Event.get(req.params.eventId, function(err, event) {
      if(err) {
        console.log(err);
        next();
      } else {
        if(err) {
          console.log(err);
        } else {
          res.render('eventDetail', {
            event : event,
            customer : req.session.customer || null,
            message: req.flash('RegisterMessage')
          });
        }
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
      description : req.body.description,
      date :req.body.date,
      startTime:req.body.startTime,
      eventTag : req.body.eventTag,
      endTime:req.body.endTime
    });
console.log(req.body.eventTag);
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
