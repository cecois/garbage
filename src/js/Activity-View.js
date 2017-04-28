var ActivityView = Backbone.View.extend({

	el: $("#mini-console"),
	template: Handlebars.templates['ActivityViewTpl'],
	events: {
		// "click li": function(e) {
		// 	var pid = $(e.currentTarget).attr("data-id")
		// 	appState.set({
		// 		slug: pid
		// 	})
		// }
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		return this.render()
	},
	render: function() {
		console.log("render of actv");
		console.log(this.model.get("msg"));
if(this.model.get("msg")==null)
{
	return this.stfu()
} else {
		$(this.el).html(this.template(this.model.toJSON()))}
		return this
	}
	,stfu: function(){

console.log("stfu of av");
		$(this.el).html("")

		return this
	}
});