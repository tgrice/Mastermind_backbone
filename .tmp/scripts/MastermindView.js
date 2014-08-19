(function() {
  var MastermindView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      this.foobar = __bind(this.foobar, this);
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

    MastermindView.prototype.getCode = function() {
      return this.model.get("code");
    };

    MastermindView.prototype.makeGuess = function() {
      var feedback, guess;
      if (this.isValid()) {
        guess = this.$('#guess_input').val();
        $.get("api/game/7", {
          'guess': guess
        }, this.foobar);
        if (this.isLose()) {
          feedback = this.gameOver();
        }
        if (this.isWin(guess)) {
          feedback = this.victory();
        }
        return this.updateBoard(guess, feedback);
      }
    };

    MastermindView.prototype.foobar = function(a, b, c) {
      return console.log('running!');
    };

    MastermindView.prototype.isValid = function() {
      return this.$('#mm_form').valid();
    };

    MastermindView.prototype.getFeedback = function(guess, code) {
      var response, testCode, testGuess;
      response = '';
      testGuess = guess.split('');
      testCode = code.split('');
      response += this.checkNumberAndPosition(testGuess, testCode, response);
      return this.checkJustNumber(testGuess, testCode, response);
    };

    MastermindView.prototype.checkNumberAndPosition = function(testGuess, testCode, response) {
      var guessChar, guessIndex, _i, _len;
      for (guessIndex = _i = 0, _len = testGuess.length; _i < _len; guessIndex = ++_i) {
        guessChar = testGuess[guessIndex];
        if (testCode[guessIndex] === guessChar) {
          testGuess[guessIndex] = 'Q';
          testCode[guessIndex] = 'X';
          response += 'B';
        }
      }
      return response;
    };

    MastermindView.prototype.checkJustNumber = function(testGuess, testCode, response) {
      var codeChar, codeIndex, guessChar, guessIndex, _i, _j, _len, _len1;
      for (codeIndex = _i = 0, _len = testCode.length; _i < _len; codeIndex = ++_i) {
        codeChar = testCode[codeIndex];
        for (guessIndex = _j = 0, _len1 = testGuess.length; _j < _len1; guessIndex = ++_j) {
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

    MastermindView.prototype.isLose = function() {
      return this.turnNumber === 9;
    };

    MastermindView.prototype.gameOver = function() {
      var feedback;
      this.$('[data-id=guess_button]').prop('disabled', true);
      return feedback = 'Game Over ' + this.getCode();
    };

    MastermindView.prototype.isWin = function(guess) {
      return guess === this.getCode();
    };

    MastermindView.prototype.victory = function() {
      var feedback;
      this.$('[data-id=guess_button]').prop('disabled', true);
      return feedback = 'Victory';
    };

    MastermindView.prototype.updateBoard = function(guess, feedback) {
      this.$('[data-id=guess-' + this.turnNumber + ']').html(guess);
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
