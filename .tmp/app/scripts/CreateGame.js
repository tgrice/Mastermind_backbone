(function() {
  var CreateGame;

  CreateGame = (function() {
    function CreateGame() {}

    CreateGame.prototype.execute = function() {
      return $.ajax({
        url: "api/CreateGame",
        type: "POST",
        success: function(responseData, responseText) {
          return this.createGameSuccessCallback(responseData);
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
        id: mastermindGame.get("id"),
        turnNumber: mastermindGame.get("turnNumber"),
        code: mastermindGame.get("code"),
        guess: mastermindGame.get("guess"),
        isWin: mastermindGame.get("isWin"),
        isLoss: mastermindGame.get("isLoss")
      });
      return $('[data-id=container]').html(new MastermindView({
        model: newGame
      }).render().el);
    };

    return CreateGame;

  })();

  window.CreateGame = CreateGame;

}).call(this);
