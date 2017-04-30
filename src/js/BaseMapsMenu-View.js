var BaseMapsMenuView = Backbone.View.extend({
	tagName: "ul",
	el: "#menu-basemaps-wrapper",
	events: {
		"click .mnu-basemap-item": "switch",
	},
	template: Handlebars.templates['BaseMapsMenuViewTpl'],
	initialize: function() {

		this.listenTo(appState,'change:baselayer', this.render, this);
		this.render()
	},
	switch: function(e) {

		var n = $(e.currentTarget).attr("data-id")

		appState.set({
			baselayer: n
		});

		return this

	},
	render: function() {
		$(this.el).html(this.template({

			rows: this.collection.toJSON()

		}));
	}
});