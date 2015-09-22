var Buffer = require('buffer/').Buffer;
var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);
var utils 	= require('./utils');

var fiboNumbers = utils.fibo(500);
var fibIndex;

exports.execute = function(words_array, startingFibNumber){

	var concatenatedStr = "";
	var encodedData = "";

	var array = hyphenateCompoundWords(words_array);
	
	//step #2
	array.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	fibIndex = fiboNumbers.indexOf(startingFibNumber);

	for (var i = 0; i < array.length; i++) {
		var str = alternateConsonantsSize(array[i]);
		array[i] = str;

		//step #4
		var s = replaceVowelsWithFibNumber(array[i]);
		array[i] = s;
	};

	concatenatedStr = array.join('*');
	encodedData = new Buffer(concatenatedStr).toString('base64');
	return encodedData;
}

var replaceVowelsWithFibNumber = function(word){
	var wordArr = word.split('');
	var letter;

	for (var i = 0; i < wordArr.length; i++) {
		letter = wordArr[i];
		
		if(utils.isVowel(letter)){
			if (fibIndex < fiboNumbers.length) {
				wordArr[i] = fiboNumbers[fibIndex].toString();
				fibIndex++;
			}else{
				wordArr[i] = "aaaaBaaaa";
			}
		}
	}
	return wordArr.join('');	
}	

//Not working so well because it also splits words that aren't compounds. i.e: com-pu-ter
var hyphenateCompoundWords = function(array)
{
	var newArr = []
	var wordArr = [];

	for (var i = 0; i < array.length; i++) {
		wordArr = h.hyphenate(array[i]);

		if(wordArr.length > 1){
			for(var x=0; x<wordArr.length; x++){
				newArr.push(wordArr[x]);
			}
		}
		else{
			newArr.push(array[i]);
		}
	};
	return newArr;
}


var alternateConsonantsSize = function(word){
	var arr = word.split(''); // [D,o,G,s]
	var letter;
	var value = '';

	for (var i = 0; i < arr.length; i++) {
		letter = arr[i];

		if(!utils.isVowel(letter)){
			if(i == 0){
				arr[i] = letter.toUpperCase();
				value = "upper";
			}else{
				if(value == "upper"){
					arr[i] = letter.toLowerCase();
					value = "lower";
				}else{
					arr[i] = letter.toUpperCase();
					value = "upper";
				}
			}
		}
	}
	return arr.join('');
}