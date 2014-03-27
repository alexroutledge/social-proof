define([
    "namespace",
    "use!backbone"
  ],

  function (namespace, Backbone) {

    $.widget('ga.widget', {
      afterRender: function () {
        var _this = this;
        _this.element.fadeIn('slow');
        var deferred = $.Deferred();
        setTimeout(deferred.resolve, 5000);
        deferred.done(function () {
          _this.element.fadeOut("slow");
        });
      },
      beforeRender: function () {
        var _this = this;
        _this.element.hide();
      },
      defaults: function () {
        return this.options;
      },
      _create: function () {
      },
      destroy: function () {
        $.Widget.prototype.destroy.call(this);
      }
    });

    return $('[data-ga-widget]');

  });