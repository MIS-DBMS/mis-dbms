// 這是一個 Event Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var EventTag = function(options) {
  this.id = options.id;
  this.eventId = options.eventId;
  this.tag = options.tag;
};

//Class Function
EventTag.get = function(eventTagId, cb) {
  //這邊是當傳入一個eventTagId時，進入資料庫查出相對應的eventTag資料
  db.select().from('EventTag').where({
    id : eventTagId
  })
  .map(function(row) {
    //將select出來的資料轉換成eventTag物件
    return new EventTag(row);
  })
  .then(function(eventTagList) {
    if(eventTagList.length) {
      cb(null, eventTagList[0]);
    } else {
      //這邊要產生一個NotFound
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    cb(err);
  })
}

//Instance Function
EventTag.prototype.save = function (cb) {
  if(this.id) {
    db('eventTag')
    .update({
      tag : this.tag,
      eventId : this.eventId
    })
    .where({
      id : this.id
    })
    .then(function() {
      cb(null);
    })
    .catch(function(err) {
      console.log(err);
      cb(null, new GeneralErrors.Database());
    })
  } else {
    db('eventTag')
    .insert({
      tag : this.tag,
      eventId : this.eventId
    })
    .then(function(result) {
      this.id = result[0];
      cb(null, this);
    }.bind(this))
    .catch(function(err) {
      console.log(err);
      cb(null, new GeneralErrors.Database());
    });
  }
};

module.exports = EventTag;
