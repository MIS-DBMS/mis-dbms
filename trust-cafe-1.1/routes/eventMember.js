var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
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

router.post('/', function(req, res) {
  console.log("Really go in this search ");
    var inputname = req.body.eventName;
    Event.getMember(inputname, function(err, event) {
        if(err || inputname != event.eventName) {
            res.render('searchEvent',{
                event : null,
                customer : req.session.customer
            });
            console.log("search event name not exists");
        } else {
          // req.session.event = event;
          customer : req.session.customer;
          event :event
          res.redirect('/eventMember');
        }
    });
});


module.exports = router;
