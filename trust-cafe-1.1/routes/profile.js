// Routes things
var express = require('express');
var router = express.Router();
// Load db settings
var db = require("../libs/db.js");

// Load things we'd like to chart
var event = require("../models/Event");
var customer = require("../models/Customer");


var options = {
    chart: {
        renderTo: 'container',
        type: 'bar'
    },
    series: [{
        name: customer.customerName,
        data: event.eventTag
    }]
};

router.get('/', function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*"); // Configuration for Cross-Domain-Policy
  res.render('profile', {
    customer : null,
    message: req.flash('testMessage')
  });
});
<<<<<<< HEAD
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('login', {
//     customer : null,
//     message: req.flash('loginMessage')
//   });
// });
module.exports = router;
=======

module.exports = router;
>>>>>>> e1556866356de902f15413e811cf49476946d1d2
