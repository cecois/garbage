var BelliesCollection = Backbone.Collection.extend({
	model: Belly,
	url: function() {
		return 'assets/bellies.2014-'+appState.get("slug")+'.json'
	},
	initialize: function(options) {
		// this.listenTo(appState, 'change:slug', this.deactivate);
		// this.listenTo(appState, "change", this.fetch({reset:true}));
		options || (options = {});
		return this
		// .fetch()
	}
	,parse: function (nodes) {
		return nodes.rows
	}
});