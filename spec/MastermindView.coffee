describe 'MastermindView', ->

  createMastermindView = () ->
    game = new Game({code: '0043'})
    new MastermindView(model: game)

  makeGuess = (guess, view, expectedFeedback) ->
    view.$('#guess_input').val(guess)
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-0]').html()).toEqual(guess)
    expect(view.$('[data-id=feedback-0]').html()).toEqual(expectedFeedback)

  lastTurnGuess = (guess, view, guessNum) ->
    for x in [0..9]
      makeGuess('1111', view, '')
    view.$('#guess_input').val('1111')
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-' + guessNum + ']').html()).toEqual('1111')
    expect(view.$('[data-id=feedback-' + guessNum + ']').html()).toEqual('Game Over 0043')

  it 'Gives blank feedback', ->
    view = createMastermindView().render()
    makeGuess('1111', view, '')

  it 'Gives feedback of W', ->
    view = createMastermindView().render()
    makeGuess('1322', view, 'W')

  it 'Gives feedback of B', ->
    view = createMastermindView().render()
    makeGuess('1011', view, 'B')

  it 'Gives feedback of WW', ->
    view = createMastermindView().render()
    makeGuess('4311', view, 'WW')

  it 'Gives feedback of WWW', ->
    view = createMastermindView().render()
    makeGuess('4301', view, 'WWW')

  it 'Gives feedback of BB', ->
    view = createMastermindView().render()
    makeGuess('0011', view, 'BB')

  it 'Gives feedback of BBB', ->
    view = createMastermindView().render()
    makeGuess('0045', view, 'BBB')

  it 'Gives feedback of BBWW', ->
    view = createMastermindView().render()
    makeGuess('0034', view, 'BBWW')

  it 'Gives feedback of BWWW', ->
    view = createMastermindView().render()
    makeGuess('0430', view, 'BWWW')

  it 'Gives feedback of WWWW', ->
    view = createMastermindView().render()
    makeGuess('4300', view, 'WWWW')

  it 'Can Win', ->
    view = createMastermindView().render()
    makeGuess('0043', view, 'Victory')

  it 'Can Lose', ->
    view = createMastermindView().render()
    lastTurnGuess('1111', view, 9)

  it 'Disables guess button on a win', ->
    view = createMastermindView().render()
    view.$('#guess_input').val('0043')
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(true)

  it 'Disables the guess button on a loss', ->
    view = createMastermindView().render()
    lastTurnGuess('1111', view, 9)
    expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(true)

  it 'Enables the guess button when reset button clicked', ->
    view = createMastermindView().render()
    lastTurnGuess('1111', view, 9)
    view.$('[data-id=reset-button]').click()
    expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(false)

  it 'clears the table when reset button clicked', ->
    view = createMastermindView().render()
    lastTurnGuess('1111', view, 9)
    view.$('[data-id=reset-button]').click()
    for x in [0..9]
      expect(view.$('[data-id=guess-' + x + ']').html()).toBe('')
      expect(view.$('[data-id=feedback-' + x + ']').html()).toBe('')

  it 'Sets turnNumber to 0 when reset button is clicked', ->
    view = createMastermindView().render()
    lastTurnGuess('1111', view, 9)
    view.$('[data-id=reset-button]').click()
    expect(view.turnNumber).toBe(0)

  it 'Creates a new code when reset button is clicked', ->
    view = createMastermindView().render()
    view.$('[data-id=reset-button]').click()
    expect(view.getCode()).toNotBe('0043')
