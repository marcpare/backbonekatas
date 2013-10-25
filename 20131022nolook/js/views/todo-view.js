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
      this.listenTo(this.model, 'change:completed', this.renderCompleted);
	  },
    renderCompleted: function(){
      this.model.save();
      this.$el.toggleClass('completed');
      this.render();
    },
    toggleCompleted: function(){
      this.model.toggleCompleted();
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