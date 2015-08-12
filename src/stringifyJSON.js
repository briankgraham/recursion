// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === 'boolean' || obj === null || typeof obj === 'number') { return ''+ obj; }
  if (typeof obj === 'string') { return '"' + obj + '"'; }
  if (Array.isArray(obj)){
  	return '[' + _.map(obj, function(item){
  		return stringifyJSON(item);
  	}).join(',') + ']';
  }
  if (obj && typeof obj === 'object'){
  	return '{' + _.chain(obj)
					  	.map(function (value, key) {
					  		value = stringifyJSON(value);
					  		if (value){ return stringifyJSON(key) + ':' + value; }
					  	})
					  	.filter(function (item) {
					  		if (typeof item !== 'undefined') { return true; }
					  	}).value() + '}';
  }
};

