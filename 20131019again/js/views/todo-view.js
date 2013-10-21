var app = app || {};
(function ($){
  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function(){
     this.$el.html(this.template(this.model.toJSON()));
     this.toggleVisible();
     return this;
    },
    toggleVisible: function(){
     //this.$el.toggleClass('hidden', this.isHidden());
    }
  });
})(jQuery);