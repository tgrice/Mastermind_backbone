class GuessInputView extends Backbone.View
  template: JST['app/scripts/templates/Guess_input.ejs']

  render: ->
    @$el.html(@template())
    @

  events:
    'click [data-id=guess-button]' : 'makeGuess'

  isValid: ->
    @$("[data-id=mm-form]").validate({
      rules: {
        guessInput: {
          required: true,
          minlength: 4,
          maxlength: 4,
          digits: true
        }
      }
    })
    @$('[data-id=mm-form]').valid()

  getGuess: ->
    @$("[data-id=guessInput]").val()

  makeGuess: ->
    if @isValid()
      $.ajax
        url: "api/game/#{@options.gameDTO.Id}"
        type: 'PUT'
        data: {"guess": @getGuess()}
        success: (responseData, responseText) =>
          @guessSuccessCallback(responseData)
        error: (jqXHR, textStatus, errorThrown) ->
          console.log textStatus, errorThrown

  guessSuccessCallback: (mastermindGame) =>
    @trigger('makeGuess', mastermindGame)

window.GuessInputView = GuessInputView

