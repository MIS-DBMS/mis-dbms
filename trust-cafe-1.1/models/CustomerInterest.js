var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var CustomerInterest = function(options) {
  this.id = options.id;
  this.interest = options.interest;
  this.customer_id = options.customer_id;
};

//Class Function
CustomerInterest.get = function(customerinterestId, cb) {
  db.select()
  .from('customerInterest')
  .where({
    id : customerinterestId
  })
  .map(function(row) {
    return new CustomerInterest(row);
  })
  .then(function(customerinterestList) {
    if(customerinterestList.length) {
      cb(null, customerinterestList[0]);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    cb(err);
  })
}

CustomerInterest.getInterest = function(customerId, cb) {
  db.select()
  .from('customerInterest')
  .where({
    customer_id : customerId
  })
  .map(function(row) {
    return new CustomerInterest(row);
  })
  .then(function(customerinterestList) {
    if(customerinterestList.length) {
      cb(null, customerinterestList);
    } else {
      cb(new GeneralErrors.NotFound());
    }
  })
  .catch(function(err) {
    cb(err);
  })
}

CustomerInterest.delInterest = function(customerinterestId, cb) {
  db.select()
  .from('customerInterest')
  .where({
    id : customerinterestId
  })
  .del()
  .then(function(count) {
    console.log(count);
  })
  .catch(function(err) {
    cb(err);
  })
}
//Instance Function
CustomerInterest.prototype.save = function (cb) {
  if (this.id) {
    db("customerInterest")
    .where({
      id : this.id
    })
    .update({
      interest : this.interest,
      customer_id : this.customer_id
    })
    .then(function() {
      cb(null, this);
    }.bind(this))
    .catch(function(err) {
      console.log("CustomerInterest UPDATED", err);
      cb(new GeneralErrors.Database());
    });
  } else {
    db("customerInterest")
    .insert({
      interest : this.interest,
      customer_id : this.customer_id
    })
    .then(function(result) {
      var insertedId = result[0];
      this.id = insertedId;
      cb(null, this);
    }.bind(this))
    .catch(function(err) {
      console.log("CustomerInterest INSERT", err);
      cb(new GeneralErrors.Database());
    });
  }
};

CustomerInterest.getAll = function(cb) {
  db.select()
  .from('customerInterest')
  .map(function(row) {
    return new CustomerInterest(row);
  })
  .then(function(customerinterestList) {
    cb(null, customerinterestList);
  })
  .catch(function(err) {
    cb(new GeneralErrors.Database());
  });
}


module.exports = CustomerInterest;
