var controller;

$(document).ready(function() {
	var article_controller_args = { placeholder: $('#article'), observers: [] };
	controller = new AppController(article_controller_args);
	
	Backbone.history.start({pushState: true});
	
	controller.main();
});
