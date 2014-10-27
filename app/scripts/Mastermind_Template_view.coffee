class Mastermind_Template_View extends Backbone.View
  template: JST['app/scripts/templates/Mastermind_template.ejs']

  render: ->
    @$el.html(@template())
    @renderGameSetup()
    @

  renderGameSetup: ->
    gameSetup = new GameSetupView()
    @listenTo(gameSetup, 'triggerStartGame', @renderGameBoard)
    @$('[data-id=game-setup]').html(gameSetup.render().el)

  renderGameBoard: (turns) ->
    @boardView = new BoardView(turns: turns)
    @$('[data-id=game-board]').html(@boardView.render().el)
    @newGame(turns)

  newGame: (turns) ->
    $.ajax
      url: "api/CreateGame"
      type: "POST"
      data: {turns: turns}
      success: (responseData, responseText) =>
        @createGameSuccessCallback(responseData)
      error: (jqXHR, textStatus, errorThrown) ->
        console.log jqXHR.responseText

  createGameSuccessCallback: (mastermindGame) ->
    @renderGameInput(mastermindGame)

  renderGameInput: (gameDTO) ->
    guessInput = new GuessInputView(boardView: @boardView, gameDTO: gameDTO)
    @listenTo(guessInput, 'makeGuess', @updateGameStatus())
    @$('[data-id=game-input]').html(guessInput.render().el)

  updateGameStatus: (mastermindGame) ->
    @updateBoardView(mastermindGame)
    @isGameOver(mastermindGame)

  updateBoardView: (mastermindGame) ->
    @boardView.addGuess(mastermindGame.turnNumber, mastermindGame.guess)
    @boardView.addFeedback(mastermindGame.turnNumber, mastermindGame.gameFeedback)

  isGameOver: (mastermindGame) ->
    if mastermindGame.isLoss is true or mastermindGame.isWin is true
      @$('[data-id=guess-button]').attr('disabled', true)

window.Mastermind_Template_View = Mastermind_Template_View
