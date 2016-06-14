/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var async = require('async');

router.post('/eventMember', function(req, res) {
    var inputname = req.body.eventName;
    Event.getMember(inputname, function(err, participateMemberList, message) {
        if(err ) {
            res.render('searchEvent',{
                participateMemberList : null,
                customer : req.session.customer,
                message:  '無人參與這個活動'
            });
        } else {
          console.log(participateMemberList.length);
          customer : req.session.customer;
          participateMemberList :participateMemberList
          res.render('eventMember',{
            participateMemberList : participateMemberList,
            customer : req.session.customer
          })
        }
    });
});


module.exports = router;
