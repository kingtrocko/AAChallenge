var Buffer = require('buffer/').Buffer 

var array;

exports.hulk= function(words_array){
	array = words_array;
	var concatenatedStr = "";
	var encodedStr = ""

	for(var i=0; i<array.length; i++){
		array[i] = shiftVowels(array[i]);
	}

	array.sort();
	array.reverse();
	concatenatedStr = array.join('*');
	encodedStr = new Buffer(concatenatedStr).toString('base64');

	console.log("Concatened String========= " + concatenatedStr);

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