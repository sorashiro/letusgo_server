var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
var _ = require('lodash');

router.get('/', function(req, res) {
  client.get('cartItems', function(err, obj) {
    res.send(obj);
  });
});

router.post('/', function(req, res) {
  var cartItems = req.body.cartItems || [];
  client.set('cartItems', JSON.stringify(cartItems), function(err, obj) {
    res.send(obj);
  });
});

router.post('/payment', function(req, res) {
  var cartItems = req.param('cartItems');
  var result = cartItems.length;
  if(result){
    client.del('cartItems');
    res.json(result);
  }
  else {
    res.sendStatus(404);
  }
});

//router.post('/reduce', function(req, res) {
//  client.get('cartItems', function(err, obj) {
//    var cartItems = JSON.parse(obj);
//    var id = req.param('id');
//    var items = [];
//
//    _.forEach(cartItems, function(cartItem) {
//      items.push(cartItem.item);
//    });
//    var index = _.findIndex(items, {'id': parseInt(id)});
//    cartItems[index].num--;
//
//    if(cartItems[index].num === 0) {
//      _.remove(cartItems, {num: 0});
//    }
//    client.set('cartItems', JSON.stringify(cartItems), function(err, obj) {
//      res.send(obj);
//    });
//  });
//});

  router.post('/reduce', function(req, res) {
    getCartItem(req.param('id'), function(data) {
      var index = data[1];
      var cartItems = data[0];
      cartItems[index].num--;
      if(cartItems[index].num === 0) {
        _.remove(cartItems, {num: 0});
      }
      client.set('cartItems', JSON.stringify(cartItems), function (err, obj) {
        res.send(obj);
      });
    });
  });
//router.post('/plus', function(req, res) {
//  client.get('cartItems', function (err, obj) {
//    var cartItems = JSON.parse(obj);
//    var id = req.param('id');
//    var items = _.pluck(cartItems, 'item');
//    var index = _.findIndex(items, {'id': parseInt(id)});
//    cartItems[index].num++;
//
//    client.set('cartItems', JSON.stringify(cartItems), function (err, obj) {
//      res.send(obj);
//    });
//  });
//});

router.post('/plus', function(req,res) {
  getCartItem(req.param('id'), function(data) {
    var index = data[1];
    var cartItems = data[0];
    cartItems[index].num++;
    client.set('cartItems', JSON.stringify(cartItems), function (err, obj) {
      res.send(obj);
    });
  });
});

function getCartItem(requireId, callback){
  client.get('cartItems', function(err, obj) {
    var cartItems = JSON.parse(obj);
    var id = requireId;
    var items = _.pluck(cartItems, 'item');
    var index = _.findIndex(items, {'id': parseInt(id)});
    var data = [cartItems, index];
    callback(data);
  });
}

module.exports = router;
