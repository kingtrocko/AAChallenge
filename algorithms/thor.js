var Buffer = require('buffer/').Buffer;
var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);

var fiboNumbers = fibo(100);

exports.thor = function(words_array, startingFibNumber){

	var array = words_array; //hyphenateCompoundWords(words_array);
	//array.sort();

	for (var i = 0; i < array.length; i++) {
		var str = alternateConsonantsSize(array[i]);
		array[i] = str;
	};
	
	return array.join(',');
}

var replaceVowelsWithFibNumber = function(word, fibNumber){
	var wordArr = word.split('');
	var letter;
	var startingIndex = fiboNumbers.indexOf(fibNumber);
	var lastIndexUsed;

	for (var i = 0; i < wordArr.length; i++) {
		letter = wordArr[i];
		
		if(isVowel(letter)){
			wordArr[i] = fiboNumbers[startingIndex + i];
			lastIndexUsed = startingIndex + i;
		}
	}
	return wordArr.join('');	
}	

var fibo = function(n) {
  var f = [];
  for (var c = 0; c < n; ++c) {
    f.push((c < 2) ? c : f[c-1] + f[c-2]);
  }
  return f;
}

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

var isVowel = function(character)
{
	if (character == undefined)
		return false;

	var vowels = new Array('a', 'e', 'i', 'o', 'u', 'y');
	var isVowel = false;
	for(v in vowels)
	{
		if(vowels[v] == character.toLowerCase())
		{
			isVowel = true;
			break;
		}
	}
	return isVowel;
}

var alternateConsonantsSize = function(word){
	var arr = word.split(''); // [D,o,G,s]
	var letter;
	var value = '';

	for (var i = 0; i < arr.length; i++) {
		letter = arr[i];

		if(!isVowel(letter)){
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