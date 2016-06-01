var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Participate = function(options) {
  this.id = options.id;
  this.customerId = options.customerId;
  this.eventId = options.eventId;
};

Participate.getAll = function(cb) {
  db.select()
    .from('participate')
    .map(function(row) {
      return new Participate({
        id : row.id,
        customerId : row.customerId,
        eventId : row.eventId,
        });
    })
    .then(function(participateList) {
      cb(null, participateList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Participate.get = function(participateId, cb) {
  db.select()
    .from('participate')
    .where({
      id : participateId
    })
    .map(function(row) {
      return new Participate({
        id : row.id,
        customerId : row.customerId,
        eventId : row.eventId
      });
    })
    .then(function(participateList) {
      if(participateList.length) {
        cb(null, participateList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}

//instance fnuction
Participate.prototype.save = function (cb) {
  if(this.id) {
    db('participate')
      .update({
        customerId : this.customerId,
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
    db('participate')
      .insert({
        customerId : this.customerId,
        eventId : this.eventId,
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


module.exports = Participate;
