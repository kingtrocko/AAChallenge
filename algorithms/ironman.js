var Buffer = require('buffer/').Buffer 

var array;

exports.ironMan = function(words_array){
	array = words_array.sort();
	var concatenatedStr = "";
	var encodedStr = ""

	for(var i=0; i<array.length; i++){
		array[i] = shiftVowels(array[i]);
	}

	console.log("shifted Array======= " + array.join(','));

	concatenatedStr = concatenateArray();
	encodedStr = new Buffer(concatenatedStr).toString('base64');

	//console.log("Concatened String========= " + concatenatedStr);
	//console.log("encoded value " + encodedStr);
	//console.log("encoding is valid " + Buffer.isEncoding(encodedStr));
	
	//var decoded = new Buffer(encodedStr, 'base64').toString('ascii')
	//console.log("DECODED IS ======" + decoded);

	return encodedStr;
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

var shiftVowels = function(word){
	var arr = word.split(''); 
	var newArr = word.split('');
	var pos = new Array();

	for(var i=0; i<arr.length; i++){
		if (isVowel(arr[i])){
			var temp = arr[i];
			if(i == (arr.length - 1)){
				var last = newArr.pop();
				newArr.unshift(last);
			}else{
				if(pos.indexOf(i) == -1){
					newArr[i] = arr[i+1];
					newArr[i+1] = temp;
					pos.push(i);
					pos.push(i+1);
				}
			}
		}
	}
	return newArr.join('');
}
// ["dog","cat","bird"] => dog98cat100bird99
var concatenateArray = function(){
	var str = '';
	var size = array.length;

	for(var i=0; i < size; i++){
		if(i==0){
			var lastWord = array[size-1];
			var asciiVal = lastWord.charCodeAt(0).toString();
			str += array[i].concat(asciiVal);
		}else{
			var previousWord = array[i-1];
			var asciiVal = previousWord.charCodeAt(0).toString();
			str += array[i].concat(asciiVal);
		}
	}
	return str;
}