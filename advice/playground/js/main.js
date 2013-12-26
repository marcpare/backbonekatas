require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
  }
});

require([
  'backbone',
  'advice'
], function (Backbone, Advice) {
  
  // Advice add mixins to Backbone in module definition.
  
  var namer = function (options) {
    this.clobber({
      initialize: function () {
        this.spoke = options.times || 0;
      }
    });
    this.setDefaults({
      name: 'frank',
      getName: function () {
        return this.name;
      },
      speak: function () {
        console.log('hello ' + this.getName());
      }
    });
    this.around('getName', function (orig) {
      return orig().split(' ')[0];
    });
    this.addToObj({
      events: {
        'greeted': 'speak'
      }
    });
    this.before('speak', function () {
      this.spoke++;
    });
    this.after('speak', function () {
      console.log('for the ' + this.spoke + ' th time');
    });
  }
  
  var Speaker = Backbone.View.extend({
    name: 'Bob White'
  }).mixin([
    namer
  ], {
    times: 3
  });
  var bob = new Speaker();
  bob.speak();
});







