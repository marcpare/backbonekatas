var app = app || {};
(function($){
  app.AppView = Backbone.View.extend({
    el: '#todoapp',
    statsTemplate: _.template($('#stats-template').html()),
    events: {
     'keypress #new-todo': 'createOnEnter',
     'click #toggle-all': 'toggleAllComplete',
     'click #clear-completed': 'clearCompleted'
    },
    initialize: function(){
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$main = this.$('#main');
      this.$footer = this.$('#footer');
      this.$input = this.$('#new-todo');
      
      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'reset', this.addAll);
      this.listenTo(app.todos, 'filter', this.filterAll);
      this.listenTo(app.todos, 'all', this.render);

      app.todos.fetch({reset: true});
    },
    render: function(){
      var completed = app.todos.completed().length;
      var remaining = app.todos.remaining().length;
      if (app.todos.length){
       this.$main.show();
       this.$footer.show();
       this.$footer.html(this.statsTemplate({
         completed: completed,
         remaining: remaining
       }));
      }else{
        this.$main.hide();
        this.$footer.hide();
      }
    },
    createOnEnter: function(e){
      if (e.which !== ENTER_KEY || !this.$input.val().trim()){ return; }
      
      // where does todos come from? it comes from collection/todos
      // it's an instantiated collection, added to the global app
      app.todos.create(this.newAttributes());
      this.$input.val('');
    },
    newAttributes: function(){
      return {
        title: this.$input.val().trim(),
        order: app.todos.nextOrder(),
        completed: false
      };
    },
    addOne: function(todo){
     var view = new app.TodoView({model: todo});
     $('#todo-list').append(view.render().el);
    },
    addAll: function(){
     this.$('#todo-list').html('');
     app.todos.each(this.addOne, this); 
    },
    toggleAllComplete: function(){
      var completed = this.allCheckbox.checked;
      app.todos.each(function(todo){
        todo.set('completed', completed);
        todo.save();
      });
    },
    clearCompleted: function(){
     _.invoke(app.todos.completed(), 'destroy');     
     return false;
    },
    filterOne: function(todo){
      todo.trigger('visible');
    },
    filterAll: function(){
      app.todos.each(this.filterOne);
    }
  });
})(jQuery);