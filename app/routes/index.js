
const routesStore = require('./routesStore');
const storeNum = require('./storeNum');
const contentRegist = require('./contentRegist');

module.exports = function(app, db){

  routesStore(app, db);
  storeNum(app, db);
  contentRegist(app, db);
}
