var app = app || {};

(function($){
  var AppView = Backbone.View.extend({
    /*
    events: {
      'keypress new-todo' : 'updateOnEnter'
    },
    */
    id: 'todo-app',
    initialize: function(){
      this.$todos = $('#todos');
      this.listenTo(app.todos, 'add', this.addOne);
    },
    
    addOne: function(todo){
      var view = new app.TodoView({model:todo});
      this.$todos.append(view.render().el);
    },
    
    render: function(){
      console.log('going to render the app');
      console.log(this);
      this.$todos.html('rendering');
    }      
  });
  
  app.AppView = AppView;
  
})(jQuery);