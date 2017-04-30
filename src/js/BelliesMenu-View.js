var BelliesMenuView = Backbone.View.extend({
	el: $("#slider"),
	events: {
	},
	initialize: function() {
		this.collection.bind('sync', this.render, this);

return this
// .prep()
	}
	,render: function(t){

var timz = _.uniq(_.map(this.collection.models,(m)=>{
	return m.get("ts_as_ts");
})).sort()

var inc=null
	switch(appState.get("slug")) {
		case "baa":
		incv = Config.EVENTS.baa.increment
			break;
		case "animebos":
		incv = Config.EVENTS.animebos.increment
		//do something
			break;
		default:
		return null
	}


var min = _.min(timz)
var max = _.max(timz)
var inc = Math.ceil((max-min)/incv)

console.log("min,max,inc,incv");
console.log(min,max,inc,incv);

var ticks = [min]

var m=min
var i = 0
do {
	var mi =m+inc
	console.log("mi",mi);
    ticks.push(mi)
    m=mi;
	console.log("mi",mi);
    i++
}
while (i < inc);

delete _.last(ticks);

	if(appState.get("time")!=='undefined'){
		var sv= parseInt(appState.get("time"))
		console.log("appstate.time in value func",sv);
		console.log("and ticks");
		console.log(ticks);
	}
	else
		{
			var sv= null
		}

    	var t=[]
		var slider = $(this.el).slider({
    id:"slider"
    ,formatter: (v)=>{return moment(v,['X']).format('dd (Do) hh:ss A')}
    ,ticks_snap_bounds:inc/2
    ,ticks: _.uniq(ticks)
    ,tooltip:"show"
    ,value:sv
    })
		.on('change',(v)=>{
	var t = [_.min(ticks),v.value.newValue]
	appBelliesView.render()
})


		return this
	}
	,prep: function(){

return this

}
,bind:function(){


	return this
}
});
