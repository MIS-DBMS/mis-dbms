var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var Host = require('../models/Host');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {
  Event.getAllEvent(function(err, eventList) {
    if(err) {
      next();
    } else {
      res.render('index',
      { customer : req.session.customer || null,
        eventList : eventList
      })
    }
  });
});




module.exports = router;
