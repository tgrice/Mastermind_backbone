(function() {
  var CreateGame;

  CreateGame = (function() {
    function CreateGame() {}

    CreateGame.prototype.execute = function(turns) {
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

    CreateGame.prototype.createGameSuccessCallback = function(mastermindGame) {
      console.log('create game', mastermindGame);
      return mastermindGame;
    };

    return CreateGame;

  })();

  window.CreateGame = CreateGame;

}).call(this);
