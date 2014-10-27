(function() {
  var GuessInputView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GuessInputView = (function(_super) {
    __extends(GuessInputView, _super);

    function GuessInputView() {
      this.guessSuccessCallback = __bind(this.guessSuccessCallback, this);
      _ref = GuessInputView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GuessInputView.prototype.template = JST['app/scripts/templates/Guess_input.ejs'];

    GuessInputView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    GuessInputView.prototype.events = {
      'click [data-id=guess-button]': 'makeGuess'
    };

    GuessInputView.prototype.isValid = function() {
      this.$("[data-id=mm-form]").validate({
        rules: {
          guessInput: {
            required: true,
            minlength: 4,
            maxlength: 4,
            digits: true
          }
        }
      });
      return this.$('[data-id=mm-form]').valid();
    };

    GuessInputView.prototype.getGuess = function() {
      return this.$("[data-id=guessInput]").val();
    };

    GuessInputView.prototype.makeGuess = function() {
      var _this = this;
      if (this.isValid()) {
        return $.ajax({
          url: "api/game/" + this.options.gameDTO.Id,
          type: 'PUT',
          data: {
            "guess": this.getGuess()
          },
          success: function(responseData, responseText) {
            return _this.guessSuccessCallback(responseData);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            return console.log(textStatus, errorThrown);
          }
        });
      }
    };

    GuessInputView.prototype.guessSuccessCallback = function(mastermindGame) {
      return this.trigger('makeGuess', mastermindGame);
    };

    return GuessInputView;

  })(Backbone.View);

  window.GuessInputView = GuessInputView;

}).call(this);
