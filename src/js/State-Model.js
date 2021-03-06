var State = Backbone.Model.extend({
	defaults: {
		"downout": "out",
		"slug": "home",
		"bbox": "-71.21337890625001,42.3037216984154,-70.9545135498047,42.41635997208289",
		"baselayer": null,
		"overlays": null,
		// "page": null,
		"apikey": "0",
		"active": null,
		// "query": "",
		"active": null,
		"dlex": "map",
		"querytype": null
		,"time":null
	},
	initialize: function(options) {
		options || (options = {});
		// this.on('change:non', this.layerize, this)
		// this.on('change', this.pullurl, this)
		// this.listenTo(map, 'moveend', this.upbbox)
		return this
	},
	upbbox: function(){
		var bbx = map.getBounds().toBBoxString();
		if(this.get("bbox")!==bbx){
			this.set({bbox:bbx})
		}

		return this

	},
	toggle: function(which) {

		var whi = (typeof which == 'undefined') ? "split" : which;

		switch (this.get("downout")) {
			case "split":
			wh = "out"
			break;
			case "down":
			wh = "out"
			break;
			case null:
			wh = 'nil'
			break;
			default:
			wh = whi
		}

		this.set({
			downout:
			wh
		})

		return this

	},
	pullurl: function() {

		var uslug = this.get("slug")
		// var upage = this.get("page")
		// var uquery = (this.get("query")==null || this.get("query")=="")?"nil":this.get("query")
		var uquery = this.get("query")
		// var ulayers = (this.get("baselayer").length>1)?_.unique(this.get("baselayer")).join():this.get("baselayer")[0]
		var ublayer = this.get("baselayer")
		// var uaoi = this.get("aoi")
		var utime = this.get("time")
		var udownout = this.get("downout")
		// var uactive = (this.get("active")==null || this.get("active")=="")?"nil":this.get("active")
		// var uactive = this.get("active")
// var uactive = this.get("active")
var ubbox = this.get("bbox")

var state = "#" + uslug + "/"
// + upage + "/" + uquery + "/"
+ ublayer + "/"
// + uaoi + "/"
+ udownout + "/"
// + uactive+ "/"
+ utime+ "/"
+ ubbox

return state

		// /pullurl
	}
});