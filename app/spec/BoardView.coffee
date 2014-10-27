describe 'BoardView', ->

  renderBoardView = ->
    turns = 2
    view = new BoardView(turns: turns)
    view.render()

  it 'renders template', ->
    view = renderBoardView()
    expect(view.$('[data-id=game-table]')).toExist()
