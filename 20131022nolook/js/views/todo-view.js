var app = app || {};

(function($){
  var TodoView = Backbone.View.extend({
    tagName: "li",
    events: {
      'click .check-completed': 'toggleCompleted',
      'click .delete': 'delete',
      'dblclick .todo-title' : 'openEdit',
      'blur .edit-box' : 'closeEdit',
      'keypress .edit-box' : 'closeOnEnter'
    },
	  initialize: function(){
      
	    if(this.model.get('completed')){
	      this.$el.toggleClass('completed');
	    }
      this.listenTo(this.model, 'change:completed', this.renderCompleted);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
      this.listenTo(this.model, 'all', this.render);

	  },
    isHidden: function(){
      var completed = this.model.get("completed");
      return (app.todoFilter === 'completed' && completed);
    },
    toggleVisible: function(){
      this.$el.toggleClass('hidden', this.isHidden());
    },
    openEdit: function(){
      this.$el.toggleClass('edit');
      $('.edit-box', this.$el).focus();
    },
    closeOnEnter: function(e){
      if(e.which == ENTER_KEY){
        this.closeEdit.apply(this);
      }
    },
    closeEdit: function(){
      var $editBox = $('.edit-box', this.$el);
      this.model.save({title:$editBox.val()});
      this.$el.removeClass('edit');
    },
    renderCompleted: function(){
      this.model.save();
      this.$el.toggleClass('completed', this.model.get('completed'));
    },
    toggleCompleted: function(){
      this.model.toggleCompleted();
    },
    delete: function(){
      this.model.destroy();
    },
    render: function(){
      var todoTemplate = _.template($('#todo-template').html());
      this.$el.html(todoTemplate(this.model.attributes));
      this.toggleVisible();
      return this;
    }
  });
  
  app.TodoView = TodoView;
})(jQuery);