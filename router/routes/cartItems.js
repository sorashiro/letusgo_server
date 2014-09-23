var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

router.get('/', function(req, res) {
  client.get('cartItems', function(err, obj) {
    res.send(obj);
  });
});

router.post('/', function(req, res) {
  var cartItems = req.body.cartItems || [];
  client.set('cartItems', JSON.stringify(cartItems), function(err, obj) {
    res.send(obj);
  })
});

router.delete('/', function(req, res) {
  client.del('cartItems');
});

module.exports = router;
