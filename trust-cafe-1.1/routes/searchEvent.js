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
  console.log("Really go in this search ");// 這裡有被log出來
    var inputname = req.body.eventName;
    Event.getMember(inputname, function(err, event) {
        if(err || inputname != event.eventName) {
            res.render('searchEvent',{
                event : null,
                customer : req.session.customer
            });
            console.log("search event name not exists");
        } else {
          // req.session.event = event;
          customer : req.session.customer;
          event :event
          // res.redirect('/eventMember');
          res.render('eventMember',{
            event : event,
            customer : req.session.customer
          })
        }
    });
});




module.exports = router;
