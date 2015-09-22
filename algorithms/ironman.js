var Buffer 	= require('buffer/').Buffer;
var utils 	= require('./utils');



exports.execute = function(words_array){
	var array = words_array;
	
	array.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	var concatenatedStr = "";
	var encodedStr = ""

	for(var i=0; i<array.length; i++){
		array[i] = utils.shiftVowels(array[i]);
	}

	//console.log("shifted Array======= " + array.join(','));

	concatenatedStr = utils.concatenateArray(array);
	encodedStr = new Buffer(concatenatedStr).toString('base64');

	//console.log("Concatened String========= " + concatenatedStr);
	//console.log("encoded value " + encodedStr);
	//console.log("encoding is valid " + Buffer.isEncoding(encodedStr));
	
	//var decoded = new Buffer(encodedStr, 'base64').toString('ascii')
	//console.log("DECODED IS ======" + decoded);

	return encodedStr;
}
