(function() {
  var MastermindView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      this.guessCallback = __bind(this.guessCallback, this);
      return MastermindView.__super__.constructor.apply(this, arguments);
    }

    MastermindView.prototype.template = JST['scripts/templates/Mastermind_template.ejs'];

    MastermindView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    MastermindView.prototype.events = {
      'click [data-id=guess_button]': 'makeGuess',
      'click [data-id=reset-button]': 'reset'
    };

    MastermindView.prototype.turnNumber = 0;

    MastermindView.prototype.guess = "";

    MastermindView.prototype.getCode = function() {
      return this.model.get("code");
    };

    MastermindView.prototype.makeGuess = function() {
      if (this.isValid()) {
        this.guess = this.$('#guess_input').val();
        this.$('[data-id=guess-' + this.turnNumber + ']').html(guess);
        return $.get("api/game/7", {
          'guess': this.guess,
          'code': this.getCode()
        }, this.guessCallback);
      }
    };

    MastermindView.prototype.guessCallback = function(a, b, c) {
      var feedback;
      feedback = a;
      if (this.isLose()) {
        feedback = this.gameOver();
      }
      if (this.isWin()) {
        feedback = this.victory();
      }
      return this.updateBoard(feedback);
    };

    MastermindView.prototype.isValid = function() {
      return this.$('#mm_form').valid();
    };

    MastermindView.prototype.isLose = function() {
      return this.turnNumber === 9;
    };

    MastermindView.prototype.gameOver = function() {
      var feedback;
      this.$('[data-id=guess_button]').prop('disabled', true);
      return feedback = 'Game Over ' + this.getCode();
    };

    MastermindView.prototype.isWin = function() {
      return this.guess === this.getCode();
    };

    MastermindView.prototype.victory = function() {
      var feedback;
      this.$('[data-id=guess_button]').prop('disabled', true);
      return feedback = 'Victory';
    };

    MastermindView.prototype.updateBoard = function(feedback) {
      this.$('[data-id=guess-' + this.turnNumber + ']').html(this.guess);
      this.$('[data-id=feedback-' + this.turnNumber + ']').html(feedback);
      return this.incrementTurnNumber();
    };

    MastermindView.prototype.incrementTurnNumber = function() {
      return this.turnNumber++;
    };

    MastermindView.prototype.reset = function() {
      this.resetBoard();
      return this.newCode();
    };

    MastermindView.prototype.resetBoard = function() {
      this.$('[data-id=guess_button]').prop('disabled', false);
      this.$('.guess').empty();
      this.$('.feedback').empty();
      return this.turnNumber = 0;
    };

    MastermindView.prototype.newCode = function() {
      var cg;
      cg = new CodeGenerator();
      return this.model.set({
        code: cg.createCode().join("")
      });
    };

    return MastermindView;

  })(Backbone.View);

  window.MastermindView = MastermindView;

}).call(this);
