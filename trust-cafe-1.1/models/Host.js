var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Host = function(options) {
  this.id = options.id;
  this.customerId = options.customerId;
  this.eventId = options.eventId;
};

Host.get = function(hostId, cb) {
  db.select()
    .from('host')
    .where({
      id : hostId
    })
    .map(function(row) {
      // return new Host(row);
      return new Host({
        id : row.id,
        customerId : row.customerId,
        eventId : row.eventId
      });
    })
    .then(function(hostList) {
      if(hostList.length) {
        cb(null, hostList[0]);
      } else {
        cb(null, new GeneralErrors.NotFound());
      }

    })
    .catch(function(err) {
      console.log(err);
      cb(new GeneralErrors.Database());
    });
}


Host.getAll = function(cb) {
  db.select()
    .from('host')
    .map(function(row) {
      return new Host({
        id : row.id,
        customerId : row.customerId,
        eventId : row.eventId
        });
    })
    .then(function(hostList) {
      cb(null, hostList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}


//instance fnuction
Host.prototype.save = function (cb) {
  if(this.id) {
    db('host').where({
      id : this.id
      })
      .update({
        customerId : this.customerId,
        eventId : this.eventId
      })
      .then(function() {
        cb(null,this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      })
  } else {
    db('host')
      .insert({
        customerId : this.customerId,
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


module.exports = Host;
