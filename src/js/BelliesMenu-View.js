var BelliesMenuView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		
		var slider = document.getElementById('slider');
noUiSlider.create(slider, {
	start: [1398123000000],
	connect: [true, false],
	range: {
		'min': 1398056700000,
		'max': 1398225300000
	}
});
return this
	}
	,render: function(){
				var timz = []

		_.each(this.collection.models,function(R){
			console.log("R",R);
timz.push(moment(R.get("timestamp"), ["MM/DD/YYYY hh:mm:ss A"]).unix())
		})

return this

}
});