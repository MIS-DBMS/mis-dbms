// 這是一個 Event Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Event = function(options) {// Original var Customer is Member
  this.id = options.id;
  this.name = options.name;
  this.location = options.location;
  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.description = options.description;
};

//Class Function
Event.get = function(eventId, cb) {
  //這邊是當傳入一個customerId時，進入資料庫查出相對應的customer資料
  db.select().from('event').where({
      id : eventId
    })
    .map(function(row) {

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

// Get by name
Event.getByName = function(itemName, cb) {
  db.select().from("Name").where({
    name : itemName,
  })
      .map(function(row){
        return new Event(row);
      })
      .then(function(eventList) {
        if(eventList.length) {
          cb(null, event[0]);
        } else {
          //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
          cb(new GeneralErrors.NotFound());
        }
      })
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
        name : this.name,
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
        name : this.name,
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
