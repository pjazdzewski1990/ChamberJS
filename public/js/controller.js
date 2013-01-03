//controller for application
AppController = Backbone.Router.extend({
	observers: 		null,
	placeholder: 	null,
	loggedIn: 		false,
	view:			null,
	
	initialize: function(options) {
		this.placeholder = options.placeholder; 
		this.observers = options.observers;
	},
	
	routes: {
		"":		"main",
		":month/:day/:year":	"showTasks"// http://some_address#01/15/2013
	},
	
	notifyAll: function(year, month, day) {
		for(var i=0; i< this.observers.length; i++){
			this.observers[i].update(year, month, day);
		}
	},
	
	sendRequest: function(path, params, callback) {
		var adr = Config.backend_address;
		adr += path;
		
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
		
		$.ajax({
			type: "GET",
			url: adr,
			data: { }
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
		}
	},
	
	logIn: function (username, password) {
		this.sendRequest("login/index.json", {"login": username, "password":password}, this.handleLogIn);
	},
	
	main: function() {
		if(this.loggedIn){
			this.showCalendar();
		}else{
			this.showLogin();
		}
	},
	
	showTasks: function(year, month, day) {
		alert("Poka� " + day + "." + month + "." + year);
	}
});