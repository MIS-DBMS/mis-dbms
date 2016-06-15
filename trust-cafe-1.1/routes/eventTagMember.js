var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');
var Participate = require('../models/Participate');
router.get('/list', function(req, res) {
  console.log("hi");
  if(!req.session.customer) {
    res.redirect('/');
  }
  Event.getAllOne(function(err, eventListOne,next) {
    Event.getAllTwo(function(err, eventListTwo) {
      Event.getAllThree(function(err, eventListThree) {
        Event.getAllFour(function(err, eventListFour) {
          Event.getAllFive(function(err, eventListFive) {
            Event.getAllSix(function(err, eventListSix) {
              Event.getAllFour(function(err, eventListFour) {
                  res.render('eventTagMember',
                  { customer : req.session.customer || null,
                    eventListSix : eventListSix,
                    eventListFive : eventListFive,
                    eventListFour : eventListFour,
                    eventListThree : eventListThree,
                    eventListTwo : eventListTwo,
                    eventListOne : eventListOne
                  });

              });
            })
          })
        });
      });
    });
  });
  // Event.getAllFour(function(err, eventListFour) {
  //     console.log(eventListFour);
  //     res.render('eventTagMember',
  //     { customer : req.session.customer || null,
  //       eventListFour : eventListFour,
  //       eventListOne : eventListOne
  //     });

  // });
});// end of get



  module.exports = router;
