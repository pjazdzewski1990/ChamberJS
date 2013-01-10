//controller for application
AppController = Backbone.Router.extend({
	observers: 		null,
	placeholder: 	null,
	view:			null,
	tryLogin:		null,
	
	initialize: function(options) {
		this.placeholder = options.placeholder; 
		this.observers = options.observers;
	},
	
	routes: {
		//"/": 					"main",
		":month/:day/:year":	"showTasks"// http://some_address#01/15/2013
	},
	
	notifyAll: function(year, month, day) {
		for(var i=0; i< this.observers.length; i++){
			this.observers[i].update(year, month, day);
		}
	},
	
	putInStorage: function(key, value){
		webdb.put(key, value);
	},
	
	getFromStorage: function(key){
		return webdb.get(key);
	},
	
	loggedIn: function(){
		return this.getFromStorage("_loggedUser") != null;
	},
	
	//TODO: only GET/POST for time being 
	sendRequest: function(path, method, params, callback) {
		var adr = Config.backend_address;
		adr += path;
		
		if(method=="GET"){
			var num = 1;
			for (var key in params) {
				if(num == 1 ){
					adr += "?";
				}else{
					adr += "&";
				}
				adr += key;
		    	adr += "=";
		    	adr += params[key];
		    	num++;
			}
			params = { };
		}
		
		$.ajax({
			type: method,
			url: adr,
			data: params
		}).done(function( response ) {
			callback(response)
		});
	},
	
	showLogin: function() {
		this.view = new LoginView({ el: this.placeholder });
	},
	
	showCalendar: function() {
		this.view = new CalendarView({ el: this.placeholder });
	},
	
	handleLogIn: function(response) {
		if(JSON.parse(response) == true) {
			// wywolanie z zewnatrz: this -> controller
			controller.showCalendar();
			
			controller.putInStorage("_loggedUser", controller.tryLogin);
		}else{
			this.tryLogin = null;
			controller.view.showLoginError();
		}
	},
	
	logIn: function (username, password) {
		this.tryLogin = username;
		
		this.sendRequest("login/index.json", "GET", {"login": username, "password":password}, this.handleLogIn);
	},
	
	main: function() {
		if(this.loggedIn()){
			this.showCalendar();
		}else{
			this.showLogin();
		}
	},
	
	showTasks: function(day, month, year) {
		var id = day + "_" + month + "_" + year;
		alert("TEST: " + id);
		this.sendRequest("tasks/bydate/" + id + ".json", "GET", {}, this.handleTask);
	},
	
	handleTask: function(response){
		// wywolanie z zewnatrz: this -> controller
		controller.view.showTasks(response);
	}
});