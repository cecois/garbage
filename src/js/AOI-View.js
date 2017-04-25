var AOIView = Backbone.View.extend({

	// el: $("#navContainer .tabbable .nav-tabs"),
	// template: Handlebars.templates['PanelMenuViewTpl'],
	events: {
		// "click li": function(e) {
		// 	var pid = $(e.currentTarget).attr("data-id")
		// 	appState.set({
		// 		slug: pid
		// 	})
		// }
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		return this.render()
	},
	render: function() {

console.log("aoi frm its view:");console.log(appState.get("aoi"));
		// $(this.el).html(this.template(this.collection.toJSON()))
		return this
	}
});