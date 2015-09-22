var ironMan 		= require('./ironman');
var hulk 			= require('./hulk');
var thor			= require('./thor');
var captainAmerica	= require('./captainamerica');

function AlgorithmManager(array, fibNumber){
	this.array = array;
	this.startingFibonacciNumber = fibNumber;
}

AlgorithmManager.prototype.executeAlgorithm = function(name){
	var result = '';
	switch (name){
		case 'IronMan':
			result = ironMan.execute(this.array);
			break;
		case 'TheIncredibleHulk':
			result = hulk.execute(this.array);
			break;
		case 'Thor':
			result = thor.execute(this.array, this.startingFibonacciNumber);
			break;
		case 'CaptainAmerica':
			result = captainAmerica.execute(this.array, this.startingFibonacciNumber);
			break;
		default:
			result = "No algorithm type Found!";
	}
	return result;
}

module.exports = AlgorithmManager;