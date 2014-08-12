(function() {
  var MastermindView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      return MastermindView.__super__.constructor.apply(this, arguments);
    }

    MastermindView.prototype.template = JST['scripts/templates/Mastermind_template.ejs'];

    MastermindView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    MastermindView.prototype.events = {
      'click [data-id=guess_button]': 'makeGuess'
    };

    MastermindView.prototype.turnNumber = 0;

    MastermindView.prototype.code = '0043';

    MastermindView.prototype.makeGuess = function() {
      var feedback, guess;
      if (this.isValid()) {
        guess = this.$('#guess_input').val();
        feedback = this.getFeedback(guess, this.code);
        if (this.isLose()) {
          feedback = 'Game Over';
        }
        if (this.isWin(guess)) {
          feedback = 'Victory';
          this.$('#reveal').show();
        }
        this.$('[data-id=guess-' + this.turnNumber + ']').html(guess);
        this.$('[data-id=feedback-' + this.turnNumber + ']').html(feedback);
        return this.incrementTurnNumber();
      }
    };

    MastermindView.prototype.isValid = function() {
      return this.$('#mm_form').valid();
    };

    MastermindView.prototype.isLose = function() {
      return this.turnNumber === 9;
    };

    MastermindView.prototype.isWin = function(guess) {
      return guess === this.code;
    };

    MastermindView.prototype.incrementTurnNumber = function() {
      return this.turnNumber++;
    };

    MastermindView.prototype.getFeedback = function(guess, code) {
      var codeChar, codeIndex, guessChar, guessIndex, response, testCode, testGuess, _i, _j, _k, _len, _len1, _len2;
      response = '';
      testGuess = guess.split('');
      testCode = code.split('');
      for (guessIndex = _i = 0, _len = testGuess.length; _i < _len; guessIndex = ++_i) {
        guessChar = testGuess[guessIndex];
        if (testCode[guessIndex] === guessChar) {
          response += 'B';
          testGuess[guessIndex] = 'Q';
          testCode[guessIndex] = 'X';
        }
      }
      for (codeIndex = _j = 0, _len1 = testCode.length; _j < _len1; codeIndex = ++_j) {
        codeChar = testCode[codeIndex];
        for (guessIndex = _k = 0, _len2 = testGuess.length; _k < _len2; guessIndex = ++_k) {
          guessChar = testGuess[guessIndex];
          if (codeChar === guessChar) {
            response += 'W';
            testCode[codeIndex] = 'Y';
            testGuess[guessIndex] = 'Z';
          }
        }
      }
      return response;
    };

    return MastermindView;

  })(Backbone.View);

  window.MastermindView = MastermindView;

}).call(this);
