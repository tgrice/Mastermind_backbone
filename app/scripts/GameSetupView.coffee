class GameSetupView extends Backbone.View
  template: JST['app/scripts/templates/GameSetup.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=play]' : 'triggerStartGame'

  triggerStartGame: ->
    turns = @$('[data-id=turn-select]').val()
    @trigger('triggerStartGame', turns)

window.GameSetupView = GameSetupView
