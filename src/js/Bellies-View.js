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


			// var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style("no_call")).addTo(GLJ);

		}); //each

		map.fitBounds([[42.3037216984154,-71.21337890625001],[42.41635997208289,-70.9545135498047]]);

		return this
	}
	,get_ranges: function(t){

		var T=t
		// var MZ = this.collection.models
		// var MZ = this.collection.where({description:"702 Mass Ave & Harrison @ Boston Medical Center"});

		// console.log("MZ",MZ)
		// var mlz = _.pluck(MZ,'ts_as_ts')
		console.log("reducing from total of ",this.collection.models.length)

		var rgz = this.collection.map((M,i,l)=>{

			if(M.get("description")=="702 Mass Ave & Harrison @ Boston Medical Center"){

				var S = M.get("ts_as_ts")
			// console.log("S:",moment(S,["X"]).format("dddd, MMMM Do YYYY, h:mm:ss a"))

			// var tz = _.pluck(l,"ts_as_ts")
			console.log("checking for "+M.get("description").substr(0,10)+" at "+moment(S,['X']).format()+" between "+moment(T[0],["X"]).format()+ " and "+moment(T[1],["X"]).format())

			if(S>=T[0] && S<=T[1]){
				console.log("S within range!")
				return M
			} else {
				// console.log("S outta range:",moment(S,["X"]).format("dddd, MMMM Do YYYY, h:mm:ss a"))

				var arr = _.map(l,(m)=>{return m.get("ts_as_ts")})

				// var arr = [1,5,10,50,100]

				var p = _.partition(arr,(n)=>{
					return n<S;
				})

				var ess = _.last(p[0])



				console.log("closest we could find for "+M.get("description")+" at "+moment(S,['X']).format("dddd, MMMM Do YYYY, h:mm:ss a")+": "+moment(ess,['X']).format("dddd, MMMM Do YYYY, h:mm:ss a"))
				return M
	} //else of s within Ts


	// return (S>=T[0] && S<=T[1])

			} //debug limiter query on M.description

		}); // map

		return rgz
} // get_ranges
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
			// console.log("single Y",Y[0])
			// console.log("Y when its X == 1:"); console.log(Y);
		} else if(X.length>1){


			// more than one report in range, gotta choose the most recent
			// get the one member of that station's array that has the highest timestamp
			var ti = _.max(_.map(X,(t)=>{return t.get("ts_as_ts");}))


			// now use that as an index, of sorts, to find that full station doc
			Y = _.find(X,(t)=>{return t.get("ts_as_ts")==ti;});
			// console.log("Y when its X > 1:"); console.log(Y);
			// console.log("multi-reeuced Y",Y[0])

		} else {
			// none in range, we gotta find the nearest (price is right rules)
// build an array of all possible timestamps for this station
// console.log("trying to find using ")
// console.log(UTIL.hasha(U[0].get("description")))

// first get that station's records...

var allz = _.filter(l,(m)=>{return UTIL.hasha(m[0].get("description"))==UTIL.hasha(U[0].get("description"))});

// console.log("allz:");console.log(allz)

var tses = _.map(allz[0],(m)=>{return m.get("ts_as_ts");});

var lt = parseFloat(t[0])

var p = _.partition(tses,(tl)=>{return tl<lt})

if(p[0].length>0){

	var las = _.last(p[0])
	// xb = _.filter(allz,(a)=>{
	// 	console.log("checkin it against this a:")
	// 	console.log(a)
	// 	return _.findWhere(a,{ts_as_ts:las})
	// })
	var xb = _.find(allz,(tz)=>{
		var ta= _.find(tz,(t)=>{
			console.log("our las:",las)
			if(t.get("ts_as_ts")==las){
				console.log("the match we wanna end u in Y is ",t.get("description")+".."+t.get("ts_as_ts"))
			}
			return t.get("ts_as_ts")==las
		}) //find.tz
		return ta
	}) //find.allz
	Y=_.last(xb)
	console.log("Y when its X == 0 but we found a nearest:",Y.get("description")+".."+Y.get("ts_as_ts"));
}

}


return Y;
});



	return REPS

}
,render: function(t){

		// GLJ.clearLayers();
		GLJ.clearAllEventListeners();

		var T=t
		// var ranged = this.get_ranges(t);
		var ranged = _.toArray(this.get_reps(t))

		_.each(ranged,(R)=>{


			if(typeof R.get !== 'undefined'){
				// console.log(R)
				var cm = L.circleMarker([R.get("lat"),R.get("lng")], UTIL.get_style(R.get("fullness")))
				cm.bindPopup(UTIL.hasha(R.get("description"))+".."+R.get("ts_as_ts"))
				.addTo(GLJ);} else {
				// console.error(R)
			}



		})


		return this

	}
});
