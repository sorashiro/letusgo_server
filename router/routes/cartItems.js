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

module.exports = router;
