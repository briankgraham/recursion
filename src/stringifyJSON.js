// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result;
  if (obj === null){ return 'null';}
  if (typeof obj === 'boolean') return obj.toString();
  if (typeof obj === 'number') return obj.toString();
  if (typeof obj === 'string') return '"' + obj + '"';
  if (Array.isArray(obj)){
  	return '[' + _.map(obj, function(item){
  		return stringifyJSON(item);
  	}).join(',') + ']';
  }
  if (typeof obj === 'object'){
  	var result = [];
  	_.each(obj, function(value, key){
  		if (value){ result.push('"' + key + '":' + '"' + value + '"');}
  	});
  	return '{' + result.join(',') + '}';
  }
};
