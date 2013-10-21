var app = app || {};
(function(){
  'use strict';
  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    completed: function(){
      return this.filter(function(todo){
        return todo.get('completed');
      });
    },
    remaining: function(){
      /* uses apply because completed() returns a list which we want to expand */
      return this.without.apply(this, this.completed());      
    },
    nextOrder: function(){
     if(!this.length){
       return 1;
      }
      return this.last().get('order') + 1; 
    },
    comparator: function(todo){
      return todo.get('order');
    }
  });
  app.todos = new Todos();
})();