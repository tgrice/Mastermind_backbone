(function() {
  var CreateGame;

  CreateGame = (function() {
    function CreateGame() {}

    CreateGame.prototype.execute = function() {
      var _this = this;
      return $.ajax({
        url: "api/CreateGame",
        type: "POST",
        success: function(responseData, responseText) {
          return _this.createGameSuccessCallback(responseData);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          return console.log(jqXHR.responseText);
        }
      });
    };

    CreateGame.prototype.createGameSuccessCallback = function(mastermindGame) {
      var newGame;
      console.log('Create new game success');
      newGame = new Game({
        id: mastermindGame.Id,
        turnNumber: mastermindGame.turnNumber,
        code: mastermindGame.code,
        guess: mastermindGame.guess,
        isWin: mastermindGame.isWin,
        isLoss: mastermindGame.isLoss
      });
      return $('[data-id=container]').html(new MastermindView({
        model: newGame
      }).render().el);
    };

    return CreateGame;

  })();

  window.CreateGame = CreateGame;

}).call(this);
