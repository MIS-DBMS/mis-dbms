var express = require('express');
var router = express.Router();
var Organization = require('../models/Organization');
var Host = require('../models/Host');
var Event = require('../models/Event');
var async = require('async');

router.get('/new', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }

  res.render('postOrganization', {
    customer : req.session.customer || null
  });
});

router.post('/', function(req, res) {
  if(!req.session.customer) {
    res.redirect('/');
  }
  // 增加要輸入event資料的位置
  var newOrganization = new Organization({
    organizationName : req.body.organizationName,
    phone : req.body.phone,
    email : req.body.email,
    address :req.body.address,
    miscellaneous:req.body.miscellaneous
  });

  newOrganization.save(function(err) {
    if(err) {
      res.status = err.code;
      res.json(err);
    } else {
      res.redirect("/");
    }
  });
});

router.get('/',function(req, res) {
  Organization.getAll(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render('/',{
        organizationList : organizationList
      })
    }
  });
});

router.get('/:organizationId', function(req, res, next) {
  Organization.get(req.params.organizationId, function(err, organization) {
    if(err) {
      console.log(err);
      next();
    } else {
      if(err) {
        console.log(err);
      } else {
        Event.getAll(function(err, event){
          res.render('organizationDetail', {
            event : event,
            organization : organization,
            customer : req.session.customer || null,
            message: req.flash('RegisterMessage')
          });
        });
      }
    }
  });
});
router.get('host/:organizationId', function(req, res, next) {
  Organization.get(req.params.organizationId, function(err, organization) {
    if(err) {
      console.log(err);
      next();
    } else {
        if(err) {
          console.log(err);
        } else {
          res.redirect('back');
          // res.render('updateOrganization', {
          //   organization :  organization,
          //   customer : req.session.customer || null
          // });
        }
    }
  });
});

module.exports = router;
