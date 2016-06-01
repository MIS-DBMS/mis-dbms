var db = require('./db');
var bcrypt = require('bcryptjs');
var async = require('async');

var salt = "trust-cafe-password-salt";
//上次我們使用了一般的方法直接連接DB
var customerList = [{
  name : "William1",
  password : "password1",
  account : "account1",
  phone : "",
  email : "",
  jobTitle : "",
  address : "",
  birthday : ""
},
{
  name : "William2",
  password : "password2",
  account : "account2",
  phone : "",
  email : "",
  jobTitle : "",
  address : "",
  birthday : ""
},
{
  name : "William3",
  password : "password3",
  account : "account3",
  phone : "",
  email : "",
  jobTitle : "",
  address : "",
  birthday : ""
}];


db("customer")
  .insert({
      name: "Test-name1",
    account: "account1",
    password: "password1",
    phone : "",
    email : "",
    jobTitle : "",
    address : "",
    birthday : ""
  })
  .then(function(result) {
    var insertedId = result[0];
    console.log(insertedId);
  })
  .catch(function(err) {
    console.log(err);
  });
//db.query("
//
//  ALTER TABLE `table_name` AUTO_INCREMENT=1
//
//")



//所以現在我們可以開始幫我們的資料庫撰寫資料model方便之後使用
