var StateView = Backbone.View.extend({

	el: $("body"),
	events: {
		"click #paneToggler-split": "downout"
		,"click #paneToggler-down": "downout"
		,"keydown": "downout"

	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render)
			// this.listenTo(map, 'moveend', this.bboxup);
			return this
		}
		,downout: function(e) {
			// console.log(e)
			// return this
			// console.log(e)
			var target=null
			// if(typeof e == 'object'){
				if(e.type == 'click'){
					e.preventDefault();
					target = $(e.currentTarget).attr("id").split("-")[1]
				} else {


					switch (e.keyCode) {
						case 18:
						target = 'down'
						break;
						case 17:
						target = 'split'
						break;
						default:
						target = null
					}

					// if(e.keyCode==18){target='down'} else if(e.keyCode==17){target='split';
				}


// override if the same state was requested (in effect resetting)
if(this.model.get("downout")==target){
	target = "out"
}

			// this.model.toggle("split")
			if(this.model.get("downout")!==target && target!==null){
				this.model.set({downout:target})}

				return this

			},
		// bboxup: function() {

		// 	var bbox = map.getBounds().toBBoxString()

		// 	if (bbox !== this.model.get("bbox")) {
		// 		this.model.set({
		// 			bbox: bbox
		// 		})
		// 		appDLEX.set({
		// 			bbox: bbox
		// 		})
		// 	}

		// 	return this

		// },
		render: function(a) {

			switch (this.model.get("downout")) {
				case "down":
				$("#paneContainer").removeClass('split');
				$(".homeli").removeClass('split'); //gross but bootstrap responsive didn't work on these manual resizes
				$(".hit-wrapper").removeClass('split'); //gross but bootstrap responsive didn't work on these manual resizes
				$("#paneContainer").addClass('down');

				$("#paneToggler-down").addClass('down');
				$("#paneToggler-split").removeClass('split');
				break;
				case "split":
				$("#paneContainer").removeClass('down');
				$("#paneContainer").addClass('split');
				$(".homeli").addClass('split'); //gross but bootstrap responsive didn't work on these manual resizes
				$(".hit-wrapper").addClass('split'); //gross but bootstrap responsive didn't work on these manual resizes

				$("#paneToggler-down").removeClass('down');
				$("#paneToggler-split").addClass('split');
				break;
				case null:

				break;
				default:
				$("#paneContainer").removeClass('down');
				$("#paneToggler-down").removeClass('down');
				$("#paneContainer").removeClass('split');
				$("#paneToggler-split").removeClass('split');
				$(".homeli").removeClass('split'); //gross but bootstrap responsive didn't work on these manual resizes
				$(".hit-wrapper").removeClass('split'); //gross but bootstrap responsive didn't work on these manual resizes
			}

			$(document).attr("title", "Big Bellies Atlas - 2014: " + appState.get("slug"));

			return this

		}

	});