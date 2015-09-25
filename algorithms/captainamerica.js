var utils 	= require('./utils');

var a = 0,
	b = 1;
var nextVal;

exports.execute = function(words_array, startingFibNumber){
	var array = words_array;
	var concatenatedStr = "";
	var encodedStr = ""

	//Step 1
	for(var i=0; i<array.length; i++){
		array[i] = utils.shiftVowels(array[i]);
	}

	//Step 2
	array.sort(utils.sortInReverse);

	a = 0;
	b = 1;
	do {
        nextVal = getNextFibonacciNumber();
    } while (nextVal !== startingFibNumber);

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

var getNextFibonacciNumber = function(){
	b += a;
	a = b-a;
	return a;
}

var replaceVowelsWithFibNumber = function(word){
	var wordArr = word.split('');
	var letter;

	for (var i = 0; i < wordArr.length; i++) {
		letter = wordArr[i];
		
		if(utils.isVowel(letter)){
			wordArr[i] = nextVal;
			nextVal = getNextFibonacciNumber();
		}
	}
	return wordArr.join('');	
}
