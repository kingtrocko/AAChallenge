var express 			= require('express');
var router 				= express.Router();
var algorithmManager 	= require('../algorithms/algorithmManager');
var request				= require('request');
var uuid 				= require('node-uuid');
var async				= require('async');
var mongoose 			= require('mongoose');


var endpoint = 'http://internal-devchallenge-2-dev.apphb.com';

router.get('/', function(req, res, next) {
	var User = mongoose.model('Secrets');
	User.find({}, function(error, users){
		if(error){
			res.send('DB cant be read due to an error: ' +error);
		}else{
			res.render('index.ejs', {data: users})
		}
	})
});

var words = ["gLeDsY","nYgNaS","eErDoX","DrOwN","oAnSoL","bIrD","WhAtArEyOuSmOkInG","gLeDsY","sUcKyJ","InTeRnAl"];

router.get('/test', function(req, res){
	var manager = new algorithmManager(words, 5);
	var result = manager.executeAlgorithm('Thor');

	res.send(result);
	res.end();
});

router.get('/get', function(req, res){
	var guid = uuid.v1();
	console.log('GUID: ' + guid);

	request.get({ url: endpoint + '/values/' + guid}, function (err, response, body) {
	    if(!err && response.statusCode == 200){
	    	var jsonObj = JSON.parse(body);

	    	console.log('ORIGINAL RESPONSE ' +  JSON.stringify(jsonObj));

	    	var manager = new algorithmManager	(jsonObj['words'], jsonObj['startingFibonacciNumber']);
			var result = manager.executeAlgorithm(jsonObj['algorithm']);

	    	res.send(result);	

	    }else{
	    	res.send(body);	
	    }
	    
	    res.end();
  	});
});

router.get('/info', function(req, res, next) {
  	var html = '';
	html += '<h2>This is A/A Developer Challenge</h2> <br /><br />';
  	html += 'Available routes:<br />';
	html += '<ul>';
	html += '<li>GET /info</li>';
	html += '<li>POST /my-webhook</li>';
	html += '<li>GET /challenge-step1</li>';
	html += '</ul>';

  	res.send(html);
});

router.post('/my-webhook', function(req, res){
	console.log(req.body);
	var User = mongoose.model('Secrets');
	var user = new User();

	user.secret_phrase = req.body.secret;
	
	user.save(function(err){
		if(err){
			res.send('ERROR WHILE SAVING secretPhrase to DB');
		}else{
			res.send('secretPhrase saved to DB');
		}
	})
	
	
	res.end();
});

var final_response = {};

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
					    	//if(jsonObj['algorithm'] == 'Thor' || jsonObj['algorithm'] == 'CaptainAmerica')
					    	//{
					    		//callback(null, 'ignore', jsonObj['algorithm']);

					    	//}else{
					    		var manager = new algorithmManager(jsonObj['words'], jsonObj['startingFibonacciNumber']);
								var result = manager.executeAlgorithm(jsonObj['algorithm']);

						    	callback(null, result, jsonObj['algorithm']);
					    	//}
					    }else{
					    	callback('An error ocurred while making the GET requests. StatusCode = ' + response.statusCode);

					    }
					});
	    		},
	    		function(secretPhrase, algorithmType, callback) {
	    			//if(secretPhrase == 'ignore'){
	    				//callback(null, '=========== IGNORING POST FOR = ' + algorithmType.toUpperCase());
	    			//}else{
	    				console.log('=======================');
		    			console.log('MAKING THE ' + algorithmType + ' with GUID: ' +guid);
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
		    				final_response = json;
		    				if(!err && response.statusCode == 200){

		    					callback(null, 'Successfull POST. RESPONSE is = ' + JSON.stringify(json));
		    				}else{
		    					callback(null,'Error while making the POST.' + json.message);
		    				}
		    			});
	    			//}
	    			
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
	      
	      if(!final_response){
	      	res.send('Everything worked fine');
	      }else{
	      	res.send(JSON.stringify(final_response, null, "\t"));
	      }
	    }
	    res.end();
	});
});

module.exports = router;
