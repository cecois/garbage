var ActivityView = Backbone.View.extend({

	el: $("#mini-console"),
	template: Handlebars.templates['ActivityViewTpl'],
	events: {
		// "click li": function(e) {
		// 	var pid = $(e.currentTarget).attr("data-id")
		// 	appState.set({
		// 		slug: pid
		// 	})
		// }
	},
	initialize: function() {
		NProgress.configure({
			parent: "#mc-throb"
			,showSpinner: false
		});

		this.listenTo(this.model, 'change', this.render);
		// return this.render()
	},
	render: function() {
		if(this.model.get("msg")!==null)
		{
			$(this.el).find('#mc-msg').html(this.template(this.model.toJSON()))
			if(this.model.get("throb")==true){NProgress.start();}
			return this
		}
		else {
			return this.stfu()
		}
	}
	,stfu: function(){

		$(this.el).find('#mc-msg').html(" ")
		NProgress.done();

		return this
	}
});