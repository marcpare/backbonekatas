var app = app || {};

(function($){
  var AppView = Backbone.View.extend({
    
    el: '#todo-app',
    
    events: {
      'keypress #new-todo' : 'updateOnEnter'
    },
    
    initialize: function(){
      this.$todos = $('#todos');
      this.listenTo(app.todos, 'add', this.addOne);
      app.todos.fetch();
    },
    
    addOne: function(todo){
      var view = new app.TodoView({model:todo});
      this.$todos.append(view.render().el);
    },
    
    render: function(){
    },
    
    toggleCompleted: function(e){
    },
    
    updateOnEnter: function(e){
      if (e.which == ENTER_KEY){
       var trimmedVal = $('#new-todo').val().trim();
       var todo = new app.Todo({title:trimmedVal});
       app.todos.add(todo);
       todo.save();
       $('#new-todo').val('');
      }
    }      
  });
  
  app.AppView = AppView;
  
})(jQuery);