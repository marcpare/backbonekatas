var app = app || {};

(function($){
  var AppView = Backbone.View.extend({
    el: '#todo-app',
    statsTemplate: _.template($('#stats-template').html()),
    events: {
      'keypress #new-todo' : 'updateOnEnter',
      'click #toggle-all' : 'toggleAllComplete',
      'click #clear-completed' : 'clearCompleted'
    },
    
    initialize: function(){
      this.$todos = $('#todos');
      this.$toggleAll = $('#toggle-all')[0];
      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'all', this.render);
      app.todos.fetch();
    },
    
    addOne: function(todo){
      var view = new app.TodoView({model:todo});
      this.$todos.append(view.render().el);
    },
    
    render: function(){
      var completed = app.todos.completed().length;
      if(app.todos.length == completed){
        //this.$toggleAll.addClass('completed');
        //this.$toggleAll.attr('checked', 'checked');
      }else{
        //this.$toggleAll.removeClass('completed');
        //this.$toggleAll.removeAttr('checked');
      }
      var stats = this.statsTemplate({
        'completed': completed,
        'remaining': app.todos.length - completed
      });
      $('#stats').html(stats);
    },
    
    clearCompleted: function(){
      _.invoke(app.todos.completed(), 'destroy');
      // prevent a page reload
      return false;
    },
    
    toggleAllComplete: function(e){
      var completed = this.$toggleAll.checked;
      app.todos.each(function(todo){
        todo.save({
          completed:completed
        });
      });
    },
        
    updateOnEnter: function(e){
      if (e.which == ENTER_KEY){
       var trimmedVal = $('#new-todo').val().trim();
       var todo = new app.Todo({
         title:trimmedVal,
         order:app.todos.nextOrder()
       });
       app.todos.add(todo);
       todo.save();
       $('#new-todo').val('');
      }
    }      
  });
  
  app.AppView = AppView;
  
})(jQuery);