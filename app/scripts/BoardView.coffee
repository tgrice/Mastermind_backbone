class BoardView extends Backbone.View

  render: (turns) ->
    board = new Board()
    @$el.html(board.build(@options.turns))
    @

  addGuess: (turnNumber, guess) ->
    @$('[data-id=guess-' + turnNumber + ']').html(guess)

  addFeedback: (turnNumber, feedback) ->
    @$('[data-id=feedback-' + turnNumber + ']').html(feedback)

window.BoardView = BoardView

