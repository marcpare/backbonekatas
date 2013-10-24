var app = app || {};

(function($){
  var AppView = Backbone.View.extend({
    
    el: '#todo-app',
    
    events: {
      'keypress #new-todo' : 'updateOnEnter'
    },
    
    initialize: function(){
      this.statsTemplate = $('#stats-template');
      this.$todos = $('#todos');
      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'add', this.render);
      this.listenTo(app.todos, 'change:completed', this.render);
      this.listenTo(app.todos, 'remove', this.render);
      app.todos.fetch();
    },
    
    addOne: function(todo){
      var view = new app.TodoView({model:todo});
      this.$todos.append(view.render().el);
    },
    
    render: function(){
      var completed = app.todos.completed();
      var stats = _.template(this.statsTemplate.html(), {
        'completed': completed,
        'remaining': app.todos.length - completed
      });
      $('#stats').html(stats);
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