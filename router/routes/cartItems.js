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

router.put('/:id', function(req, res) {
  client.get('cartItems', function(err, obj) {
    var cartItems = JSON.parse(obj);
    var id = req.params.id;
    var items = [];

    _.forEach(cartItems, function(cartItem, index) {
      items.push(cartItem.item);
    });
    var index = _.findIndex(items, {'id': parseInt(id)});
    cartItems[index].num--;

    if(cartItems[index].num === 0) {
      _.remove(cartItems, {num: 0});
    }
    client.set('cartItems', JSON.stringify(cartItems), function(err, obj) {
      res.send(obj);
    });
  });
});

module.exports = router;
