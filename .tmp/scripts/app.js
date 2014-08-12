(function() {
  $(function() {
    $('[data-id=container]').html(new MastermindView().render().el);
    $('#guess_input').focus();
    return $("#mm_form").validate({
      rules: {
        guess_input: {
          required: true,
          minlength: 4,
          maxlength: 4,
          digits: true
        }
      }
    });
  });

}).call(this);
