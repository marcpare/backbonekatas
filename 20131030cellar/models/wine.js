var app = app || {};
(function(){
  app.Wine = Backbone.Model.extend({
    defaults: {
      title: 'No Title',
      varietal: 'No Varietal',
      region: 'No Region'
    }
  });
})();