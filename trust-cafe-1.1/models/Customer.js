//這是一個Customer Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Customer = function(options) {
  this.id = options.id;
  this.customerName = options.customerName;
  this.password = options.password;
  this.account = options.account;
  this.phone = options.phone;
  this.email = options.email;
  this.jobTitle = options.jobTitle;
  this.address = options.address;
  this.birthday = options.birthday;
};

//Class Function
Customer.get = function(customerId, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料
  db.select()
  .from('customer')
  .where({
    id : customerId
  })
  .map(function(row) {
    return new Customer(row);
  })
  .then(function(customerList) {
    if(customerList.length) {
      cb(null, customerList[0]);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    cb(err);
  })
}


Customer.getAll = function(cb) {
  db.select()
  .from('customer')
  .map(function(row) {
    return new Customer(row);
  })
  .then(function(customerList) {
    cb(null, customerList);
  })
  .catch(function(err) {
    cb(new GeneralErrors.Database());
  });
}


//Login
Customer.getByAccount = function(customerAccount, cb) {
  db.select().from("customer").where({
    account : customerAccount,
  })
  .map(function(row){
    return new Customer(row);
  })
  .then(function(customerList) {
    if(customerList.length) {
      cb(null, customerList[0]);//customerList[0]=customerList
      //console.log(customerList[0]);// 確認輸入的資料所對應的資料
    } else {
      //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
      cb(new GeneralErrors.NotFound());
    }
  })
}


//我們接下來嘗試是否可以正確取得資料
//接下來完成其他會用到的function
//Instance Function
Customer.prototype.save = function (cb) {
  //save的概念是當物件不存在時新增，存在時對DB做更新
  if (this.id) {
    //已存在
    db("customer").where({
      id : this.id
    })
    .update({
      customerName : this.customerName,
      account : this.account,
      password : this.password,
      phone : this.phone,
      email : this.email,
      jobTitle : this.jobTitle,
      address : this.address,
      birthday : this.birthday
    })
    .then(function() {
      cb(null, this);
    }.bind(this))
    .catch(function(err) {
      console.log("CUSTOMER UPDATED", err);
      cb(new GeneralErrors.Database());
    });
  } else {
    //不存在
    db("customer")
    .insert({
      customerName : this.customerName,
      account : this.account,
      password : this.password,
      phone : this.phone,
      email : this.email,
      jobTitle : this.jobTitle,
      address : this.address,
      birthday : this.birthday
    })
    .then(function(result) {
      var insertedId = result[0];
      this.id = insertedId;
      cb(null, this);
    }.bind(this))
    .catch(function(err) {
      console.log("CUSTOMER INSERT", err);
      cb(new GeneralErrors.Database());
    });
  }
};

//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Customer;
