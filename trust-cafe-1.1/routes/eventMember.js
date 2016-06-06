var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Event = require('../models/Event');
var Test = require('../models/Event');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.event;
  console.log(req.session.event);
  Event.getMember(function(err, test) {
    if(err) {
      next();
    } else {
      console.log(test);
      res.render('eventMember',
      {
        test : req.session.test || null,
        customer : req.session.customer || null
      });
    }
  });
});

router.get('/', function(req, res, next) {
  Event.getAll(function(err, eventList) {
    if(err) {
      next();
    } else {
      console.log(eventList);
      res.render('eventMember',
      {customer : req.session.customer || null,  eventList : eventList });
    }
  });
});

// trytrysee2
// router.get('/', function(req, res, next) {
//   Event.getAll(function(err, eventList) {
//     if(err) {
//       next();
//     } else {
//       console.log(eventList);
//       res.render('index',
//       {customer : req.session.customer || null,  eventList : eventList });
//     }
//   });
// });

//trytrysee
// router.get('/', function(req, res, next) {
//   Event.getAll(function(err, eventList) {
//     if(err) {
//       next();
//     } else {
//       // res.json(eventList); //trytrysee
//         res.render('index',
//         {
//           eventList : eventList
//         });
//     }
//   });
// });


// trytrysee
// router.get('/', function(req, res, next) {
//   Event.getAll(function(err, eventList) {
//     if(err) {
//       next();
//     } else {
//       //這邊的做法是使用async each這樣的方式幫我們從articleList中一筆筆去找到member，然後新增一個key叫member在article物件中
//       async.each(eventList, function(event, cb) {
//         Event.get(event.customerId, function(err, customer) {
//           if(err) {
//             cb(err);
//           } else {
//             event.customer = customer;
//             cb(null);
//           }
//         });
//       }, function(err){
//         if(err) {
//           res.status = err.code;
//           next();
//         } else {
//           res.render('index',
//           {customer : req.session.customer || null,  eventList : eventList });
//         }
//       });
//     }
//   });
// });


module.exports = router;
