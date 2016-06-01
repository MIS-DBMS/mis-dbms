var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Hold = function(options) {
  this.id = options.id;
  this.type = options.type;
  this.organizationId = options.organizationId;
  this.eventId = options.eventId;
};

Hold.getAll = function(cb) {
  db.select()
    .from('hold')
    .map(function(row) {
      return new Hold({
        id : row.id,
        type : row.type,
        organizationId : row.organizationId,
        eventId : row.eventId
        });
    })
    .then(function(holdList) {
      cb(null, holdList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Hold.get = function(holdId, cb) {
  db.select()
    .from('hold')
    .where({
      id : holdId
    })
    .map(function(row) {
      return new Hold({
        id : row.id,
        type : row.type,
        organizationId : row.organizationId,
        eventId : row.eventId
      });
    })
    .then(function(holdList) {
      if(holdList.length) {
        cb(null, holdList[0]);
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
Hold.prototype.save = function (cb) {
  if(this.id) {
    db('hold')
      .update({
        type : this.type,
        organizationId : this.organizationId,
        eventId : this.eventId
      })
      .where({
        id : this.id
      })
      .then(function() {
        cb(null,this);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        cb(null, new GeneralErrors.Database());
      })
  } else {
    db('hold')
      .insert({
        type : this.type,
        organizationId : this.organizationId,
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


module.exports = Hold;
