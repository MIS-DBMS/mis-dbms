var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');
var Customer = require('../models/Customer');

var Event = function(options) {
  this.id = options.id;
  this.eventName = options.eventName;
  this.location = options.location;
  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.eventTag = options.eventTag;
  this.description = options.description;
};

var participateMember =function(options) {
  this.id = options.id;
  this.eventName = options.eventName;
  this.location = options.location;
  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.eventTag = options.eventTag;
  this.description = options.description;
  this.customerId = options.customerId;
  this.eventId = options.eventId;
  this.customerName = options.customerName;
  this.account = options.account;
  this.password = options.account;
  this.phone = options.phone;
  this.email = options.email;
  this.jobTitle = options.jobTitle;
  this.address = options.address;
  this.birthday = options.birthday;
}


Event.get = function(eventId, cb) {
  db.select()
  .from('event')
  .where({
    id : eventId
  })
  .map(function(row) {
    return new Event({
      id : row.id,
      eventName :row.eventName,
      location : row.location,
      date : row.date,
      startTime : row.startTime,
      endTime : row.endTime,
      eventTag : row.eventTag,
      description : row.description
    });
  })
  .then(function(eventList) {
    cb(null, eventList[0]);
  })
  .catch(function(err) {
    console.log(err);
    cb(new GeneralErrors.NotFound());
  })
}

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
      cb(null, eventList[0]);
    } else {
    cb(new GeneralErrors.NotFound());
    }
  })
}


Event.getAll = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
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
// pie
// one
Event.getAllOne = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: 'Monday不魯'
  })
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
// Two
Event.getAllTwo = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: 'Think Big'
  })
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
// Three
Event.getAllThree = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: '政大創立方講座 '
  })
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
// Four
Event.getAllFour = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: '創業肥皂箱'
  })
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
// Five
Event.getAllFive = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: '創業計畫書撰寫'
  })
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
// Six
Event.getAllSix = function(cb) {
  db.select()
  .from('event')
  .join('participate', 'event.id', 'participate.eventId')
  .join('customer', 'participate.customerId', 'customer.id')
  .where({
    eventTag: '東協相關議題'
  })
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

Event.getMember = function(name,cb) {
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
    return new participateMember(row);
  })
  .then(function(participateList) {
    if(participateList.length) {
      cb(null, participateList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(err);

  });
}

Event.getTag = function(name,cb) {
  db.select('*')
  .from('event')
  .join('participate', function(){
    this.on('participate.eventId', '=', 'event.id')
  })
  .join('customer', function(){
    this.on('participate.customerId', '=', 'customer.id')
  })
  .where({
    eventTag :name
  })
  .map(function(row){
    return new participateMember(row);
  })
  .then(function(participateList) {
    if(participateList.length) {
      cb(null, participateList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(err);

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
      eventTag : this.eventTag,
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
      eventTag : this.eventTag,
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


Event.prototype.getMembers = function(cb) {
  db('event').select('*')
  .from('event')
  .join('participate', function(){
    this.on('participate.eventId', '=', 'event.id')
  })
  .join('customer', function(){
    this.on('participate.customerId', '=', 'customer.id')
  })
  .map(function(row){
    return new Customer({
      id : row.customerId,
      customerName : row.customerName,
      account : row.account,
      password : row.password,
      phone : row.phone,
      email : row.email,
      jobTitle : row.jobTitle,
      address : row.address,
      birthday : row.birthday
    });
  })
  .then(function(customerList) {
    this.customerList = customerList;
    cb();

  }.bind(this))
  .catch(function(err) {
    console.log(err+" here is err in getMembers");
    cb(err);
  });

}


module.exports = Event;
