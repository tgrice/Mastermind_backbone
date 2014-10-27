(function() {
  var GuessInputView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GuessInputView = (function(_super) {
    __extends(GuessInputView, _super);

    function GuessInputView() {
      _ref = GuessInputView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GuessInputView.prototype.template = JST['app/scripts/templates/Guess_input.ejs'];

    GuessInputView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    GuessInputView.prototype.events = {
      'click [data-id=guess-button]': 'validate'
    };

    GuessInputView.prototype.validate = function() {
      this.$("[data-id=mm-form]").validate({
        rules: {
          guess_input: {
            required: true,
            minlength: 4,
            maxlength: 4,
            digits: true
          }
        }
      });
      return this.$('[data-id=mm-form]').valid();
    };

    return GuessInputView;

  })(Backbone.View);

  window.GuessInputView = GuessInputView;

}).call(this);
