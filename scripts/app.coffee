$ ->
  # following line needs to instead initialize the game on the backend
  # this means you need to hit an endpoint that will initialize everything
  # it might return the code that you then will pass to the Game initializer
  gen = new CodeGenerator()

  $('[data-id=container]').html(new MastermindView(model: new Game({code: gen.createCode().join("")})).render().el)
  $('#guess_input').focus()

  $("#mm_form").validate({
    rules: {
      guess_input: {
        required: true,
        minlength: 4,
        maxlength: 4,
        digits: true
      }
    }
  })


