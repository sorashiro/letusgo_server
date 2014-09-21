var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

function getItems() {
  var items = [
    {
      'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50', id: '1'
    },
    {
      'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00', id: '2'
    },
    {
      'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00', id: '3'
    },
    {
      'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00', id: '4'
    },
    {
      'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00', id: '5'
    }
  ];
  return items;
}
client.set('items', JSON.stringify(getItems()));


router.get('/', function(req, res) {
  client.get('items', function(err, obj) {
    res.send(obj);
  });
});



module.exports = router;

