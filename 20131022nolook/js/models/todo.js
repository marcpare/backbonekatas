var app = app || {};

(function(){
  var Todo = Backbone.Model.extend({
    defaults: {
      "title": "",
      "completed": ""
    },
    toggleCompleted: function(){
     if(this.completed){
       this.completed = '';
     }else{
       this.completed = 'completed';
     }
    }
  });
  
  app.Todo = Todo;
})();