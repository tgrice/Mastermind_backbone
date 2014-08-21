class MastermindView extends Backbone.View
  template: JST['scripts/templates/Mastermind_template.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=guess_button]' : 'makeGuess'
    'click [data-id=reset-button]' : 'reset'

  turnNumber:
    0

  guess:
    ""

  getCode: ->
    @model.get("code")

  makeGuess: ->
    if @isValid()
      @guess = @$('#guess_input').val()
      @$('[data-id=guess-' + @turnNumber + ']').html(guess)
      $.get("api/game/7", {'guess': @guess, 'code': @getCode()}, @guessCallback)
      #feedback = @getFeedback(guess, @getCode())

  guessCallback: (a, b, c) =>
    feedback = a
    if @isLose() 
      feedback = @gameOver()
    if @isWin()
      feedback = @victory()
    @updateBoard(feedback)

  isValid: ->
    @$('#mm_form').valid()

  isLose: ->
    @turnNumber is 9

  gameOver: ->
    @$('[data-id=guess_button]').prop('disabled', true)
    feedback = 'Game Over ' + @getCode()

  isWin: ->
    @guess is @getCode()

  victory: ->
    @$('[data-id=guess_button]').prop('disabled', true)
    feedback = 'Victory'

  updateBoard: (feedback) ->
    @$('[data-id=guess-' + @turnNumber + ']').html(@guess)
    @$('[data-id=feedback-' + @turnNumber + ']').html(feedback)
    @incrementTurnNumber()

  incrementTurnNumber: ->
    @turnNumber++

  reset: ->
    @resetBoard()
    @newCode()

  resetBoard: ->
    @$('[data-id=guess_button]').prop('disabled', false)
    @$('.guess').empty()
    @$('.feedback').empty()
    @turnNumber = 0

  newCode: ->
    cg = new CodeGenerator()
    @model.set({code: cg.createCode().join("")})

window.MastermindView = MastermindView
