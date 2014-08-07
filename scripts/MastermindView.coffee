class MastermindView extends Backbone.View
  template: JST['Mastermind_backbone/scripts/Mastermind_template.ejs']

  render: ->
    @$el.html(@template)
