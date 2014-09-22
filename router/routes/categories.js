var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

function getCategories () {
  var categories = [
    {category: 'food', id: 1},
    {category: 'fruit', id: 2},
    {category: 'livingGoods', id: 3}
  ];
  return categories;
}

router.get('/', function(req, res) {
  //TODO: Need to implement.
  res.send('Success!');
});

module.exports = router;
