describe 'MastermindView', ->

  makeGuess = (guess, view, expectedFeedback) ->
    view.$('#guess_input').val(guess)
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-0]').html()).toEqual(guess)
    expect(view.$('[data-id=feedback-0]').html()).toEqual(expectedFeedback)

  makeNguesses = (guess, view, numberOfGuesses) ->
    i = 0
    while i < numberOfGuesses
      view.$('#guess_input').val(guess)
      view.$('[data-id=guess_button]').click()

  it 'can populte text box', ->
    view = new MastermindView().render()
    view.$('#guess_input').val(1234)
    expect(view.$('#guess_input').val()).toEqual('1234')

  it 'Displays first guess correctly', ->
    view = new MastermindView().render()
    view.$('#guess_input').val(1234)
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-0]').html()).toEqual('1234')

  it 'Displays second guess correctly', ->
    view = new MastermindView().render()
    view.$('#guess_input').val(1234)
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-0]').html()).toEqual('1234')
    view.$('#guess_input').val(5678)
    view.$('[data-id=guess_button]').click()
    expect(view.$('[data-id=guess-1]').html()).toEqual('5678')

  it 'Gives blank feedback', ->
    view = new MastermindView().render()
    makeGuess('1111', view, '')

  it 'Gives feedback of W', ->
    view = new MastermindView().render()
    makeGuess('1322', view, 'W')

  it 'Gives feedback of B', ->
    view = new MastermindView().render()
    makeGuess('1011', view, 'B')

  it 'Gives feedback of WW', ->
    view = new MastermindView().render()
    makeGuess('4311', view, 'WW')

  it 'Gives feedback of WWW', ->
    view = new MastermindView().render()
    makeGuess('4301', view, 'WWW')

  it 'Gives feedback of BB', ->
    view = new MastermindView().render()
    makeGuess('0011', view, 'BB')

  it 'Gives feedback of BBB', ->
    view = new MastermindView().render()
    makeGuess('0045', view, 'BBB')

  it 'Gives feedback of BBWW', ->
    view = new MastermindView().render()
    makeGuess('0034', view, 'BBWW')

  it 'Gives feedback of BWWW', ->
    view = new MastermindView().render()
    makeGuess('0430', view, 'BWWW')

  it 'Gives feedback of WWWW', ->
    view = new MastermindView().render()
    makeGuess('4300', view, 'WWWW')

  it 'Can Win', ->
    view = new MastermindView().render()
    makeGuess('0043', view, 'Victory')

  xit 'Can Lose', ->
    view = new MastermindView().render()
    makeGuess('1111', view, 'Game Over')
































