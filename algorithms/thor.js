var Buffer 			= require('buffer/').Buffer;
var utils 			= require('./utils');
var WordSeparator	= require('./wordseparator.js');

var value = '';

var a = 0,
	b = 1;
var nextVal;

exports.execute = function(words_array, startingFibNumber){

	var concatenatedStr = "";
	var encodedData = "";
	value = '';

	var wordSeparator = new WordSeparator();

	var array = wordSeparator.SeparateWord(words_array);
	
	//step #2
	array.sort(utils.alphabetically);

	var str, s, isFirtsWord;
	a = 0;
	b = 1;
	do {
        nextVal = getNextFibonacciNumber();
    } while (nextVal !== startingFibNumber);

	for (var i = 0; i < array.length; i++) {
		
		isFirtsWord = i == 0 ? true : false;

		str = alternateConsonantsSize(array[i], isFirtsWord);
		array[i] = str;

		//step #4
		s = replaceVowelsWithFibNumber(array[i]);
		array[i] = s;
	};

	concatenatedStr = array.join('*');
	encodedData = new Buffer(concatenatedStr).toString('base64');
	return encodedData;

	//return array.join();
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

var getNextFibonacciNumber = function(){
	b += a;
	a = b-a;
	return a;
}

var alternateConsonantsSize = function(word, isFirtsWord){
	var arr = word.split(''); // [D,o,G,s]
	var letter;

	//bIrD, aShUpH

	for (var i = 0; i < arr.length; i++) {
		letter = arr[i];

		if(isFirtsWord && i==0){
			if(letter == letter.toLowerCase()){
				value = 'lower';
			}
			if (letter == letter.toUpperCase()){
				value = 'upper';
			}
		}

		if(!utils.isVowel(letter)){
			if(value == 'lower'){
				arr[i] = letter.toLowerCase();
				value = 'upper';
			}else{
				arr[i] = letter.toUpperCase();
				value = 'lower';
			}
		}
	}
	return arr.join('');
}