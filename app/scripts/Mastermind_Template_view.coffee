class Mastermind_Template_View extends Backbone.View
  template: JST['app/scripts/templates/Mastermind_template.ejs']

  render: ->
    @renderGameSetup()

  renderGameSetup: ->
    gameSetup = new GameSetupView()
    @$('[data-id=game-setup]').html(gameSetup.render().el)

  renderGameBoard: (size) ->
    board = new Board()
    @$('[data-id=game-board]').html(board.build(size).el)

  renderGameInput: ->
    guessInput = new GuessINputView()
    @$('[data-id=guess-input]').html(guessInput.render().el)
