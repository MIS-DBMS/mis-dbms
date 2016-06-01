var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Organization = function(options) {
  this.id = options.id;
  this.name = options.name;
  // this.password = options.password;
  // this.account = options.account;
  this.phone = options.phone;
  this.email = options.email;
  this.address = options.address;
  this.miscellaneous = options.miscellaneous;
};

//Class Function
Organization.get = function(organizationId, cb) {
  //這邊是當傳入一個 organizationId時，進入資料庫查出相對應的 organization資料
  db.select()
  .from('organization')
  .where({
      id : organizationId
    })
    .map(function(row) {
      //將select出來的資料轉換成 Member物件
      return new Organization(row);
    })
    .then(function(organizationList) {
      if(organization.length) {
        cb(null, organizationList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

// //Login
// Customer.getByAccount = function(customerAccount, customerPassword, cb) {
//   db.select().from("customer").where({
//     account : customerAccount,
//     password : customerPassword
//   })
//       .map(function(row){
//         return new Customer(row);
//       })
//       .then(function(customerList) {
//         if(customerList.length) {
//           cb(null, customer[0]);
//         } else {
//           //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
//           cb(new GeneralErrors.NotFound());
//         }
//       })
// }


//我們接下來嘗試是否可以正確取得資料
//接下來完成其他會用到的function
//Instance Function
Organization.prototype.save = function (cb) {
  //save的概念是當物件不存在時新增，存在時對DB做更新
  if (this.id) {
    //已存在
    db("organization").where({
        id : this.id
      })
      .update({
        name : this.name,
        // account : this.account,
        // password : this.password,
        phone : this.phone,
        email : this.email,
        address : this.address,
        miscellaneous : this.miscellaneous
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORGANIZATION UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {
    //不存在
    db("organization")
      .insert({
        name : this.name,
        // account : this.account,
        // password : this.password,
        phone : this.phone,
        email : this.email,
        address : this.address,
        miscellaneous : this.miscellaneous
      })
      .then(function(result) {
        var insertedId = result[0];
        this.id = insertedId;
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORGANIZATION INSERT", err);
        cb(new GeneralErrors.Database());
      });
  }
};



//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Organization;