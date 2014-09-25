var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
var _ = require('lodash');

function getItems() {
  var items = [
    {
      category: 'fruit', name: 'apple', unit: '斤', price: '5.50', id: 1
    },
    {
      category: 'fruit', name: 'leechee', unit: '斤', price: '15.00', id: 2
    },
    {
      category: 'food', name: 'sprite', unit: '瓶', price: '3.00', id: 3
    },
    {
      category: 'food', name: 'coca-cola', unit: '瓶', price: '3.00', id: 4
    },
    {
      category: 'livingGoods', name: 'battery', unit: '个', price: '2.00', id: 5
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

router.get('/:id', function(req, res) {
  client.get('items', function(err, obj) {
    var id = req.param('id');
    var item = _.where(JSON.parse(obj), {id: parseInt(id)});
    res.send(item);
  });
});

router.post('/', function(req, res) {
  var items = getItems();
  var newItems = req.body.items || items;

  client.set('items', JSON.stringify(newItems), function(err, obj) {
    res.send(obj);
  });
});

router.delete('/:id', function(req, res) {

  client.get('items', function(err, obj) {
    var id = JSON.parse(req.param('id'));
    var items = JSON.parse(obj);
    var removeItem = _.remove(items, {'id': id});

    client.set('items', JSON.stringify(items), function(err, obj) {
      res.send(obj);
    });
  });
});

router.put('/:id', function(req, res) {

  client.get('items', function(err, obj) {
    var item = JSON.parse(req.param('item'));
    var items = JSON.parse(obj);
    var id = item.id;
    var index = _.findIndex(items, {id: id});
    items[index] = item;

    client.set('items', JSON.stringify(items), function(err, obj) {
      res.send(obj);
    });
  });
});

module.exports = router;

