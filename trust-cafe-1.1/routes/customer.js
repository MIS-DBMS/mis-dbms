var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var CustomerInterest = require('../models/CustomerInterest');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/:customerId', function(req, res, next) {
  Customer.get(req.params.customerId, function(err, customer) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.render('customer', {
            customer : customer
          });
        }
    }
  });
});
router.get('/:customerId/new', function(req, res, next) {
  Customer.get(req.session.customer.id, function(err, customer) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.render('updateCustomer', {
            customer : customer
          });
        }
    }
  });
});


router.post('/', function(req, res, next) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  // 增加要輸入event資料的位置
  var newCustomer = new Customer({
    id : req.session.customer.id,
    customerName : req.body.customerName,
    account : req.session.customer.account,
    password : req.body.password,
    phone : req.body.phone,
    email : req.body.email,
    jobTitle : req.body.jobTitle,
    address : req.body.address,
    birthday : req.body.birthday
  });

  newCustomer.save(function(err,cb) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      CustomerInterest.getInterest(newCustomer.id,function(err,customerinterestList){
        if(err){
          next();
        }
        else{
          console.log(customerinterestList[0].id);
          for(i = 0; i < customerinterestList.length; i++){
            CustomerInterest.delInterest(customerinterestList[i].id,function(err){
              if(err){
                next();
              }
            });
          }
        }
      });
      // if(req.body.interest1){
      //   var newCustomerInterest1 = new CustomerInterest({
      //     id : req.session.customer.id,
      //     interest : req.body.interest1,
      //     customer_id : newCustomer.id,
      //   });
      //   newCustomerInterest1.save(function(err){
      //     if(err){
      //       next(err);
      //     }
      //   })
      // }
      res.redirect("/");
    }
  });
});


module.exports = router;
