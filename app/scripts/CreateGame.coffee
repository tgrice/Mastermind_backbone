class CreateGame

  execute: ->
    #$.post('api/CreateGame', {}, createGameSuccessCallback(mastermindGame))
    $.ajax
      url: "api/CreateGame"
      type: "POST"
      success: (responseData, responseText) ->
        @createGameSuccessCallback(responseData)
      error: (jqXHR, textStatus, errorThrown) ->
        console.log jqXHR.responseText

  createGameSuccessCallback: (mastermindGame) ->
    console.log 'Create new game success'
    newGame = new Game({
      id: mastermindGame.get("id"),
      turnNumber: mastermindGame.get("turnNumber"), 
      code: mastermindGame.get("code"), 
      guess: mastermindGame.get("guess"), 
      isWin: mastermindGame.get("isWin"), 
      isLoss: mastermindGame.get("isLoss")})
    $('[data-id=container]').html(new MastermindView(model: newGame).render().el)

window.CreateGame = CreateGame
