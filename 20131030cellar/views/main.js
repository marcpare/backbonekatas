var app = app || {};
(function(){
  app.MainView = Backbone.View.extend({
    el: '#wines',
    initialize: function(){ 
      console.log('main view ready'); 
      this.listenTo(app.wines, 'add', this.addWine);
    },
    addWine: function(wine){
      console.log('adding a wine');
      console.log(wine);
      var wineView = new app.WineView({model:wine});
      wineView.render();
      this.$el.append(wineView.el);
    },
    render: function(){
      
    }
  });
})();