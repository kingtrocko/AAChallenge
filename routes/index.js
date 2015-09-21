var express 	= require('express');
var router 		= express.Router();
var algorithms 	= require('../algorithms/hulk');


var words = ["drool","cats","clean","code","dogs","materials"];
//,"needed","this","is",
//"hard","what","are","you","smoking","shot","gun","down","river","super",
//"man", "rule", "acklen", "developers", "are", "amazing"];

router.get('/', function(req, res, next) {

	var result = algorithms.hulk(words)
  	res.send('respond with a resource: ' + result);
  	
});

module.exports = router;
