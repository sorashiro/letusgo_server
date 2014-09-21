var express = require('express');
var router = express.Router();
var redis = require('redis');
var client =  redis.createClient();

router.get('/', function(req, res) {
  //TODO: Need to implement.
  res.send('Success!');
});

module.exports = router;
