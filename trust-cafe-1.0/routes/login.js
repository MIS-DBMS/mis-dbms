/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var customer = require('../models/Customer');
var async = require('async');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        customer : null
    });
});


router.post('/', function(req, res) {
    var inputAccount = req.body.account;
    var inputPassword = req.body.password;
    Customer.getByAccount(inputAccount, inputPassword, function(err, customer) {
        if(err || inputPassword != customer.password) {
            res.render('login',{
                customer : null
            });
            console.log("Your account or password is wrong");

        } else {
            req.session.customer = customer;
            res.redirect('/');
        }
    });
});

router.post('/logout', function(req, res) {
    req.session.customer = null;
    res.redirect('/');
});



module.exports = router;
