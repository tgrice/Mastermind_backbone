describe 'GuessInputView', ->

  renderGuessInputView = ->
    view = new GuessInputView
    view.render()

  xit 'does not allow an input shorter than 4 characters', ->
    view = renderGuessInputView()

    view.$('[data-id=guess-input]').val('123')
    view.$('[data-id=guess-button]').click()

    expect(view.validate()).toBe(false)

  xit 'does not allow an input longer than 4 characters', ->



  xit 'does not allow an input that is not a number', ->
