//TODO: refactor this monolith into smalller pieces 
CalendarView = Backbone.View.extend({
	formValidator: null,
	date: "1/1/2013",
	
	initialize: function() {
		this.render();
	},
	
	render: function() {
		// Pass variables in using Underscore.js Template
		var variables = { };
		// Compile the template using underscore
		var template = _.template($("#calendar_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		this.$el.html(template);
		
		$('#placeholder_calendar').datepicker({
           onSelect: this.handleClick
        });
		
		this.showForm();
	},
	
	events: {
		"click button[type=submit]" : "addTask"
	},
	
	handleClick: function(clicked) {
		controller.navigate("/#" + clicked);
		var date = clicked.split("/");
		controller.showTasks(date[1], date[0], date[2]);
		
		controller.view.date = clicked;
	},
	
	showTasks: function(d) {
		// Pass variables in using Underscore.js Template
		var variables = {data: d};
		// Compile the template using underscore
		var template = _.template($("#tasks_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		$('#placeholder_tasks').html(template);
	},
	
	showForm: function() {
		// Pass variables in using Underscore.js Template
		var variables = {user: controller.getFromStorage("_loggedUser")};
		// Compile the template using underscore
		var template = _.template($("#form_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		$('#placeholder_form').html(template);
		
		$('#task_form input').hover(function(){
			$(this).popover('show');
		});
		
		this.formValidator = $("#task_form").validate({
			rules: {
				task_title: {required:true, notDefaultText: true},
				task_content: {required:true, notDefaultText: true}
			},

			messages:{
				task_title: {required: "Wype³nij", notDefaultText: "Wype³nij"},
				task_content: {required: "Wype³nij", notDefaultText: "Wype³nij"}
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
	
	addTask: function() {
		var d = this.date.split("/");
		var id = d[1] + "_" + d[0] + "_" + d[2];
		alert("TESTuj dodawanie: " + id);
		controller.sendRequest("tasks/addbydate/" + id + ".json", "POST", {"task_title": $("#task_title").val(), task_content: $("#task_content").val()}, this.handleCreate);
		
		return false;
	},
	
	handleCreate: function(response){
		//handle response
		alert(reponse);
	}
});