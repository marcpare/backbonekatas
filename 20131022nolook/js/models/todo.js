var app = app || {};

(function(){
  app.Todo = Backbone.Model.extend({
    defaults: {
      title: "",
      completed: false,
      order: -1
    },
    toggleCompleted: function(){
      this.save({completed:!this.get('completed')});
    }
  });  
})();