/**
 * Created by moons_000 on 2016/5/14.
 */
var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var async = require('async');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        member : null
    });
});


router.post('/', function(req, res) {
    var inputAccount = req.body.account;
    var inputPassword = req.body.password;
    Member.getByAccount(inputAccount, inputPassword, function(err, member) {
        if(err || inputPassword != member.password) {
            res.render('login',{
                member : null
            });
            console.log("Your account or password is wrong");
            //res.send("");
            //res.redirect('/');
        } else {
            req.session.member = member;
            res.redirect('/');
        }
    });
});

router.post('/logout', function(req, res) {
    req.session.member = null;
    res.redirect('/');
});


//Aut
//function checkAuth(req, res, next) {
//    if (!req.session.member) {
//        res.send('You are not authorized to view this page');
//    } else {
//        next();
//    }
//}
//
//
////router.get('/', checkAuth, function (req, res) {
////    res.send('if you are viewing this page it means you are logged in');
////});
//
//
////login
//router.post('/login', function (req, res) {
//    var post = req.member.id;
//    if (post.user === 'Me' && post.password === 'Mepass') {
//        req.session.member.id = member;
//        res.redirect('/');
//    } else {
//        res.send('Bad user/pass');
//    }
//});
//
//router.post('/login', function (req, res) {
//    var post = req.member.id;
//    if (post.account === 'john' && post.password === 'johnspassword') {
//        req.session.member.id = member;
//        res.redirect('/my_secret_page');
//    } else {
//        res.send('Bad user/pass');
//    }
//});


//
//router.post('/', function(req, res, next) {
//
//    //首先必須先產生出一個Member的物件在進行save
//    var newMember = new Member({
//        name : req.body.name,
//        account : req.body.account,
//        password : req.body.password
//    });
//    newMember.save(function(err) {
//        if(err) {
//            next(err);
//        } else {
//            //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
//            req.session.member = newMember;
//            res.redirect('/');
//        }
//    });
//});
//
//router.get('/logout', function(req, res, next) {
//    req.session.member.id = null;
//    res.redirect('/login');
//});


module.exports = router;
