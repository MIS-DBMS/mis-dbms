var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Item = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.date = options.date;
  this.description = options.description;
  this.value = options.value;
  this.sponserTag = options.sponserTag;
  this.customerId = options.customerId;
  this.organizationId = options.organizationId;
  this.eventId = options.eventId;
};

Item.getAll = function(cb) {
  db.select()
  .from('item')
  .map(function(row) {
    return new Item(row);
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
      value : this.value,
      sponserTag : this.sponserTag,
      customerId : this.customerId,
      organizationId : this.organizationId,
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
    console.log("insert item");
    db('item')
    .insert({
      name : this.name,
      date : this.date,
      description : this.description,
      value : this.value,
      sponserTag : this.sponserTag,
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

//trytry getCustomerID
Item.getCustomerID = function(customername,cb) {
  db.select('customer.id')
  .from('customer')
  .where({
    customerName : customername
  })
  .map(function(row){
    console.log(row);
    return new Item({
      customerId : row.id
    });
  })
  .then(function(itemList) {
    if(itemList.length) {
      cb(null, itemList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(err);

  });
}

//trytry getEventID
Item.getEventID = function(eventname,cb) {
  db.select('event.id')
  .from('event')
  .where({
    eventName : eventname
  })
  .map(function(row){
    console.log(row);
    return new Item({
      eventId : row.id
    });
  })
  .then(function(itemList) {
    if(itemList.length) {
      cb(null, itemList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(err);

  });
}

//trytry getEventID
Item.getOrganizationID = function(organizationname,cb) {
  db.select('organization.id')
  .from('organization')
  .where({
    organizationName : organizationname
  })
  .map(function(row){
    console.log(row);
    return new Item({
      organizationId : row.id
    });
  })
  .then(function(itemList) {
    if(itemList.length) {
      cb(null, itemList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    console.log(err);
    cb(err);

  });
}



module.exports = Item;
