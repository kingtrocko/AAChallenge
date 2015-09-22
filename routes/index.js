var express 			= require('express');
var router 				= express.Router();
var algorithmManager 	= require('../algorithms/algorithmManager');
var request				= require('request');
var uuid 				= require('node-uuid');

var endpoint = 'http://internal-devchallenge-2-dev.apphb.com';

var words = ["drool","cats","clean","code","dogs","materials"];
var words2 = ["elsewhere", "lifetime", "became", "grandmother", "hi"];
var words3 = ["sUcKyJ","aFtEr","eEpInG","gOoHeE","eEpInG","ClEaNcOdE","oOpTyN","InTeRnAl","WhAtArEyOuSmOkInG","FlUsH"];

router.get('/', function(req, res, next) {

  	res.send('respond with a resource: ');
  	
});

//request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
router.get('/challenge-step1', function(req, res){
	var guid = uuid.v1();
	console.log('GUID: ' + guid);

	request.get({ url: endpoint + '/values/' + guid}, function (err, response, body) {
	    if(!err && response.statusCode == 200){
	    	var jsonObj = JSON.parse(body);

	    	console.log('ORIGINAL RESPONSE ' +  JSON.stringify(jsonObj));

	    	var manager = new algorithmManager(jsonObj['words'], jsonObj['startingFibonacciNumber']);
			var result = manager.executeAlgorithm(jsonObj['algorithm']);

	    	res.send(result);	

	    }else{
	    	res.send(body);	
	    }
	    
	    res.end();
  	});
});

module.exports = router;
