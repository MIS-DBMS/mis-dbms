/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var async = require('async');
// router.get('/Byname', function(req, res) {
//   if(!req.session.customer) {
//     res.redirect('/');
//   }
//
//   res.render('searchEvent', {
//     customer : req.session.customer || null
//   });
// });


/* GET home page. */
// router.get('/event/Byname', function(req, res, next) {
//   console.log("testtest");
//     res.render('searchEvent', {
//         event : null,
//         customer : req.session.customer,
//         message: req.flash('loginMessage')
//     });
// });

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
          customer : req.session.customer;
          participateMemberList :participateMemberList
          // res.redirect('/eventMember');
          res.render('eventMember',{
            participateMemberList : participateMemberList,
            customer : req.session.customer
          })
        }
    });
});




module.exports = router;
