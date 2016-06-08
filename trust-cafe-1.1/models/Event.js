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

var Test = function(options){
  id = options;
};
Event.getMember = function(name,cb) {
//  db.select('customer.id')
db.select('*')
    .from('event')
    .join('participate', function(){
      this.on('participate.eventId', '=', 'event.id')
    })
    .join('customer', function(){
      this.on('participate.customerId', '=', 'customer.id')
    })
    .where({
          eventName :name
    })
    .map(function(row){
        return new Event(row);
    })
    .then(function(eventList) {
            if(eventList.length) {
              cb(null, eventList);
            } else {
              cb(new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
          console.log(err);
          cb(err);

        });
    }



//Class Function
Event.get = function(eventId, cb) {
  //這邊是當傳入一個 eventId時，進入資料庫查出相對應的 event資料
  db.select()
    .from('event')
    .where({
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

//original
// Event.getMember = function(name, cb) {
//   db.select('eventName')
//     .from('event')
//     .leftJoin('participate', 'event.id', '=', 'participate.eventId')
//     .leftJoin('customer', 'participate.customerId','=', 'customer.id')
//     .where({
//       eventName : name
//     })
//     .map(function(row){
//         return new Test(row); //Event
//     })
//     .then(function(testList) {
//         if(testList.length) {
//           cb(null, testListrList[0]);
//           console.log(testList);
//         } else {
//           //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
//           cb(new GeneralErrors.NotFound());
//         }
//     })
// }


//trytrysee
Event.getName = function(name, cb) {
  db.select().from("event").where({
    eventName : name
  })
      .map(function(row){
        return new Event(row);
      })
      .then(function(eventList) {
        if(eventList.length) {
          cb(null, eventList[0]);//customerList[0]=customerList
          //console.log(customerList[0]);// 確認輸入的資料所對應的資料
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
      return new Event(row);
    })
    .then(function(eventList) {
      cb(null, eventList);

    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

// test 0607
Event.getAllEvent = function(cb) {
  db.select()
    .from('event')
    .map(function(row) {
      return new Event(row);
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
