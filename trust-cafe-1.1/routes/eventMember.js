var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.event;
  console.log("we go into the routes/eventMember");
  Event.getMember(name,function(err, eventList) {
    if(err) {
      // console.log(err);
      next();
    } else {
      // res.redirect('/eventMember');
      res.render('eventMember',
      {customer : req.session.customer || null,eventList : eventList});
    }
  });
});

// customers test
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
            customer : req.session.customer || null
          });
        }
    }
  });
});

module.exports = router;
