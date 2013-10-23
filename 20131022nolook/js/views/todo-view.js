var app = app || {};

(function($){
  var TodoView = Backbone.View.extend({
    tagName: "li",
    render: function(){
      var template = $('#todo-template');
      this.$el.html(_.template(template.html(), this.model.attributes));
      return this;
    }
  });
  
  app.TodoView = TodoView;
})(jQuery);