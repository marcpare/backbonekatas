var app = app || {};

(function($){
  var TodoView = Backbone.View.extend({
    tagName: "li",
    events: {
      'click .check-completed': 'toggleCompleted',
      'click .delete': 'delete'
    },
    toggleCompleted: function(){
      this.model.toggleCompleted();
      this.$el.toggleClass('completed');
    },
    delete: function(){
      app.todos.remove(this.model);
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