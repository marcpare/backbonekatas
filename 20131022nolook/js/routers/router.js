var app = app || {};
(function(){
  var TodoRouter = Backbone.Router.extend({
    routes: {
      "*filter" : 'filterTodos'
    },
    filterTodos: function(filter){
//      if(app.appView){
        app.todoFilter = filter; /* all, completed */ 
        app.todos.trigger('filter');
//      }
    }
  });
  
  app.TodoRouter = new TodoRouter();
  Backbone.history.start();
})();