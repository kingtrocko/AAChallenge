
exports.isVowel = function(character)
{
	if (character == undefined)
		return false;

	var vowels = new Array('a', 'e', 'i', 'o', 'u', 'y');
	var isVowel = false;

	if(vowels.indexOf(character.toLowerCase()) !== -1){
		isVowel = true;
	}
	return isVowel;
}

exports.alphabetically = function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a < b)
    	return -1;
    else if (a > b)
       	return  1;
    else
    	return 0;
};

exports.sortInReverse = function(a,b){
	a = a.toLowerCase();
    b = b.toLowerCase();

    if (a < b) 
    	return 1;
    else if (a > b) 
    	return  -1;
    else
    	return 0;
    
}

exports.shiftVowels = function(word){
	var arr = word.split(''); 
	var newArr = word.split('');
	var pos = new Array();

	//[g,O,o,H,e,E] ==> goOHEe
	//mine: egoOHE
	for(var i=0; i<arr.length; i++){
		if (this.isVowel(arr[i])){
			var temp = arr[i];
			if(i == (arr.length - 1)){
				if(pos.indexOf(i) == -1){
					var last = newArr.pop();
					newArr.unshift(last);
					pos.push(i);
				}
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