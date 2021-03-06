var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();
var _ = require('lodash');

function getCategories () {
  var categories = [
    {category: 'food', id: 1},
    {category: 'fruit', id: 2},
    {category: 'livingGoods', id: 3}
  ];
  return categories;
}

client.set('categories', JSON.stringify(getCategories()));

router.get('/', function(req, res) {
  client.get('categories', function(err, obj) {
    res.send(obj);
  });
});

router.post('/', function(req, res) {
  client.get('categories', function(err, obj) {
    var categories = JSON.parse(obj);
    var newCategories = req.param('category');
    categories.push(newCategories);

    client.set('categories', JSON.stringify(categories), function(err, obj) {
      res.send(obj);
    });
  });
});

router.delete('/:id', function(req, res) {
  client.get('categories', function(err, obj) {
    var id = JSON.parse(req.param('id'));
    var categories = JSON.parse(obj);
    var b = _.remove(categories, {'id': id});
    client.set('categories', JSON.stringify(categories), function(err, obj) {
      res.send(obj);
    });
  });
});

router.put('/:id', function(req, res) {

  client.get('categories', function(err, obj) {
    var category = req.param('category');
    var id = category.id;
    var categories = JSON.parse(obj);
    var index = _.findIndex(categories, {id: id});
    categories[index] = category;

    client.set('categories', JSON.stringify(categories), function(err, obj) {
      res.send(obj);
    });
  });
});

module.exports = router;
