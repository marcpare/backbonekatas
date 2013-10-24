var app = app || {};

(function($){
  var TodoView = Backbone.View.extend({
    tagName: "li",
    events: {
      'click .check-completed': 'toggleCompleted',
      'click .delete': 'delete'
    },
	  initialize: function(){
	    if(this.model.get('completed')){
	      this.$el.toggleClass('completed');
	    }
	  },
    toggleCompleted: function(){
      this.model.toggleCompleted();
	    this.model.save();
      this.$el.toggleClass('completed');
    },
    delete: function(){
      this.model.destroy();
      this.remove();
    },
    render: function(){
      var template = $('#todo-template');
      this.$el.html(_.template(template.html(), this.model.attributes));
      return this;
    }
  });
  
  app.TodoView = TodoView;
})(jQuery);