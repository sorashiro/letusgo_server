var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

var itemsList = [
  {
    'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'
  },
  {
    'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'
  },
  {
    'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'
  },
  {
    'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'
  },
  {
    'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'
  }
];
client.set('items', JSON.stringify(itemsList));

router.get('/', function(req, res) {
  client.get('items', function(err, obj) {
    res.send(JSON.parse(obj));
  });
});


module.exports = router;

