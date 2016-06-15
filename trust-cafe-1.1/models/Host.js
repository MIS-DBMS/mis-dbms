var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Host = function(options) {
  this.id = options.id;
  this.customerId = options.customerId;
  this.eventId = options.eventId;
  options.type = options.type;
};
var hostOrganization =function(options) {
  this.id = options.id;
  this.eventId = options.eventId;
  this.eventName = options.eventName;
  this.location = options.location;
  this.date = options.date;
  this.startTime = options.startTime;
  this.endTime = options.endTime;
  this.eventTag = options.eventTag;
  this.description = options.description;
  this.organizationId = options.organizationId;
  this.eventId = options.eventId;
  this.organizationName = options.organizationName;
  this.phone = options.phone;
  this.email = options.email;
  this.address = options.address;
  this.miscellaneous = options.miscellaneous;
}
Host.get = function(hostId, cb) {
  db.select()
    .from('host')
    .where({
      id : hostId
    })
    .map(function(row) {
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
        organizationId : row.organizationId,
        eventId : row.eventId,
        type : this.type
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
        organizationId : this.organizationId,
        eventId : this.eventId,
        type : this.type
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
        organizationId : this.organizationId,
        eventId : this.eventId,
        type : this.type
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
