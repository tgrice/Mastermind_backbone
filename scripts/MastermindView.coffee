class MastermindView extends Backbone.View
  template: JST['scripts/templates/Mastermind_template.ejs']

  render: ->
    @$el.html(@template())
    @
window.MastermindView = MastermindView
