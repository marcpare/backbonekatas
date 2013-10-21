var app = app || {};

(function(){
  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone-20131019'),
    nextOrder: function(){
      if(!this.length){ return 1;}
      return this.last().get('order') + 1;
    },
    comparator: function(todo){ return todo.get('order'); }
  });
  app.todos = new Todos();
})();