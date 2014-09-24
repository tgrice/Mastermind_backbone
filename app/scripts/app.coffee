$ ->
  gameCreator = new CreateGame()
  gameCreator.execute()

  $('[data-id=guess-input]').focus()
