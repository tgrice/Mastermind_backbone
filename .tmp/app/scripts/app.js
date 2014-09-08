(function() {
  $(function() {
    var gameCreator;
    gameCreator = new CreateGame();
    gameCreator.execute();
    $("[data-id=mm-form]").validate({
      rules: {
        guess_input: {
          required: true,
          minlength: 4,
          maxlength: 4,
          digits: true
        }
      }
    });
    return $('[data-id=guess-input]').focus();
  });

}).call(this);
