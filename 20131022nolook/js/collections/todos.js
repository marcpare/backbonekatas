var app = app || {};

(function(){
  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('mytodos'),
    initialize: function(){
      this.on("add", this.setOrder);
    },
    setOrder: function(todo){
      var nextOrder;
      if(todo.get('order') === -1){
        nextOrder = _.max(this.pluck('order')) + 1;
        todo.set('order', nextOrder);
      }
    },
    comparator: function(todo){
      return todo.order;
    },
    completed: function(){
      return this.where({completed:'completed'}).length;
    }
  });
  app.todos = new Todos();
})();