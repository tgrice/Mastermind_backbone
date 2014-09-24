(function() {
  $(function() {
    var gameCreator;
    gameCreator = new CreateGame();
    gameCreator.execute();
    return $('[data-id=guess-input]').focus();
  });

}).call(this);
