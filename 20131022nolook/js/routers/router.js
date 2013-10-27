var app = app || {};
(function(){
  app.Router = Backbone.Router.extend({
    routes: {
      "completed" : 'filterCompleted'
    },
    filterCompleted: function(){
      if(app.appView){
        console.log(app.appView);
        app.appView.filterCompleted.call(app.appView);
      }
    }
  });
  
  app.router = new app.Router();
  Backbone.history.start();
})();