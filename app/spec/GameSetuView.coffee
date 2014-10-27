describe 'GameSetupView', ->

  it 'renders template', ->
    view = renderMastermindView()
    expect(view.$('[data-id=game-table]')).toExist()


