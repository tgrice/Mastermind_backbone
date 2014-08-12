class MastermindView extends Backbone.View
  template: JST['scripts/templates/Mastermind_template.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=guess_button]' : 'makeGuess'

  turnNumber:
    0

  code:
    '0043'

  makeGuess: ->
    if @isValid()
      guess = @$('#guess_input').val()
      feedback = @getFeedback(guess, @code)
      if @isLose()
        feedback = 'Game Over'
      if @isWin(guess)
        feedback = 'Victory'
        @$('#reveal').show()
      @$('[data-id=guess-' + @turnNumber + ']').html(guess)
      @$('[data-id=feedback-' + @turnNumber + ']').html(feedback)
      @incrementTurnNumber()

  isValid: ->
    $('#mm_form').valid()

  isLose: ->
    @turnNumber is 9

  isWin: (guess) ->
    guess is @code

  incrementTurnNumber: ->
    @turnNumber++

  getFeedback: (guess, code) ->
    response = ''
    testGuess = guess.split('')
    testCode = code.split('')
    for guessChar, guessIndex in testGuess
      if testCode[guessIndex] is guessChar
        response+= 'B'
        testGuess[guessIndex] = 'Q'
        testCode[guessIndex] = 'X'
    for codeChar, codeIndex in testCode
      for guessChar, guessIndex in testGuess
        if codeChar is guessChar
          response+= 'W'
          testCode[codeIndex] = 'Y'
          testGuess[guessIndex] = 'Z'
    response


window.MastermindView = MastermindView
