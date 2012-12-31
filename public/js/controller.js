//controller for application
AppController = Backbone.Router.extend({
	observers: 		null,
	placeholder: 	null,
	loggedIn: 		false,
	
	initialize: function(options) {
		this.placeholder = options.placeholder; 
		this.observers = options.observers;
	},
	
	routes: {
		"":		"main",
		"year":	"showTasks"// http://some_adress#2012/12/13
	},
	
	notifyAll: function(year, month, day) {
		for(var i=0; i< this.observers.length; i++){
			this.observers[i].update(year, month, day);
		}
	},
	
	sendRequest: function(path, params, callback) {
		var adr = Config.backend_adress;
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
		alert("ADR: " + adr);
		
		$.ajax({
			type: "GET",
			url: adr,
			data: { }
		}).done(function( response ) {
			alert("Response " + response);
			callback(response)
		});
	},
	
	showLogin: function() {
		var view = new LoginView({ el: this.placeholder });
	},
	
	handleLogIn: function(response) {
		alert('handleLogIn()' + response);
		if(response == true) {
			//var view = new LoginView({ el: this.$el });
		}
	},
	
	logIn: function (username, password) {
		alert("U:" + username +" P:" + password);
		this.sendRequest("login/index.json", {"login": username, "password":password}, this.handleLogIn);
	},
	
	main: function() {
		if(this.loggedIn){
			this.showCalendar();
		}else{
			this.showLogin();
		}
	},
	
	showTasks: function(year/*, month, day*/) {
		alert("Poka¿ "/* + day + "." + month + "."*/ + year);
	}
});