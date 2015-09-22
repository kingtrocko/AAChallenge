var express 	= require('express');
var router 		= express.Router();
var algorithms 	= require('../algorithms/thor');


var words = ["drool","cats","clean","code","dogs","materials"];
var words2 = ["elsewhere", "lifetime", "became", "grandmother", "hi"];
var words3 = ["sUcKyJ","aFtEr","eEpInG","gOoHeE","eEpInG","ClEaNcOdE","oOpTyN","InTeRnAl","WhAtArEyOuSmOkInG","FlUsH"];
//,"needed","this","is",
//"hard","what","are","you","smoking","shot","gun","down","river","super",
//"man", "rule", "acklen", "developers", "are", "amazing"];

router.get('/', function(req, res, next) {

	var result = algorithms.thor(words3);
  	res.send('respond with a resource: ' + result);
  	
});

module.exports = router;
