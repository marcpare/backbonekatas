var app = app || {};
$(function(){
  app.appView = new app.MainView();
  
  /* Add some dummy wines */
  app.wines.add({title:'taste test wine'});
  app.wines.add({title:'taste test wine 2'});
  app.wines.add({title:'taste test wine 3'});
});