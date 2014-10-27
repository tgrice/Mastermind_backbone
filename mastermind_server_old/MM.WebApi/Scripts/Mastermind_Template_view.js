(function() {
  var Mastermind_Template_View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mastermind_Template_View = (function(_super) {
    __extends(Mastermind_Template_View, _super);

    function Mastermind_Template_View() {
      _ref = Mastermind_Template_View.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Mastermind_Template_View.prototype.template = JST['app/scripts/templates/Mastermind_template.ejs'];

    Mastermind_Template_View.prototype.render = function() {
      return this.renderGameSetup();
    };

    Mastermind_Template_View.prototype.renderGameSetup = function() {
      this.gameSetup = new GameSetupView();
      this.$('[data-id=game-setup]').html(this.gameSetup.render().el);
      return this.gameSetup.on('startGame', function(turns) {
        return this.renderGameBoard(turns);
      });
    };

    Mastermind_Template_View.prototype.renderGameBoard = function(size) {
      var board;
      board = new Board();
      return this.$('[data-id=game-board]').html(board.build(size).el);
    };

    Mastermind_Template_View.prototype.renderGameInput = function() {
      this.guessInput = new GuessINputView();
      this.$('[data-id=guess-input]').html(guessInput.render().el);
      return this.guessInput.on('makeGuess', function(guess) {
        return this.MakeGuess(guess);
      });
    };

    Mastermind_Template_View.prototype.makeGuess = function(guess) {};

    return Mastermind_Template_View;

  })(Backbone.View);

}).call(this);
