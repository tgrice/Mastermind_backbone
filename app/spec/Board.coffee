describe 'Board', ->

  it 'board to build', ->
    board = new Board()
    expect(board.build(2)).not.toBeEmpty()

