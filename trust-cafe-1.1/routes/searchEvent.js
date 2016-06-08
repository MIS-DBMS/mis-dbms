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
// router.get('/', function(req, res, next) {
//     res.render('searchEvent', {
//         event : null,
//         customer : req.session.customer
//     });
// });

//trytry


// 判斷帳密是否正確
router.post('/eventMember', function(req, res) {
    var inputname = req.body.eventName;
    Event.getMember(inputname, function(err, eventList) {
        if(err ) {
          console.log("get err in searchEvent.js");// not go into here
            res.render('eventMember',{
                eventList : null,
                customer : req.session.customer
            });
            console.log("search event name not exists");
        } else {
          console.log("go into else in searchEvent.js");
          customer : req.session.customer;
          eventList :eventList
          // res.redirect('/eventMember');
          res.render('eventMember',{
            eventList : eventList,
            customer : req.session.customer
          })
        }
    });
});




module.exports = router;
