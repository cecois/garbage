var AOI = Backbone.Model.extend({
	defaults: {
		type: null,
		aoi:null
	},
	initialize: function() {
		this.listenTo(appState, 'change:aoi', this.detect);
	},
	detect: function(){


if(appState.get("aoi")==null){
	return this
} else {


var aoi = appState.get("aoi")
var aoit=null,aoistr=null;

	switch(aoi) {
		case aoi.match(/[a-z]/i):
		// this.set({type:"alpha",aoi:aoi})
		aoit="alpha";aoistr=aoi
		console.log("aoit,aoistr:");console.log(aoit,aoistr);
			break;
		case "end":
		//do something
			break;
		default:
		console.log("26");
		return this
	}

this.set({type:aoit,aoi:aoistr})

return this
} // aoi null test

	}
});