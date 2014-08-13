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

  getCode: ->
    @model.get("code")

  makeGuess: ->
    if @isValid()
      guess = @$('#guess_input').val()
      feedback = @getFeedback(guess, @getCode())
      if @isLose()
        feedback = @gameOver()
      if @isWin(guess)
        feedback = @victory()
      @updateBoard(guess, feedback)

  isValid: ->
    @$('#mm_form').valid()

  getFeedback: (guess, code) ->
    response = ''
    testGuess = guess.split('')
    testCode = code.split('')
    response+= @checkNumberAndPosition(testGuess, testCode, response)
    @checkJustNumber(testGuess, testCode, response)

  checkNumberAndPosition: (testGuess, testCode, response) ->
    for guessChar, guessIndex in testGuess
      if testCode[guessIndex] is guessChar
        testGuess[guessIndex] = 'Q'
        testCode[guessIndex] = 'X'
        response+= 'B'
    response

  checkJustNumber: (testGuess, testCode, response) ->
    for codeChar, codeIndex in testCode
      for guessChar, guessIndex in testGuess
        if codeChar is guessChar
          response+= 'W'
          testCode[codeIndex] = 'Y'
          testGuess[guessIndex] = 'Z'
    response

  isLose: ->
    @turnNumber is 9

  gameOver: ->
    @$('[data-id=guess_button]').prop('disabled', true)
    feedback = 'Game Over ' + @getCode()

  isWin: (guess) ->
    guess is @getCode()

  victory: ->
    @$('[data-id=guess_button]').prop('disabled', true)
    feedback = 'Victory'

  updateBoard: (guess, feedback) ->
    @$('[data-id=guess-' + @turnNumber + ']').html(guess)
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
