
function WordSeparator(){
    this.processedWords = [];
    this.allWords = [];
}

WordSeparator.prototype.SeparateWord = function (words) {
    var replaceableWord, word, separatedWords = [], o, regex;
    for (var i = 0, len = words.length; i < len; i++) {
        word = words[i];
        if (!this.canBeSeparated(word)) {
            separatedWords.push(word);
        } else {
            for (o = 0, len2 = this.replaceableWords.length; o < len2; o++) {
                replaceableWord = this.replaceableWords[o];
                regex = new RegExp(replaceableWord, 'ig');
                
                if (regex.test(word)) {
                    if(!this.replaceableWordWasProcessed(replaceableWord, word)){
                        var  index = word.toLowerCase().indexOf(replaceableWord);
                    	var extractedWord = word.slice(index, index + replaceableWord.length);
                    	separatedWords.push(extractedWord);
                    }
                }
            }
        }
    }
    return separatedWords;
}

WordSeparator.prototype.addWordToSet = function(word){
    var obj = {
        theWord: word,
        count: 0
    };
}

WordSeparator.prototype.replaceableWordWasProcessed = function(replaceableWord, word){
    var obj = {
        theWord: word,
        theReplaceableWords: [replaceableWord]
    };
    
    if(this.processedWords.length == 0){
        this.processedWords.push(obj);
        return false;
    }else{
        var item;
        for(var i=0; i<this.processedWords.length; i++){
            item = this.processedWords[i];
            if(item.theWord == word){
                if(item.theReplaceableWords.indexOf(replaceableWord) == -1){
                    item.theReplaceableWords.push(replaceableWord);
                    this.processedWords[i] = item;
                    
                    return false;
                }else{
                    return true;
                }
            }else{
                this.processedWords.push(obj);
        		return false;
            }
        }
    }
}

WordSeparator.prototype.replaceableWords = ["drool","cats","clean","code","dogs","materials", "needed", "this", "is",
"hard","what","are","you","smoking","shot","gun","down","river","super","man","rule","acklen",
"developers","are","amazing"];

WordSeparator.prototype.canBeSeparated = function (word) {
    var replaceableWord, regex, i;
    for (i = 0, len = this.replaceableWords.length; i < len; i++) {
        replaceableWord = this.replaceableWords[i];
        regex = new RegExp(replaceableWord, 'ig');
        if (regex.test(word)) {
            return true;
        }
    }
    return false;
}


module.exports = WordSeparator;