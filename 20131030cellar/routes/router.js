var app = app || {};
(function(){
  var Router = Backbone.Router.extend({
    routes: {
      'wines/page/:page': 'page'
    },
    page: function(index){
      app.currentPage = index;
    }
  });
  app.router = new Router();
  Backbone.history.start();
})();