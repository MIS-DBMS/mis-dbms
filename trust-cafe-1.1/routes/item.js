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
  var customername = req.body.customerName;
  var eventname = req.body.eventName;
  // var organizationname = req.body.organizationName;
  Item.getCustomerID(customername,function(err,item1){
    if(err){
      res.render('postItem',{
        itemList : null,
        customer : req.session.customer
      });
    } else {
      console.log(item1);
      console.log(item1[0].customerId);
      Item.getEventID(eventname,function(err,item2){
        if(err){
          res.render('postItem',{
            itemList : null,
            customer : req.session.customer
          });
        } else {
          console.log(item2);
          console.log(item2[0].eventId);
          var newItem = new Item({
            name : req.body.name,
            date : req.body.date,
            description : req.body.description,
            value : req.body.value,
            customerId : item1[0].customerId,
            // organizationId : req.body.organizationId,
            eventId : item2[0].eventId
          });
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
});


//original
// router.post('/', function(req, res) {
//   if(!req.session.customer) {
//     res.redirect('/');
//   }
//   console.log("Enter routes/item.js post");
//   var customername = req.body.customerName;
//   var eventname = req.body.eventName;
//   Item.getCustomerID(customername,function(err,item1){
//     if(err){
//       res.render('postItem',{
//         itemList : null,
//         customer : req.session.customer
//       });
//     } else {
//       console.log(item1);
//       console.log(item1[0].customerId);
//       Item.getEventID(eventname,function(err,item2){
//         if(err){
//           res.render('postItem',{
//             itemList : null,
//             customer : req.session.customer
//           });
//         } else {
//           console.log(item2);
//           console.log(item2[0].eventId);
//           var newItem = new Item({
//             name : req.body.name,
//             date : req.body.date,
//             description : req.body.description,
//             value : req.body.value,
//             customerId : item1[0].customerId,
//             // organizationId : req.body.organizationId,
//             eventId : item2[0].eventId
//           });
//           console.log(newItem);
//           newItem.save(function(err) {
//             if(err) {
//               res.status = err.code;
//               res.json(err);
//             } else {
//               res.redirect("/");
//             }
//           });
//         }
//       });
//     }
//   });
// });






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



module.exports = router;
