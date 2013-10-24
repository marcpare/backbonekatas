var app = app || {};

(function(){
  var Todo = Backbone.Model.extend({
    defaults: {
      "title": "",
      "completed": "",
      "order": -1
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