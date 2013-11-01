var app = app || {};
(function(){
  app.MainView = Backbone.View.extend({
    el: '#wines',
    events: {
      'gotoPage': 'render'
    },
    initialize: function(){ 
      this.listenTo(app.wines, 'add', this.render);
    },
    addWine: function(wine){
    },
    render: function(){
      // render all the wine views
      this.$el.html('');
      app.wines.each(function(wine){
        var wineView = new app.WineView({model:wine});
        wineView.render();
        this.$el.append(wineView.el);
      }, this);
      // paginate control
      var pager = new app.PaginateControl();
      pager.render();
    }
  });
})();