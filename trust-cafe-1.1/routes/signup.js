var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var CustomerInterest = require('../models/CustomerInterest');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', {
    customer : null,
    message: req.flash('RepeatMessage')
  });
});

// customers test
router.get('/customers/:customerId', function(req, res) {
  Customer.get(req.params.customerId, function(err, customer) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(customer);
    }
  })

});

router.post('/', function(req, res, next) {
  var inputAccount = req.body.account;
  Customer.getByAccount(inputAccount,  function(err, customer,message) {
    if(!err) {
      res.render('signup',{
        customer : null,
        message:  'There exist the same account'
      });
    }else{
      //首先必須先產生出一個 Customer 的物件在進行save
      var newCustomer = new Customer({
        customerName : req.body.customerName,
        account : req.body.account,
        password : req.body.password,
        phone : req.body.phone,
        email : req.body.email,
        jobTitle : req.body.jobTitle,
        address : req.body.address,
        birthday : req.body.birthday
      });
      newCustomer.save(function(err) {
        if(err) {
          next(err);
        } else {
          //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
          if(req.body.interest1){
            var newCustomerInterest1 = new CustomerInterest({
              interest : req.body.interest1,
              customer_id : newCustomer.id,
            });
            newCustomerInterest1.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest2){
            var newCustomerInterest2 = new CustomerInterest({
              interest : req.body.interest2,
              customer_id : newCustomer.id,
            });
            newCustomerInterest2.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest3){
            var newCustomerInterest3 = new CustomerInterest({
              interest : req.body.interest3,
              customer_id : newCustomer.id,
            });
            newCustomerInterest3.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest4){
            var newCustomerInterest4 = new CustomerInterest({
              interest : req.body.interest4,
              customer_id : newCustomer.id,
            });
            newCustomerInterest4.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest5){
            var newCustomerInterest5 = new CustomerInterest({
              interest : req.body.interest5,
              customer_id : newCustomer.id,
            });
            newCustomerInterest5.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest6){
            var newCustomerInterest6 = new CustomerInterest({
              interest : req.body.interest6,
              customer_id : newCustomer.id,
            });
            newCustomerInterest6.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest7){
            var newCustomerInterest7 = new CustomerInterest({
              interest : req.body.interest7,
              customer_id : newCustomer.id,
            });
            newCustomerInterest7.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest8){
            var newCustomerInterest8 = new CustomerInterest({
              interest : req.body.interest8,
              customer_id : newCustomer.id,
            });
            newCustomerInterest8.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          if(req.body.interest9){
            var newCustomerInterest9 = new CustomerInterest({
              interest : req.body.interest9,
              customer_id : newCustomer.id,
            });
            newCustomerInterest9.save(function(err){
              if(err){
                next(err);
              }
            })
          }
          req.session.customer = newCustomer;
          res.redirect('/');
        }
      });
    } // end of repeat test

  });
});

router.post('/logout', function(req, res, next) {
  req.session.customer = null;
  res.redirect('/');
});


module.exports = router;
