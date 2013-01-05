LoginView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	
	render : function() {
		// Pass variables in using Underscore.js Template
		var variables = { };
		// Compile the template using underscore
		var template = _.template($("#login_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		this.$el.html(template);
	},
	
	events : {
		"click button[type=submit]" : "submit"
	},
	
	validate: function() {
		return $("#login_form_username").val().length>0 && $("#login_form_password").val().length>0;
	},
	
	clearError: function() {
		$("#login_form").removeClass("form_error");
	},
	
	markError: function() {
		$("#login_form").addClass("form_error");
	},
		
	//TODO: this zastapione przez controller.view, fajnie byloby wrocic do starszej wersji
	submit : function(event) {
		event.preventDefault();
		alert('submit');
		if(controller.view.validate()){
			controller.logIn($("#login_form_username").val(), $("#login_form_password").val());
			controller.view.clearError();
		}else{
			controller.view.markError();
		}
		return false;
	}
});