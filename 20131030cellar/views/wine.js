var app = app || {};
(function($){
  app.WineView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.wineTemplate = _.template($('#wine-template').html());
    },
    render: function(){
      this.$el.html(this.wineTemplate(this.model.attributes));
      return this;
    }    
  });
})(jQuery);