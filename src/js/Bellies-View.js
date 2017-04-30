var BelliesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		GLJ = L.featureGroup()
		.addTo(map);

		this.collection.bind('sync', this.render, this);
		this.listenTo(appState, "change", this.render);

		return this
		// .preset()
		.render()
	}
	,preset: function(){


		_.each(this.collection.models,function(R){


			var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style("default")).addTo(GLJ);

		}); //each

		// map.fitBounds([[42.3037216984154,-71.21337890625001],[42.41635997208289,-70.9545135498047]]);

		return this
	}
	,get_reps: function(t){

		var uniqs = this.collection.groupBy((m)=>{return UTIL.hasha(m.get("description"))})
		var Y = null;
		var REPS = _.map(uniqs,(U,i,l)=>{

// maybe one/some will be in our time range
var X = U.filter((u)=>{
	return (u.get("ts_as_ts")>=t[0] && u.get("ts_as_ts")<=t[1]);
		}) //filter



if(X.length==1){
			// got one in range, return it

			Y=X[0];
		} else if(X.length>1){


			// more than one report in range, gotta choose the most recent
			// get the one member of that station's array that has the highest timestamp
			var ti = _.max(_.map(X,(t)=>{return t.get("ts_as_ts");}))


			// now use that as an index, of sorts, to find that full station doc and return it
			Y = _.find(X,(t)=>{return t.get("ts_as_ts")==ti;});


		} else {
			// none in range, we gotta find the nearest (price is right rules)

// first get that station's records...
var allz = _.filter(l,(m)=>{return UTIL.hasha(m[0].get("description"))==UTIL.hasha(U[0].get("description"))});


var tses = _.map(allz[0],(m)=>{return m.get("ts_as_ts");});

var lt = parseFloat(t[1])

var p = _.partition(tses,(tl)=>{return tl<lt})

if(p[0].length>0){

	var las = _.last(p[0])

	// if(las<t[1])
	var xb = _.find(allz,(tz)=>{
		var ta= _.find(tz,(t)=>{
			return t.get("ts_as_ts")==las
		}) //find.tz
		return ta
	}) //find.allz
	Y=_.last(xb)
	Y=_.find(xb,(x)=>{return x.get("ts_as_ts")==las})

} else {
	// nothing before passed time, we'll just return a dummy rep for this station
	Y=_.last(allz[0])
	// Y.fullness="out of range"
	Y.set({fullness:"default"})
	Y.set({ts_as_ts:null})
	

}

}


return Y;
});



		return REPS

	}
	,stfu: ()=>{
		appActivity.set({msg:null})
	}
	,render: function(t){


		GLJ.clearLayers();
		GLJ.clearAllEventListeners();

		var T=t
		var ranged = _.toArray(this.get_reps(t))

		_.each(ranged,(R,i,l)=>{

			if(R !== null){
				if(typeof R.get !== 'undefined'){


var clazz=null
	switch(R.get("fullness")) {
		case "default":
		clazz = (mapBaseLayers.findWhere({"active":true}).get("mapis")=='dark')?'leaf-default-mapdark':'leaf-default-maplight';
			break;
		default:
		clazz='leaf-'+R.get("fullness")
	}

var dc = L.divIcon({ className: clazz})
// var marker = L.marker([51.509, -0.08], {icon: div_circle} ).addTo(mymap);

					// var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style(R.get("fullness")))
					// var tim_as_tim = (R.get("ts_as_ts")==null)?" (no call in range)":" at "+moment(R.get("ts_as_ts"),['X']).format("dddd, MMMM Do YYYY, h:mm:ss a")
					// cm.bindPopup("<span style='color:#bcbdbc;'>"+R.get("description")+tim_as_tim+"</span>")
					// .addTo(GLJ);
					// 
					

					var cm = L.marker([R.get("lat"),R.get("lng")], {icon:dc})
					var tim_as_tim = (R.get("ts_as_ts")==null)?" (no call in range)":" at "+moment(R.get("ts_as_ts"),['X']).format("dddd, MMMM Do YYYY, h:mm:ss a")
					cm.bindPopup("<span style='color:#bcbdbc;'>"+R.get("description")+tim_as_tim+"</span>")
					.addTo(GLJ);

				}

			}

		})

		return this
		.stfu()


	}
});
