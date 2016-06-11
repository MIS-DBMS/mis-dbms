var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('postEvent', {
    customer : req.session.customer || null
  });
});


router.get('/Byname', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('searchEvent', {
    customer : req.session.customer || null
  });
});

router.get('/:eventId', function(req, res, next) {
  Event.get(req.params.eventId, function(err, event) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.render('eventDetail', {
            event : event,
            customer : req.session.customer || null
          });
        }
    }
  });
});

// router.get('/:eventId', function(req, res, next) {
//   Event.get(req.params.eventId, function(err, event) {
//     if(err) {
//       next();
//     } else {
//       event.getMembers(function(err, customer) {
//         if(err) {
//           console.log(err);
//           cb(err);
//         } else {
//           event.customer = customer;
//           cb(null);
//         }
//       });
//     //   async.each(eventList,function(event, cb) {
//     //
//     //   }, function(err){
//     //     if(err) {
//     //       // res.status = err.code;
//     //       next();
//     //       console.log(err+"123123123");
//     //     } else {
//     //       res.render('eventDetail', {
//     //         event : event,
//     //         customer : req.session.customer || null
//     //       });
//     //     }
//     //   }
//     //
//     // );
//     // if(err) {
//     //   console.log(err);
//     // } else {
//     //   console.log(event);
//     //   res.render('eventDetail', {
//     //     event : event,
//     //     customer : req.session.customer || null
//     //   });
//     // }
//   }
// });
// });

router.get('/',function(req, res) {
  Event.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        eventList : eventList
      })
    }
  });
});

// ejs postEvent
router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  // 增加要輸入event資料的位置
  var newEvent = new Event({
      eventName : req.body.eventName,
      location : req.body.location,
      description : req.body.description,
      date :req.body.date,
      startTime:req.body.startTime,
      endTime:req.body.endTime
  });

  newEvent.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect("/");
    }
  });
});



router.get('/',function(req, res) {
  Event.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        eventList : eventList
      })
    }
  });
});



module.exports = router;
