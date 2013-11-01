var app = app || {};
(function($){
  app.PaginateControl = Backbone.View.extend({
    el: '#paginate',
    template: _.template($('#paginate-template').html()),
    // how many items? (app.wines)
    render: function(){
      var itemsPerPage = 2;
      var pageCount = Math.ceil(app.wines.length / itemsPerPage);
      this.$el.html(this.template({active:0, pageCount:pageCount}));
    }
  });
})(jQuery);