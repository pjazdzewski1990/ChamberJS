CalendarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	
	render : function() {
		alert("render -calendar");
		// Pass variables in using Underscore.js Template
		var variables = { };
		// Compile the template using underscore
		var template = _.template($("#calendar_template").html(), variables);
		// Load the compiled HTML into the Backbone "el"
		this.$el.html(template);
	}
});