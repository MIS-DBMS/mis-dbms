/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var async = require('async');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('searchEvent', {
        event : null
    });
});

//trytry


// 判斷帳密是否正確
router.post('/', function(req, res) {
    var inputname = req.body.eventName;
    Event.getName(inputname, function(err, event) {
        if(err || inputname != event.eventName) {
            res.render('searchEvent',{
                event : null
            });
        } else {
          req.session.event = event;
          res.redirect('/eventMember');
        }
    });
});




module.exports = router;
