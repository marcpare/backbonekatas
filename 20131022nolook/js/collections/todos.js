var app = app || {};

(function(){
  var Todos = Backbone.Collection.extend({
    model: app.Todo
  });
  app.todos = new Todos();
})();