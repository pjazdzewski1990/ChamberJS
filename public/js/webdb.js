/** DATA STORAGE */
var webdb = {};

webdb.init = function() {
	if (Modernizr.indexeddb == true) {
		// use local storage
		webdb.put = function(key, value) {
			localStorage.setItem(key, value);
		};

		webdb.get = function(key) {
			return localStorage.getItem(key);
		};
	} else {
		// no local storage
		// TODO: implement, cookies maybe?
		webdb.put = function(key, value) {
			// do nothing
		};

		webdb.get = function(key) {
			return null;
		};
	}
};