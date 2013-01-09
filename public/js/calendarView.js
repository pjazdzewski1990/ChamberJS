CalendarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	
	render : function() {
		// Pass variables in using Underscore.js Template
		var variables = { };
		// Compile the template using underscore
		var template = _.template($("#calendar_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		this.$el.html(template);
		
		$('#placeholder_calendar').datepicker({
           onSelect: this.handleClick
        });
	},
	
	handleClick : function(clicked) {
		controller.navigate("/#" + clicked);
		var date = clicked.split("/");
		controller.showTasks(date[1], date[0], date[2]);
	},
	
	showDetails : function(event){
		alert('showDetails');
	},
	
	showTasks : function(d) {
		// Pass variables in using Underscore.js Template
		var variables = {data: d, onClickHandler: "controller.view.showDetails()"};
		// Compile the template using underscore
		var template = _.template($("#tasks_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		$('#placeholder_tasks').html(template);
	}
});