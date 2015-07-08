var parseJSON = function(json) { 
// IDEA from Douglas Crockford's Javascript: The Good Parts
	var ch = ' ',
			index = 0,
			value,
			escapes = {
			 '\\': '\\',
				'/': '/',
				  n: '\n',
				  r: '\r',
				  t: '\t',
				'"': '"'
			},

			next = function(c){
				if (c && c !== ch){
					throw new SyntaxError("characters do not match");
				}
				ch = json.charAt(index);
				index++;
				return ch;
			},

			whitespace = function(){
				while (ch && ch <= ' '){next();}
			},


			value = function () {
				whitespace();
				switch (ch){
					case '"':
						return stringy();
					case '[':
						return array();
					case '{':
						return obj();
					case '-':
						return number();
					default: 
						return ch >= '0' && ch <= '9' ? number() : word();
				}
			},

			word = function () {
				switch (ch) {
					case 'n':
						next('n');
						next('u');
						next('l');
						next('l');
						return null;
					case 't':
						next('t');
						next('r');
						next('u');
						next('e');
						return true;
					case 'f':
						next('f');
						next('a');
						next('l');
						next('s');
						next('e');
						return false;
				}
			},

			stringy = function () {
				var str = '';
				while (next()) {
					if (ch === '"'){
						next();

						return str;
					}
					if (ch === '\\'){
						next();
						if(typeof escapes[ch] === 'string'){
							str += escapes[ch];
						}
					}
					else{
						str += ch;
					}
			  }
			},

			number = function () {
				var str = '', num;
				if (ch === '-'){
					str = '-';
					next();
				}
				while (ch >= '0' && ch <= '9'){
					str += ch;
					next();
				}
				if (ch === '.'){
					str += ch;
					while (next() && ch >= '0' && ch <= '9'){
						str += ch;
					}
				}
				num = +str;
				return num;
			},

			array = function () {
				var arr = [];
				if (ch === '['){
					next('[');
					if (ch === ']'){
						next(']');
						return arr;
					}
					while (ch) {
						arr.push(value());
						whitespace();
						if (ch === ']') {
							next(']');
							return arr;
						}
						next(',');
					}
				}
			},

			obj = function () {
				var object  = {},
						key;
				if (ch === '{'){
					next('{');
					whitespace();
					if (ch === '}'){
						next();
						return object;
					}
					while (ch){
						key = stringy();
						whitespace();
						next(':');
						whitespace();
						object[key] = value();
						whitespace();
						if (ch === '}'){
							next('}');
							return object;
						}
						next(',');
						whitespace();
					}
				}
			},
			result = value();
			whitespace();
			return result;
};