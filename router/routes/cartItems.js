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
  console.log(cartItems);
  client.set('cartItems', function(err, obj) {
    res.send(obj);
  })
});

module.exports = router;
