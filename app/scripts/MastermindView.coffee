class MastermindView extends Backbone.View
  template: JST['app/scripts/templates/Mastermind_template.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=guess-button]' : 'makeGuess'
    'click [data-id=reset-button]' : 'reset'

  makeGuess: ->
    if @isValid()
      console.log "guess is valid"
      console.log @model
      console.log @model.get("id")
      @setGuessToModel()
      #$.get("api/game/#{@model.get("id")}", {"guess": @model.get("guess")}, @guessSuccessCallback)
     $.ajax
        url: "api/game/#{@model.get("id")}"
        type: 'PUT'
        data: {"guess": @model.get("guess")}
        success: (responseData, responseText) ->
          console.log "this is success"
          @guessSuccessCallback(responseData)
        error: (jqXHR, textStatus, errorThrown) ->
          console.log textStatus, errorThrown
          console.log jqXHR

  isValid: ->
    @$('[data-id=mm-form]').valid()

  setGuessToModel: ->
    @model.set("guess", @$('[data-id=guess-input]').val())
    console.log "your guess is: #{@model.get("guess")}"

  guessSuccessCallback: (mastermindGame) =>
    console.log "successful guess callback"
    @updateGameModel(mastermindGame)
    console.log @model
    @updateBoard()
    @isLose()
    @isWin()

  updateGameModel: (mastermindGame) ->
    @model.set("feedback", mastermindGame.get("feedback"))
    @model.set("guess", mastermindGame.get("guess"))
    @model.set("isWin", mastermindGame.get("isWin"))
    @model.set("isLoss", mastermindGame.get("isLoss"))
    @model.set("turnNumber", mastermindGame.get("turnNumber"))

  updateBoard: ->
    @$("[data-id=guess-#{@model.get("TurnNumber")}]").html(@model.get("Guess"))
    @$("[data-id=feedback-#{@model.get("TurnNumber")}']").html(@model.get("Feedback"))

  isLoss: ->
    if @model.get("IsLoss") is true
      @$('[data-id=guess-button]').prop('disabled', true)

  #combine this with isLoss when you get it working
  isWin: ->
    if @model.get("IsWin") is true
      @$('[data-id=guess-button]').prop('disabled', true)

  reset: ->
    #maybe just call that object to reset again
    $.post("api/CreateGame")

  newGameCallback: (mastermindGame) =>
    console.log "click new game is here"

window.MastermindView = MastermindView
