
exports.isVowel = function(character)
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

exports.shiftVowels = function(word){
	var arr = word.split(''); 
	var newArr = word.split('');
	var pos = new Array();

	for(var i=0; i<arr.length; i++){
		if (this.isVowel(arr[i])){
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

// concatenate array delimited by acii value
exports.concatenateArray = function(array){
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

exports.fibo = function(n) {
  var f = [];
  for (var c = 0; c < n; ++c) {
    f.push((c < 2) ? c : f[c-1] + f[c-2]);
  }
  return f;
}