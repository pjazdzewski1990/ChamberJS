LoginView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		// Pass variables in using Underscore.js Template
		var variables = {
		};
		// Compile the template using underscore
		var template = _.template($("#login_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		this.$el.html(template);
	},
	events : {
		"click input[type=submit]" : "submit"
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
	submit : function(event) {
		if(this.validate()){
			controller.logIn($("#login_form_username").val(), $("#login_form_password").val());
			this.clearError();
		}else{
			this.markError();
		}
		return false;
	}
});