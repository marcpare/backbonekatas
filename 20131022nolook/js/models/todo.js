var app = app || {};

(function(){
  var Todo = Backbone.Model.extend({
    defaults: {
      "title": "",
      "completed": "",
      "order": -1
    },
    completed: function(){
      return this.get('completed') === 'completed';
    },
    toggleCompleted: function(){
      if(this.get('completed')){
        this.set('completed', '');
      }else{
        this.set('completed', 'completed');
      }
    }
  });
  
  app.Todo = Todo;
})();