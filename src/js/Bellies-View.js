var BelliesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		GLJ = L.featureGroup()
		.addTo(map);

		this.collection.bind('sync', this.prerender, this);
		// this.listenTo(slider.noUiSlider, 'update', this.render);

		return this
		// .prerender()
	}
	,prerender: function(){


		_.each(this.collection.models,function(R){


			var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style("no_call"))
			.addTo(GLJ);

		}); //each

		map.fitBounds([[42.3037216984154,-71.21337890625001],[42.41635997208289,-70.9545135498047]]);

		return this
	}
	,render: function(t){

		// GLJ.clearLayers();
		GLJ.clearAllEventListeners();

		var T=t

		_.each(this.collection.models,(R,i,l)=>{

			// var S = moment(R.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix().toFixed(2)

			// var ts = "04/22/2014 01:30:00 PM";moment(ts,['MM/DD/YYYY h:mm:ss A']).format("X")
			var S = moment(R.get("timestamp"),['MM/DD/YYYY h:mm:ss A']).unix().toFixed(2)

// FIRST TEST FOR ACTUAL match, fall back to most recent
var real=null,styl=null;
// var ss = _.filter(appBellies.models,(B)=>{return (B.get("description")=="High & Summer (Sovereign Bank)" && moment(B.get("timestamp"),['MM/DD/YYYY h:mm:ss A']).unix().toFixed(2)< moment("04/22/2014 09:15:00 PM",['MM/DD/YYYY h:mm:ss A']).unix().toFixed(2) )})
			if(S>=T[0] && S<=T[1]){
				real = R;
				styl = real.get("fullness")
			} 
			else {
// 				var falback = _.filter(l,(M)=>{return (M.get("description")==R.get("description") && (moment(M.get("timestamp"),['MM/DD/YYYY h:mm:ss A']).unix() < moment("04/21/2014 09:15:00 AM",['MM/DD/YYYY h:mm:ss A']).unix() ));})
// console.log("falbak",falbak);
var real = R;
real.set({timestamp:"04/21/2014 00:00:00 AM"})
				styl = "no_call"
			}

				var cm = L.circleMarker([real.get("lat"),real.get("lng")], UTIL.get_style(styl))
			// cm.bindPopup(R.get("description"))
			.addTo(GLJ);
		


	})


		return this

	}
});
