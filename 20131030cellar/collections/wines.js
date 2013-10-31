var app = app || {};
(function(){
  var Wines = Backbone.Collection.extend({
    model: app.Wine
  });
  
  app.wines = new Wines();
})();