// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
// But instead we're going to implement it from scratch:

var getElementsByClassName = function (className) { 
  var result = [];
  		walkIt = function (node, callback) {
  			var child, theList, i;
  			callback(node);
  			if (node.childNodes) {
  				theList = node.childNodes.length;
          for (i = 0; i < theList; i++) {
          	child = node.childNodes[i];
          	walkIt(child, callback);
          }
  			}
  		};
  walkIt(document.body, function (node) {
  	if (node.className && node.classList.contains(className)) {
  		result.push(node);
  	}
  });
  return result;
};
