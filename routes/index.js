var express 			= require('express');
var router 				= express.Router();
var algorithmManager 	= require('../algorithms/algorithmManager');
var request				= require('request');
var uuid 				= require('node-uuid');
var async				= require('async');

var endpoint = 'http://internal-devchallenge-2-dev.apphb.com';
var my_json = {
		secret: 'send a POST to /my-webhook with the-secret',
		name: "Nahum Fabian Huezo",
		email: "nahum_fabian13@hotmail.com",
		role: "Software Developer",
		linkedin: "https://www.linkedin.com/in/nahumfabian",
		git: "https://github.com/kingtrocko" 
	};

router.get('/', function(req, res, next) {
	var html = '';
	html += '<h2>This is A/A Developer Challenge</h2> <br /><br />';
  	html += 'Available routes:<br />';
	html += '<ul>';
	html += '<li>GET /secret</li>';
	html += '<li>POST /my-webhook</li>';
	html += '<li>GET /challenge-step1</li>';
	html += '</ul>';

  	res.send(html);
});

router.get('/secret', function(req, res, next) {
  	res.send(JSON.stringify(my_json, null, 4));
});

router.post('/my-webhook', function(req, res){
	console.log(req.body);

	my_json['secret'] = req.body.secret;
	
	res.writeHead(302, {
  		'Location': '/secret'
	});
	res.end();
});

router.get('/challenge-step1', function(req, res){
	var guids = [];
	for(var i=1; i<=20; i++){
		guids.push(uuid.v1());
	}

	
	async.eachSeries(guids, function(guid, mainCallback) {
		async.waterfall(
			[
				function(callback) {
					request.get({
						url: endpoint + '/values/' + guid
					},
					function (err, response, body) {
						if(!err && response.statusCode == 200){
					    	var jsonObj = JSON.parse(body);

					    	console.log('ORIGINAL RESPONSE ' +  JSON.stringify(jsonObj));

					    	var manager = new algorithmManager(jsonObj['words'], jsonObj['startingFibonacciNumber']);
							var result = manager.executeAlgorithm(jsonObj['algorithm']);

					    	callback(null, result, jsonObj['algorithm']);

					    }else{
					    	callback('An error ocurred while making the GET requests. StatusCode = ' + response.statusCode);

					    }
					});
	    		},
	    		function(secretPhrase, algorithmType, callback) {
	    			console.log('=======================');
	    			console.log('MAKING THE ' + algorithmType);
	    			console.log('=======================');

	    			var formData = { 
	    				encodedValue: secretPhrase,
	    				emailAddress: "nahum_fabian13@hotmail.com",
	    				name: "Nahum Fabian Huezo",
	    				webhookUrl: "https://aachallenge.herokuapp.com/my-webhook",
	    				repoUrl: "https://github.com/kingtrocko/AAChallenge"
	    			};

	    			request.post({
	    			 	url: endpoint + '/values/' + guid + '/' + algorithmType, 
	    			 	form: formData,
	    			 	headers: {
	    			 		'Content-Type': 'application/json',
	    			 		'Accept': 'application/json'
	    			 	}
	    			},
	    			function(err,response,body){
	    				var json = JSON.parse(body);
	    				if(!err && response.statusCode == 200){

	    					callback(null, 'Successfull POST. RESPONSE is = ' + JSON.stringify(json));
	    				}else{
	    					callback('Error while making the POST.' + json.message);
	    				}
	    			});
			    }
			], 
			function (err, result) {
		    		if(err){
		    			mainCallback(err);
		    		}else{
		    			console.log('The result is =========' + result);
		    			mainCallback(null);
		    		}
			});
	}, function(err){
	    if( err ) {
	      // One of the iterations produced an error.
	      // All processing will now stop.
	      console.log('ERROR ========== ' + err);
	      res.send(err);

	    } else {
	      console.log('Everything worked fine');
	      res.send('Everything worked fine');
	    }
	    res.end();
	});
});

module.exports = router;
