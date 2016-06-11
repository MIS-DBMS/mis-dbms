var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Organization = function(options) {
  this.id = options.id;
  this.organizationName = options.organizationName;
  this.phone = options.phone;
  this.email = options.email;
  this.address = options.address;
  this.miscellaneous = options.miscellaneous;
};

//Class Function
Organization.get = function(organizationId, cb) {
  db.select()
  .from('organization')
  .where({
      id : organizationId
    })
    .map(function(row) {
      return new Organization(row);
    })
    .then(function(organizationList) {
      if(organization.length) {
        cb(null, organizationList[0]);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

//Instance Function
Organization.prototype.save = function (cb) {
  if (this.id) {
    db("organization").where({
        id : this.id
      })
      .update({
        name : this.name,
        // account : this.account,
        // password : this.password,
        phone : this.phone,
        email : this.email,
        address : this.address,
        miscellaneous : this.miscellaneous
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORGANIZATION UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {
    db("organization")
      .insert({
        name : this.name,
        // account : this.account,
        // password : this.password,
        phone : this.phone,
        email : this.email,
        address : this.address,
        miscellaneous : this.miscellaneous
      })
      .then(function(result) {
        var insertedId = result[0];
        this.id = insertedId;
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("ORGANIZATION INSERT", err);
        cb(new GeneralErrors.Database());
      });
  }
};


module.exports = Organization;
