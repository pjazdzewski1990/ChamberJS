LoginView = Backbone.View.extend({
	formValidator: null,
	
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
		
		$('#login_form input').hover(function(){
			$(this).popover('show');
		});
		
		this.formValidator = $("#login_form").validate({
			rules: {
				username: {required:true, notDefaultText: true},
				password: {required:true, notDefaultText: true}
			},

			messages:{
				username: {required:"Uzupełnij", notDefaultText: "Uzupełnij"},
				password: {required:"Uzupełnij", notDefaultText: "Uzupełnij"}
			},

			errorClass: "help-inline",
			errorElement: "span",
			
			highlight:function(element, errorClass, validClass)
			{
				$(element).removeClass('success');
				$(element).addClass('error');
			},
			
			unhighlight: function(element, errorClass, validClass)
			{
				$(element).removeClass('error');
				$(element).addClass('success');
			}
		});
	},
	
	events : {
		"click button[type=submit]" : "submit"
	},
	
	validate: function() {
		return $("#login_form_username").val().length>0 && $("#login_form_password").val().length>0;
	},
		
	//TODO: this zastapione przez controller.view, fajnie byloby wrocic do starszej wersji
	submit : function(event) {
		event.preventDefault();
		alert('submit');
		if(controller.view.formValidator.valid()){
			controller.logIn($("#login_form_username").val(), $("#login_form_password").val());
		} else {
		}
		return false;
	}
});