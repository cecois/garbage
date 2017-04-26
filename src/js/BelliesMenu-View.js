var BelliesMenuView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		
		var slider = document.getElementById('slider');
noUiSlider.create(slider, {
	start: [1398123000000],
	connect: [true, false]
	,tooltips:true
	,step: 3600
	,range: {
		'min': 1398056700000,
		'max': 1398225300000
	}
})
// .on('update',(e)=>{console.log(e);});

return this
	}
	,render: function(){
				var timz = []

		_.each(this.collection.models,function(R){
			// console.log("R",R);
// timz.push(moment(R.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix())
		})

return this

}
});
