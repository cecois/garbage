var BelliesMenuView = Backbone.View.extend({
	el: $("#slider-container"),
	events: {
	},
	initialize: function() {
		// this.collection.bind('sync', this.destroy, this);
		// this.collection.bind('reset', this.render, this);
		this.listenTo(this.collection, "reset", this.render);
		// this.listenTo(appState, "change:time", this.render);

		return this
// .prep()
}
,render: function(t){
	if(appState.get("slug")=="home" || appState.get("slug")=="about"){

		// $(this.el).html('')
		$(this.el).find("#slider").html('')

	} //slug check
	else{

		var timz = _.uniq(_.map(this.collection.models,(m)=>{
			return m.get("ts_as_ts");
		})).sort()

		var inc=null
		switch(appState.get("slug")) {
			case "baa":
			incv = Config.EVENTS.baa.increment
			break;
			case "home":
			incv = Config.EVENTS.baa.increment
			break;
			case "about":
			incv = Config.EVENTS.baa.increment
			break;
			case "animebos":
			incv = Config.EVENTS.animebos.increment
			break;
			case "riot":
			incv = Config.EVENTS.riot.increment
			break;
			case "boscalling":
			incv = Config.EVENTS.boscalling.increment
			break;
			default:
			return null
		}


		var min = _.min(timz)
		var max = _.max(timz)
		var inc = Math.ceil((max-min)/incv)

		var ticks = [min]

		var m=min
		var i = 0
		do {
			var mi =m+incv
			ticks.push(mi)
			m=mi;
			i++
		}
		while (i < inc);

		if(appState.get("time")!=='undefined' && appState.get("time")!==null){
			var sv= parseInt(appState.get("time"))
		}
		else
		{
			var sv= min
		}


		var t=[]


		var slider = $(this.el).find("#slider").slider({
			id:"slider"
			,formatter: (v)=>{return moment(v,['X']).format('dd (Do) hh:ss A')}
			,ticks_snap_bounds:incv/2
			,ticks: _.uniq(ticks)
			,tooltip:"show"
			,value:sv
		})
		.on('change',(v)=>{
			appState.set({time:parseInt(v.value.newValue)})
		})

	}


	return this
}
,prep: function(){

	return this

}
,bind:function(){


	return this
}
});
