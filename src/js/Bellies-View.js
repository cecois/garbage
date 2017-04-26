var BelliesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		GLJ = L.featureGroup()
		.addTo(map);

//		this.collection.bind('sync', this.render, this);
		// this.listenTo(slider.noUiSlider, 'update', this.render);
		
		// slider.noUiSlider.on('update',this.render());

	}
	,render: function(t){

		GLJ.clearLayers();
		GLJ.clearAllEventListeners();

var T=t
// var T = (typeof slider !== 'undefined')?slider.noUiSlider.get():null;
var f = (typeof this.collection !== 'undefined')?_.first(this.collection.models):null;
// var e = slider.noUiSlider.get()
// console.log("f:");console.log(moment(f.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix());

		// var timz = []

		_.each(this.collection.models,function(R){


			// var S = moment(R.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix().toFixed(2)

			// var ts = "04/22/2014 01:30:00 PM";moment(ts,['MM/DD/YYYY h:mm:ss A']).format("X")
			var S = moment(R.get("timestamp"),['MM/DD/YYYY h:mm:ss A']).unix().toFixed(2)

			if(S>=T[0] && S<=T[1]){

			console.log("slider time:",T)
			console.log("belly time:",S)
			var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style(R.get("fullness")))
			// cm.bindPopup(R.get("description"))
			.addTo(GLJ);
}			
			

		})


// we know this
// map.fitBounds([[42.3037216984154,-71.21337890625001],[42.41635997208289,-70.9545135498047]]);

return this

}
});
