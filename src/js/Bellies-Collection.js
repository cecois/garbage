var BelliesCollection = Backbone.Collection.extend({
	model: Belly,
	url: function() {
		return 'assets/bellies.2014-marathon.json'
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