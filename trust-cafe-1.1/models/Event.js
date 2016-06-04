// 這是一個 Event Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Event = function(options) {
  this.id = options.id;
  this.eventName = options.eventName;
  this.location = options.location;
  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.description = options.description;
};

//Class Function
Event.get = function(eventId, cb) {
  //這邊是當傳入一個 eventId時，進入資料庫查出相對應的 event資料
  db.select().from('event').where({
      id : eventId
    })
    .map(function(row) {
      //將select出來的資料轉換成Event物件
      return new Event(row);
    })
    .then(function(eventList) {
      if(eventList.length) {
        cb(null, eventList[0]);
      } else {
        //這邊要產生一個NotFound
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}


Event.getMember = function(eventName, cb) {
  db.select('*')
  .from('event')
  .leftJoin('participate', 'event.id', 'participate.eventId')
  .leftJoin('customer', 'participate.customerId', 'customer.id')
  .where({
    name : eventName,
  })
      .map(function(row){
        return new Event(row);
      })
      .then(function(eventList) {
        if(eventList.length) {
          cb(null, eventList[0]);
        } else {
          //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
          cb(new GeneralErrors.NotFound());
        }
      })
}


Event.getAll = function(cb) {
  db.select()
    .from('event')
    .leftJoin('participate', 'event.id', 'participate.eventId')
    .leftJoin('customer', 'participate.customerId', 'customer.id')
    .map(function(row) {
      return new Event({
        eventName : row.eventName,
        customerName : row.customerName
      });
    })
    .then(function(eventList) {
      cb(null, eventList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}


//Instance Function
Event.prototype.save = function (cb) {
  //save的概念是當物件不存在時新增，存在時對DB做更新
  if (this.id) {
    //已存在
    db("event").where({
        id : this.id
      })
      .update({
        eventName : this.eventName,
        location : this.location,
        date : this.date,
        startTime : this.startTime,
        endTime : this.endTime,
        description : this.description
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("EVENT UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {
    //不存在
    db("event")
      .insert({
        eventName : this.eventName,
        location : this.location,
        date : this.date,
        startTime : this.startTime,
        endTime : this.endTime,
        description : this.description
      })
      .then(function(result) {
        var insertedId = result[0];
        this.id = insertedId;
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("EVENT INSERT", err);
        cb(new GeneralErrors.Database());
      });
  }
};


module.exports = Event;
