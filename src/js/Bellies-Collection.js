var BelliesCollection = Backbone.Collection.extend({
	model: Belly,
	url: function() {
		return 'assets/big-belly-alerts-2014-mm.json'
	},
	initialize: function(options) {
		// this.listenTo(appState, 'change:slug', this.deactivate);
		options || (options = {});
		return this.fetch()
	}
	,parse: function (nodes) {
        return nodes.rows
    }
});