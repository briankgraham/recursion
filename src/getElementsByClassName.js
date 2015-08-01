// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
// But instead we're going to implement it from scratch:

var getElementsByClassName = function (className) { 
  var result = [];
  		walkIt = function (node) {
  			var child;
  			if (node.className && node.classList.contains(className)) {
  				result.push(node);
  			}
  			if (node.childNodes) {
          for (var i = 0; i < node.childNodes.length; i++) {
          	child = node.childNodes[i];
          	walkIt(child);
          }
  			}
  		};
  walkIt(document.body);
  return result;
};
