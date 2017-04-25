var BelliesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		GLJ = L.featureGroup()
		.addTo(map);

		this.collection.bind('sync', this.render, this);

	}
	,render: function(){

		GLJ.clearLayers();
		GLJ.clearAllEventListeners();


		var timz = []



		_.each(this.collection.models,function(R){

			var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style(R.get("fullness")))
			// cm.bindPopup(R.get("description"))
			.addTo(GLJ);

			// while we're here
			timz.push(moment(R.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix())
			

		})

		console.log("_.min(timz)");
		console.log(moment.unix(_.min(timz)));
		console.log("_.max(timz)");
		console.log(moment.unix(_.max(timz)));

// we know this
map.fitBounds([[42.3037216984154,-71.21337890625001],[42.41635997208289,-70.9545135498047]]);

return this

}
});