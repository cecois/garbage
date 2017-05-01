var BelliesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		SIDEZ = L.featureGroup()
		.addTo(map);

		GLJ = L.featureGroup()
		.addTo(map);

		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(appState, "change", this.prefetch);
		this.listenTo(appState, "change:slug", this.siderender);

		return this
		.siderender()
	}
	,prefetch: function(){

		// appActivity.set({msg:"calculating bellies..."})
		// not great! but also genius
		this.collection.fetch({reset:true})

		return this
		// .siderender()
	}
	,siderender: function(){

		SIDEZ.clearLayers();

		switch(appState.get("slug")) {
			case "baa":

			$.getJSON( "assets/bos-route.geojson", function( data ) {

				L.geoJSON(data, {style:UTIL.get_style('baa')}).addTo(SIDEZ);

			});

			break;
			case "animebos":
			min = Config.EVENTS.animebos.start
			break;
			default:
			return null
		}

		if(SIDEZ.getLayers()>0){
			map.fitBounds(SIDEZ.getBounds())}

			return this
		}
		,get_reps: function(t){

// make sure we're getting integers
var t = _.map(t,(t)=>{return parseInt(t);})

var uniqs = this.collection.groupBy((m)=>{return UTIL.hasha(m.get("description"))})

		// console.log("556:",);

		var Y = null;
		var REPS = _.map(uniqs,(U,i,l)=>{

// maybe one/some will be in our time range
var X = U.filter((u)=>{
	// if(u.get("ts_as_ts")!==null && u.get("ts_as_ts")>=parseInt(t[0]) && u.get("ts_as_ts")<=parseInt(t[1]) && u.get("description")=="556 Commercial St"){console.log("U.filter found at least one valid 556Comm....");console.log(u)}
	return (u.get("ts_as_ts")!==null && u.get("ts_as_ts")>=parseInt(t[0]) && u.get("ts_as_ts")<=parseInt(t[1]));
		}) //filter

if(X.length==1){
			// got one in range, return it

// if(X[0].get("description")=="556 Commercial St"){ console.log("Comm in range ",X); }

Y=X[0];
} else if(X.length>1){


			// more than one report in range, gotta choose the most recent
			// get the one member of that station's array that has the highest timestamp
			var ti = _.max(_.map(X,(t)=>{return t.get("ts_as_ts");}))


			// now use that as an index, of sorts, to find that full station doc and return it
			Y = _.find(X,(t)=>{return t.get("ts_as_ts")==ti;});

// if(Y.get("description")=="556 Commercial St"){ console.log("Comm in range multiple ",Y); }

} else {
			// none in range, we gotta find the nearest (price is right rules)

// first get that station's records...
var allz = _.filter(l,(m)=>{
	// if(m[0].get("description")=="556 Commercial St"){
	// 	console.log("in allz.filter, 556Comm:",m[0]);
	// }
	return UTIL.hasha(m[0].get("description"))==UTIL.hasha(U[0].get("description"))});


var tses = _.map(allz[0],(m)=>{

	// if(m.get("description")=="556 Commercial St"){
	// 	console.log("m",m);
	// 	console.log("m.description",m.get("description"));
	// 	console.log("m.ts_as_ts",m.get("ts_as_ts"));
	// }

	return m.get("ts_as_ts");
});

// console.log("tses.70",tses);

var lt = parseFloat(t[1])

// console.log("now we partioni using "+lt);

var p = _.partition(tses,(tl)=>{return tl<=lt})

// console.log("p0.length",p[0].length);
// console.log("p1.length",p[1].length);

if(p[0].length>0){

// console.log("p0.length>0",p[0]);

var las = _.last(p[0])
	// if(las<t[1])
	var xb = _.find(allz,(tz)=>{
		// console.log("xb",xb);
		var ta= _.find(tz,(tw)=>{
			// return tw.get("ts_as_ts")==las
			return tw.get("ts_as_ts")==las
		}) //find.tz
		// console.log("ta",ta);
		return ta
	}) //find.allz
	// Y=_.last(xb)
	Y=_.find(xb,(x)=>{return x.get("ts_as_ts")==las})

	// if(Y.get("description")=="556 Commercial St"){ console.log("Comm not between "+t[0]+" and "+t[1]+" but thers a lower ",Y); }

} else {
	// nothing before passed time, we'll just return a dummy rep for this station
	Y=_.last(allz[0])
	// Y.fullness="out of range"
	Y.set({fullness:"default"})
	Y.set({ts_as_ts:null})

// if(Y.get("description")=="556 Commercial St"){ console.log("Y will default ",Y); }

}

}


return Y;
});



		return REPS

	}
	,stfu: ()=>{
		appActivity.set({msg:null})
	}
	,render: function(){
		switch(appState.get("slug")) {
			case "baa":
			min = Config.EVENTS.baa.start
			break;
			case "animebos":
			min = Config.EVENTS.animebos.start
			break;
			default:
			return null
		}

		var t = [min,appState.get("time")]

		GLJ.clearLayers();
		GLJ.clearAllEventListeners();

		// var T=t
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
