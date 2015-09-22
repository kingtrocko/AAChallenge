var utils 	= require('./utils');

var fiboNumbers = utils.fibo(500);
var fibIndex;

exports.execute = function(words_array, startingFibNumber){
	var array = words_array;
	var concatenatedStr = "";
	var encodedStr = ""

	//Step 1
	for(var i=0; i<array.length; i++){
		array[i] = utils.shiftVowels(array[i]);
	}

	//Step 2
	array.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});
	array.reverse();

	fibIndex = fiboNumbers.indexOf(startingFibNumber);

	//Step 3
	for (var i = 0; i < array.length; i++) {
		var s = replaceVowelsWithFibNumber(array[i]);
		array[i] = s;
	};

	//Step 4
	concatenatedStr = utils.concatenateArray(array);

	//Step 5
	encodedStr = new Buffer(concatenatedStr).toString('base64');

	return encodedStr;
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