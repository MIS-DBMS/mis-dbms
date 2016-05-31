//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var eventTag = function(options) {// Original var Client is Member
  this.id = options.id;
  this.eventId = options.eventId;
  this.tag = options.tag;
};

//Class Function
eventTag.get = function(tagId, cb) {
  //這邊是當傳入一個tagId時，進入資料庫查出相對應的tag資料
  db.select().from('eventTag').where({
      id : tagId
    })
    .map(function(row) {
      //將select出來的資料轉換成tag物件
      return new eventTag(row);
    })
    .then(function(eventTagList) {
      if(eventTagList.length) {
        cb(null, eventTagList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

//Instance Function
eventTag.prototype.save = function (cb) {
  if(this.id) {
    db('eventTag')
      .update({
        tag : this.tag,
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
        eventId : this.eventId,
        tag : this.tag,
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



//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Member;
