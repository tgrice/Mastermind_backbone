class CreateGame

  execute: ->
    $.ajax
      url: "api/CreateGame"
      type: "POST"
      #data: {numberOfTurns: turns}
      success: (responseData, responseText) =>
        @createGameSuccessCallback(responseData)
      error: (jqXHR, textStatus, errorThrown) ->
        console.log jqXHR.responseText

  createGameSuccessCallback: (mastermindGame) ->
    newGame = new Game({
      id: mastermindGame.Id,
      turnNumber: mastermindGame.turnNumber,
      #numOfTurns: mastermindGame.numOfTurns,
      code: mastermindGame.code,
      guess: mastermindGame.guess,
      isWin: mastermindGame.isWin,
      isLoss: mastermindGame.isLoss})
    $('[data-id=container]').html(new MastermindView(model: newGame).render().el)

window.CreateGame = CreateGame
