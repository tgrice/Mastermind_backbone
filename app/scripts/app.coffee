$ ->
  gameCreator = new CreateGame()
  gameCreator.execute()

  $("[data-id=mm-form]").validate({
    rules: {
      guess_input: {
        required: true,
        minlength: 4,
        maxlength: 4,
        digits: true
      }
    }
  })
  $('[data-id=guess-input]').focus()
