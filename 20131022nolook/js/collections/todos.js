var app = app || {};

(function(){
  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('mytodos'),
    initialize: function(){
      this.on("add", this.setOrder);
    },
    nextOrder: function(todo){
      // this shouldn't work because 'order' is not a property
      // return _.max(this.pluck('order')) + 1;
      if(!this.length){ return 1; }
      return this.last().get('order') + 1;
    },
    comparator: function(todo){
      return todo.order;
    },
    completed: function(){
      return this.filter(function(todo){return todo.get('completed');});
    },
    remaining: function(){
      return this.without.apply(this, this.completed());
    }
  });
  app.todos = new Todos();
})();