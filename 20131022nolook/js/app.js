$(function(){
  var appView = new app.AppView();
  var testtodo = new app.Todo({title: 'foo', completed: ''});
  
  console.log(testtodo);
  
  app.todos.add(testtodo);
  app.todos.add(new app.Todo({title: 'bar', completed: ''}));
  console.log(app.todos);
  
  // render it
  /*
  var testtodoview = new app.TodoView({model:testtodo});
  console.log(testtodoview);
  console.log(testtodoview.render());
  */
});