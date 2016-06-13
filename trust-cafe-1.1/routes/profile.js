// Load db settings
var db = require("../libs/db.js");

// Load things we'd like to chart
var event = require("../models/Event");
var customer = require("../models/Customer");

// Routes things
var express = require("express");
var router  = express.Router;

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

router.get('/profile', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); // Configuration for Cross-Domain-Policy
});

module.exports = router;
