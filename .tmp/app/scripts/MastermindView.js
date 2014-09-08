(function() {
  var MastermindView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MastermindView = (function(_super) {
    __extends(MastermindView, _super);

    function MastermindView() {
      this.newGameCallback = __bind(this.newGameCallback, this);
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
      if (this.isValid()) {
        console.log("guess is valid");
        console.log(this.model);
        console.log(this.model.get("id"));
        this.setGuessToModel();
      }
      return $.ajax({
        url: "api/game/" + (this.model.get("id")),
        type: 'PUT',
        data: {
          "guess": this.model.get("guess")
        },
        success: function(responseData, responseText) {
          console.log("this is success");
          return this.guessSuccessCallback(responseData);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
          return console.log(jqXHR);
        }
      });
    };

    MastermindView.prototype.isValid = function() {
      return this.$('[data-id=mm-form]').valid();
    };

    MastermindView.prototype.setGuessToModel = function() {
      this.model.set("guess", this.$('[data-id=guess-input]').val());
      return console.log("your guess is: " + (this.model.get("guess")));
    };

    MastermindView.prototype.guessSuccessCallback = function(mastermindGame) {
      console.log("successful guess callback");
      this.updateGameModel(mastermindGame);
      console.log(this.model);
      this.updateBoard();
      this.isLose();
      return this.isWin();
    };

    MastermindView.prototype.updateGameModel = function(mastermindGame) {
      this.model.set("feedback", mastermindGame.get("feedback"));
      this.model.set("guess", mastermindGame.get("guess"));
      this.model.set("isWin", mastermindGame.get("isWin"));
      this.model.set("isLoss", mastermindGame.get("isLoss"));
      return this.model.set("turnNumber", mastermindGame.get("turnNumber"));
    };

    MastermindView.prototype.updateBoard = function() {
      this.$("[data-id=guess-" + (this.model.get("TurnNumber")) + "]").html(this.model.get("Guess"));
      return this.$("[data-id=feedback-" + (this.model.get("TurnNumber")) + "']").html(this.model.get("Feedback"));
    };

    MastermindView.prototype.isLoss = function() {
      if (this.model.get("IsLoss") === true) {
        return this.$('[data-id=guess-button]').prop('disabled', true);
      }
    };

    MastermindView.prototype.isWin = function() {
      if (this.model.get("IsWin") === true) {
        return this.$('[data-id=guess-button]').prop('disabled', true);
      }
    };

    MastermindView.prototype.reset = function() {
      return $.post("api/CreateGame");
    };

    MastermindView.prototype.newGameCallback = function(mastermindGame) {
      return console.log("click new game is here");
    };

    return MastermindView;

  })(Backbone.View);

  window.MastermindView = MastermindView;

}).call(this);
