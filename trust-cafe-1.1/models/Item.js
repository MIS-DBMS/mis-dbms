var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Item = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.date = options.date;
  this.description = options.description;
  this.value = options.value;
  this.customerId = options.customerId;
  this.organizationId = options.organizationId;
  this.eventId = options.eventId;
};

Item.getAll = function(cb) {
  db.select()
    .from('item')
    .map(function(row) {
      return new Item({
        id : row.id,
        name : row.name,
        date : row.date,
        description : row.description,
        value : row.value,
        customerId : row.customerId,
        organizationId : row.organizationId,
        eventId : row.eventId
      });
    })
    .then(function(itemList) {
      cb(null, itemList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

Item.get = function(itemId, cb) {
  db.select()
    .from('item')
    .where({
      id : itemId
    })
    .map(function(row) {
      return new Item(row);
      // {
      //   id : row.id,
      //   name : row.name,
      //   date : row.date,
      //   description : row.description,
      //   value : row.value,
      //   customerId : row.customerId,
      //   organizationId : row.organizationId,
      //   eventId : row.eventId
      // }
    })
    .then(function(itemList) {
      if(itemList.length) {
        cb(null, itemList[0]);
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
Item.prototype.save = function (cb) {
  if(this.id) {
    db('item')
      .update({
        name : this.name,
        date : this.date,
        description : this.description,
        value : this.value
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
    console.log("insert item");
    db('item')
      .insert({
        name : this.name,
        date : this.date,
        description : this.description,
        value : this.value,
        customerId : this.customerId,
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


module.exports = Item;
