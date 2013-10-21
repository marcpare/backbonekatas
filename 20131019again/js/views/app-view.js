var app = app || {};
(function($){
  app.AppView = Backbone.View.extend({
    el: '#todoapp',
    statsTemplate: _.template($('#stats-template').html()),
    events: {
     'keypress #new-todo': 'createOnEnter'
    },
    initialize: function(){
      this.$main = this.$('#main');
      this.$footer = this.$('#footer');
      this.$input = this.$('#new-todo');
      
      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'reset', this.addAll);
      this.listenTo(app.todos, 'all', this.render);
      
      console.log(app.todos);
      //app.todos.fetch({reset: true});
    },
    render: function(){
      if (app.todos.length){
       this.$main.show();
       this.$footer.show();
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
      console.log(app);
      console.log(app.TodoView);
     var view = new app.TodoView({model: todo});
     $('#todo-list').append(view.render().el);
    },
    addAll: function(){
     this.$('#todo-list').html('');
     app.todos.each(this.addOne, this); 
    }
  });
})(jQuery);