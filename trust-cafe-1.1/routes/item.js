var express = require('express');
var router = express.Router();
var Item = require('../models/Item');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('postItem', {
    customer : req.session.customer || null
  });
});


// router.get('/Byname', function(req, res) {
//   if(!req.session.customer) {
//     res.redirect('/');
//   }
//
//   res.render('searchItem', {
//     customer : req.session.customer || null
//   });
// });


// customers test
// router.get('/:itemId', function(req, res, next) {
//   Item.get(req.params.eventId, function(err, event) {
//     console.log("Use the get fcn in Item");
//     if(err) {
//       console.log(err);
//       next();
//     } else {
//         if(err) {
//           console.log(err);
//         } else {
//           res.render('itemDetail', {
//             item : item,
//             customer : req.session.customer || null
//           });
//         }
//     }
//   });
// });

router.get('/',function(req, res) {
  Item.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        itemList : itemList
      })
    }
  });
});

// ejs postEvent
router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  console.log("Enter routes/item.js post");
  var sponsertag = req.body.sponserTag;
  var customername = req.body.customerName;
  var organizationname = req.body.organizationName;
  var eventname = req.body.eventName;



  if(sponsertag == 'CUS'){
    console.log("進入sponsertag==CUS");
    Item.getCustomerID(customername,function(err,item1){
      if(err){
        res.render('postItem',{
          itemList : null,
          customer : req.session.customer
        });
      } else {
        console.log("customer info");
        console.log(item1);
        console.log(item1[0].customerId);
        Item.getEventID(eventname,function(err,item2){
          if(err){
            res.render('postItem',{
              itemList : null,
              customer : req.session.customer
            });
          } else {
            console.log("event info");
            console.log(item2);
            console.log(item2[0].eventId);
            var newItem = new Item({
              name : req.body.name,
              date : req.body.date,
              description : req.body.description,
              value : req.body.value,
              sponserTag : req.body.sponserTag,
              customerId : item1[0].customerId,
              eventId : item2[0].eventId
            });
            console.log("cus+event");
            console.log(newItem);
            newItem.save(function(err) {
              if(err) {
                res.status = err.code;
                res.json(err);
              } else {
                res.redirect("/");
              }
            });
          }
        });
      }
    });
  } else {
    console.log("進入sponsertag==ORG");
    Item.getOrganizationID(organizationname,function(err,item1){
      if(err){
        res.render('postItem',{
          itemList : null,
          customer : req.session.customer
        });
      } else {
        console.log("organization info");
        console.log(item1);
        console.log(item1[0].organizationId);
        Item.getEventID(eventname,function(err,item2){
          if(err){
            res.render('postItem',{
              itemList : null,
              customer : req.session.customer
            });
          } else {
            console.log("event info");
            console.log(item2);
            console.log(item2[0].eventId);
            var newItem = new Item({
              name : req.body.name,
              date : req.body.date,
              description : req.body.description,
              value : req.body.value,
              sponserTag : req.body.sponserTag,
              organizationId : item1[0].organizationId,
              eventId : item2[0].eventId
            });
            console.log("org+event");
            console.log(newItem);
            newItem.save(function(err) {
              if(err) {
                res.status = err.code;
                res.json(err);
              } else {
                res.redirect("/");
              }
            });
          }
        });
      }
    });
  }
});


// router.post('/', function(req, res) {
//   if(!req.session.customer) {
//     res.redirect('/');
//   }
// console.log("Enter routes/item.js post");
//   var newItem = new Item({
//     name : req.body.name,
//     date : req.body.date,
//     description : req.body.description,
//     value : req.body.value,
//     customerId : req.body.customerId,
//     organizationId : req.body.organizationId,
//     eventId : req.body.eventId
//   });
//
//   newItem.save(function(err) {
//     if(err) {
//       res.status = err.code;
//       res.json(err);
//     } else {
//       // res.redirect("/");
//     }
//   });
// });


module.exports = router;
