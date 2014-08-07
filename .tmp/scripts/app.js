(function() {
  $(function() {
    $('[data-id=container]').html(new MastermindView().render().el);
    return $('#guess_input').focus();
  });

}).call(this);
