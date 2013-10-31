var app = app || {};
(function(){
  var Router = Backbone.Router.extend({
    routes: {
      'wines/page/:page': 'page'
    },
    page: function(index){
      console.log('triggering paginate');
      app.currentPage = index;
    }
  });
  app.router = new Router();
  Backbone.history.start();
})();