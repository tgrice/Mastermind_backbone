class GameSetupView extends Backbone.View
  template: JST['app/scripts/templates/GameSetup.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=play]' : 'startGame'

  startGame: ->
    turns = @$('[data-id=turn-select]').val()
    creteGame = new CreateGame()
    createGame.execute(turns)
