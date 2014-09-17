(function() {
  var MastermindView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      this.updateTurnNumber = __bind(this.updateTurnNumber, this);
      this.updateFeedback = __bind(this.updateFeedback, this);
      this.guessSuccessCallback = __bind(this.guessSuccessCallback, this);
      _ref = MastermindView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MastermindView.prototype.template = JST['app/scripts/templates/Mastermind_template.ejs'];

    MastermindView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    MastermindView.prototype.events = {
      'click [data-id=guess-button]': 'makeGuess',
      'click [data-id=reset-button]': 'reset'
    };

    MastermindView.prototype.makeGuess = function() {
      var _this = this;
      if (this.isValid()) {
        this.setGuessToModel();
        return $.ajax({
          url: "api/game/" + (this.model.get("id")),
          type: 'PUT',
          data: {
            "guess": this.model.get("guess")
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

    MastermindView.prototype.isValid = function() {
      return this.$('[data-id=mm-form]').valid();
    };

    MastermindView.prototype.setGuessToModel = function() {
      return this.model.set("guess", this.$('[data-id=guess-input]').val());
    };

    MastermindView.prototype.guessSuccessCallback = function(mastermindGame) {
      this.updateFeedback(mastermindGame);
      this.updateBoard();
      this.updateTurnNumber(mastermindGame);
      return this.isGameOver();
    };

    MastermindView.prototype.updateFeedback = function(mastermindGame) {
      return this.model.set("feedback", mastermindGame.gameFeedback);
    };

    MastermindView.prototype.updateBoard = function() {
      this.$("[data-id=guess-" + (this.model.get("turnNumber")) + "]").html(this.model.get("guess"));
      return this.$("[data-id=feedback-" + (this.model.get("turnNumber")) + "]").html(this.model.get("feedback"));
    };

    MastermindView.prototype.updateTurnNumber = function(mastermindGame) {
      return this.model.set("turnNumber", mastermindGame.turnNumber);
    };

    MastermindView.prototype.isGameOver = function() {
      if (this.model.get("isLoss") === true || this.model.get("isWin") === true) {
        return this.$('[data-id=guess-button]').prop('disabled', true);
      }
    };

    MastermindView.prototype.reset = function() {
      var _this = this;
      return $.ajax({
        url: "api/CreateGame",
        type: "POST",
        success: function(responseData, responseText) {
          return _this.createNewGameSuccessCallback(responseData);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return console.log(jqXHR.responseText);
        }
      });
    };

    MastermindView.prototype.createNewGameSuccessCallback = function(mastermindGameDTO) {
      var newGame;
      newGame = new Game({
        id: mastermindGameDTO.Id,
        turnNumber: mastermindGameDTO.turnNumber,
        code: mastermindGameDTO.code,
        guess: mastermindGameDTO.guess,
        isWin: mastermindGameDTO.isWin,
        isLoss: mastermindGameDTO.isLoss
      });
      return $('[data-id=container]').html(new MastermindView({
        model: newGame
      }).render().el);
    };

    return MastermindView;

  })(Backbone.View);

  window.MastermindView = MastermindView;

}).call(this);
