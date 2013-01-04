CalendarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	
	render : function() {
		this.$el.html('');
		this.$el.datepicker({
           onSelect: this.handleClick
        });
	},
	
	handleClick : function(clicked) {
		controller.navigate("/#" + clicked);
		var date = clicked.split("/");
		controller.showTasks(date[1], date[0], date[2]);
	},
	
	showTasks : function(data) {
		var d = jQuery.parseJSON(data);
		alert("d "+ d);
		for(var i=0; i<d.length; i++){
			//tu powinien byc template underscore
			this.$el.append(d[i].title + ":" + d[i].content);
		}
	}
});