var express = require('express');
var router = express.Router();
// var Member = require('../models/Member');
// var Article = require('../models/Article');
var Customer = require('../models/Customer');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.event) {
    res.redirect('/');
  }

  res.render('postArticle', { // 之後會改成 hostEvent
    event : req.session.event || null
  });
});

//members test
router.get('/:articleId', function(req, res, next) {
  Event.get(req.params.eventId, function(err, event) {
    if(err) {
      console.log(err);
      next();
    } else {
      Host.get(host.customerId, function(err, host) {
        if(err) {
          console.log(err);
        } else {
          Customer.get(customer.customerId, function(err, customer){
            if(err) {
              console.log(err);
            } else {
              host.customer = customer;
              res.render('articleDetail', {
                host : host,
                customer : req.session.member || null
              });
            }
          })
          // Host.get(host.customerId, function(err, member) {
          //   if(err) {
          //     console.log(err);
          //   } else {
          //     article.member = member;
          //     res.render('articleDetail', {
          //       article : article,
          //       member : req.session.member || null
          //     });
          //   }
          // })

        }
      })

    }
  });
});




router.post('/', function(req, res) {
  if(!req.session.member) {
    res.redirect('/');
  }

  var newArticle = new Article({
    title : req.body.title,
    content : req.body.content,
    memberId : req.session.member.id
  });

  newArticle.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {

      res.redirect("/");
    }
  });
});


module.exports = router;
