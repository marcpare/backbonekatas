var app = app || {};
(function ($){
  app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {
      'dblclick label': 'edit',
      'blur .edit': 'close',
      'keypress .edit': 'updateOnEnter',
      'click .destroy': 'clear',
      'click .toggle': 'toggleCompleted'
    },
    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    render: function(){
     this.$el.html(this.template(this.model.toJSON()));
     this.$el.toggleClass('completed', this.model.get('completed'));
     this.$input = this.$('.edit');
     this.toggleVisible();
     return this;
    },
    toggleVisible: function(){
      this.$el.toggleClass('hidden', this.isHidden());
    },
    isHidden: function(){
      var isCompleted = this.model.get('completed');
      return (
        (!isCompleted && app.TodoFilter === 'completed') ||
        (isCompleted && app.TodoFilter === 'active')
      );
    },
    edit: function(){
     this.$el.addClass('editing');
     this.$input.focus();
    },
    close: function(){
     var trimmedValue = this.$input.val().trim();
     this.$input.val(trimmedValue);
     if(trimmedValue){
      this.model.save({title: trimmedValue});
     }else{
       this.clear();
     }
     this.$el.removeClass('editing');
    },
    clear: function(){
     this.model.destroy();
    },
    updateOnEnter: function(e){
     if(e.which === ENTER_KEY){
      this.close();
     }
    },
    toggleCompleted: function(){
     this.model.toggle();
    }
  });
})(jQuery);