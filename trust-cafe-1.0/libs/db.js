//一樣在連接DB的時候改採用knex來進行連接
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port     :  8889,
    user     : 'root',
    password : 'root',
    database : 'trust-cafe'
  },
  pool: {
    min: 0,
    max: 7
  }
});

module.exports = knex;
