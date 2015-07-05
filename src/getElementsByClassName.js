// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
// But instead we're going to implement it from scratch:

var getElementsByClassName = function (className) { 
			var result = [];
			travTheDom(document.body, function (node) {
				var i, a, c = node.className;
				if (c) {
					a = c.split(' ');
					for (i = 0; i < a.length; i++) {
						if (a[i] === className) {
							result.push(node);
							break;
						}
					}
				}
			});
			return result;
    },
    travTheDom = function (node, callback) {
  	  callback(node);
  	  node = node.firstChild;

  	  while (node) {
  		  travTheDom(node, callback);
  		  node = node.nextSibling;
      }
    };


