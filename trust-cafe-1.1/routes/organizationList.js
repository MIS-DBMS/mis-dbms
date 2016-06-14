var express = require('express');
var router = express.Router();
var Organization = require('../models/Organization');
var async = require('async');


/* GET home page. */
router.get('/', function(req, res, next) {
  Organization.getAll(function(err, organizationList) {
    if(err) {
      next();
    } else {
      res.render('organizationList',
      { customer : req.session.customer || null,
        organizationList : organizationList
      })
    }
  });
});

module.exports = router;
