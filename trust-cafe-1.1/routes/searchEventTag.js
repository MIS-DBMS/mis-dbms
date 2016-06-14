/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var async = require('async');

router.post('/eventTagMemberList', function(req, res) {
    var inputtag = req.body.eventTag;
    Event.getTag(inputtag, function(err, participateMemberList, message) {
        if(err ) {
            res.render('searchEventTag',{
                participateMemberList : null,
                customer : req.session.customer,
                message:  '無人參與這個活動'
            });
        } else {
          res.render('eventTagMemberList',{
            participateMemberList : participateMemberList,
            customer : req.session.customer
          })
        }
    });
});


module.exports = router;
