require([
    "namespace",

    // Libs
    "jquery",
    //"use!jqueryui",
    //"jquerymetadata",
    "use!backbone",
    "mustache",

    // Modules
    "modules/UI"
  ],

  function (namespace, $, Backbone, Mustache, ui) {

    $.metadata.setType('attr', 'data-ga-widget');
    $(ui).widget($(ui).metadata());

    Default = {};
    Default.View = Backbone.View.extend({
      el: $(ui),
      exit: function(_this) {
        return _this.model.models[0].attributes.query.results.json.totalResults < 1;
      },
      render: function (e) {
        var _this = this;
        $.ajax({
          url: this.template
        }).done(function (data) {
          var template = data;
          var data = Mustache.render(template, _this.model.models[0].toJSON());
          $(_this.el).html(data);
        });
        return this;
      },
      initialize: function (options) {
        var _this = this;
        if (_this.exit(_this)) {
          return;
        }
        _.bindAll(this, 'beforeRender', 'render', 'afterRender');
        var _this = this;
        this.render = _.wrap(this.render, function (render) {
          _this.beforeRender();
          render();
          _this.afterRender();
          return _this;
        });
      },
      beforeRender: function () {
        $(this.el).widget('beforeRender');
      },
      afterRender: function () {
        $(this.el).widget('afterRender');
      },
      template: $(ui).widget('defaults').template
    });
    Default.Collection = Backbone.Collection.extend({
      stream: function (options) {
        this.unstream();
        var _update = _.bind(function () {
          this.fetch(options);
          this._intervalFetch = window.setTimeout(_update, options.interval || 2000);
        }, this);
        _update();
      },
      unstream: function () {
        window.clearTimeout(this._intervalFetch);
        delete this._intervalFetch;
      },
      url: $(ui).widget('defaults').url
    });
    Default.Model = new Default.Collection;

    var AppView = Backbone.View.extend({
      el: "body",
      retrieve: function() {
         options = {
          success: function(data) {
            this.render;
          },
          type: 'GET',
          dataType: 'ga.widget',
          url: $(ui).widget('defaults').url,
          data: $(ui).widget('defaults').data,
          converters: {
            'json ga.widget': function(data) {
              data.query.results.json.multiple = data.query.results.json.totalResults > 1;
              return data;
            }
          }
        };
        $.when(Default.Model.fetch(options)).done(function (data) {
          var data = new Default.View({
            model: Default.Model
          });
          data.render();
        });
      },
      initialize: function () {
        this.retrieve();
      }
    });

    var app = namespace.app;

    $(function () {
      app.view = new AppView();
    });

  });