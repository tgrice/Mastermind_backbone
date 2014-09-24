class GuessInputView extends Backbone.View
  template: JST['app/scripts/templates/Guess_input.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=guess-button]' : 'validate'

  validate: ->
    @$("[data-id=mm-form]").validate({
      rules: {
        guess_input: {
          required: true,
          minlength: 4,
          maxlength: 4,
          digits: true
        }
      }
    })
    @$('[data-id=mm-form]').valid()

window.GuessInputView = GuessInputView

