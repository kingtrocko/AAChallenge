var Buffer = require('buffer/').Buffer
var utils 	= require('./utils');

var array;

exports.execute= function(words_array){
	array = words_array;
	var concatenatedStr = "";
	var encodedStr = ""

	for(var i=0; i<array.length; i++){
		array[i] = utils.shiftVowels(array[i]);
	}

	array.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	array.reverse();
	
	concatenatedStr = array.join('*');
	encodedStr = new Buffer(concatenatedStr).toString('base64');

	//console.log("Concatened String========= " + concatenatedStr);

	return encodedStr;
}

