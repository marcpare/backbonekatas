var app = app || {};

(function(){
  var Todo = Backbone.Model.extend({
    defaults: {
      "title": "",
      "completed": "completed"
    }
  });
  
  app.Todo = Todo;
})();