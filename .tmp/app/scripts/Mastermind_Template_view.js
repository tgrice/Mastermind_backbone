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
      this.$el.html(this.template());
      this.renderGameSetup();
      return this;
    };

    Mastermind_Template_View.prototype.renderGameSetup = function() {
      var gameSetup;
      gameSetup = new GameSetupView();
      this.listenTo(gameSetup, 'triggerStartGame', this.renderGameBoard);
      return this.$('[data-id=game-setup]').html(gameSetup.render().el);
    };

    Mastermind_Template_View.prototype.renderGameBoard = function(turns) {
      this.boardView = new BoardView({
        turns: turns
      });
      this.$('[data-id=game-board]').html(this.boardView.render().el);
      return this.newGame(turns);
    };

    Mastermind_Template_View.prototype.newGame = function(turns) {
      var _this = this;
      return $.ajax({
        url: "api/CreateGame",
        type: "POST",
        data: {
          turns: turns
        },
        success: function(responseData, responseText) {
          return _this.createGameSuccessCallback(responseData);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return console.log(jqXHR.responseText);
        }
      });
    };

    Mastermind_Template_View.prototype.createGameSuccessCallback = function(mastermindGame) {
      return this.renderGameInput(mastermindGame);
    };

    Mastermind_Template_View.prototype.renderGameInput = function(gameDTO) {
      var guessInput;
      guessInput = new GuessInputView({
        boardView: this.boardView,
        gameDTO: gameDTO
      });
      this.listenTo(guessInput, 'makeGuess', this.updateGameStatus());
      return this.$('[data-id=game-input]').html(guessInput.render().el);
    };

    Mastermind_Template_View.prototype.updateGameStatus = function(mastermindGame) {
      this.updateBoardView(mastermindGame);
      return this.isGameOver(mastermindGame);
    };

    Mastermind_Template_View.prototype.updateBoardView = function(mastermindGame) {
      this.boardView.addGuess(mastermindGame.turnNumber, mastermindGame.guess);
      return this.boardView.addFeedback(mastermindGame.turnNumber, mastermindGame.gameFeedback);
    };

    Mastermind_Template_View.prototype.isGameOver = function(mastermindGame) {
      if (mastermindGame.isLoss === true || mastermindGame.isWin === true) {
        return this.$('[data-id=guess-button]').attr('disabled', true);
      }
    };

    return Mastermind_Template_View;

  })(Backbone.View);

  window.Mastermind_Template_View = Mastermind_Template_View;

}).call(this);
