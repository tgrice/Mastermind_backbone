class MastermindView extends Backbone.View

  render: ->
    board = new Board()
    @$el.html(board.build(9))
    @

  events:
    'click [data-id=guess-button]' : 'makeGuess'
    'click [data-id=reset-button]' : 'reset'

  makeGuess: ->
    if @isValid()
      @setGuessToModel()
      $.ajax
        url: "api/game/#{@model.get("id")}"
        type: 'PUT'
        data: {"guess": @model.get("guess")}
        success: (responseData, responseText) =>
          @guessSuccessCallback(responseData)
        error: (jqXHR, textStatus, errorThrown) ->
          console.log textStatus, errorThrown

  isValid: ->
    true

  setGuessToModel: ->
    @model.set("guess", @$('[data-id=guess-input]').val())

  guessSuccessCallback: (mastermindGame) =>
    @updateFeedback(mastermindGame)
    @updateGameStatus(mastermindGame)
    @updateBoard()
    @updateTurnNumber(mastermindGame)
    @isGameOver()

  updateFeedback: (mastermindGame) =>
    @model.set("feedback", mastermindGame.gameFeedback)

  updateGameStatus: (mastermindGame) =>
    @model.set("isWin", mastermindGame.isWin)
    @model.set("isLoss", mastermindGame.isLoss)

  updateBoard: ->
    @$("[data-id=guess-#{@model.get("turnNumber")}]").html(@model.get("guess"))
    @$("[data-id=feedback-#{@model.get("turnNumber")}]").html(@model.get("feedback"))

  updateTurnNumber: (mastermindGame) =>
    @model.set("turnNumber", mastermindGame.turnNumber)

  isGameOver: ->
    if @model.get("isLoss") is true or @model.get("isWin") is true
      @$('[data-id=guess-button]').attr('disabled', true)

  reset: ->
    $.ajax
      url: "api/CreateGame"
      type: "POST"
      success: (responseData, responseText) =>
        @createNewGameSuccessCallback(responseData)
      error: (jqXHR, textStatus, errorThrown) ->
        console.log jqXHR.responseText

  createNewGameSuccessCallback: (mastermindGameDTO) ->
    newGame = new Game({
      id: mastermindGameDTO.Id,
      turnNumber: mastermindGameDTO.turnNumber,
      code: mastermindGameDTO.code,
      guess: mastermindGameDTO.guess,
      isWin: mastermindGameDTO.isWin,
      isLoss: mastermindGameDTO.isLoss})
    $('[data-id=container]').html(new MastermindView(model: newGame).render().el)

window.MastermindView = MastermindView
