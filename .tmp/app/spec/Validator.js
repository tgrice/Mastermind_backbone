(function() {
  describe('GuessInputView', function() {
    var renderGuessInputView;
    renderGuessInputView = function() {
      var view;
      view = new GuessInputView;
      return view.render();
    };
    it('does not allow an input shorter than 4 characters', function() {
      var view;
      view = renderGuessInputView();
      view.$('[data-id=guess-input]').val('123');
      return expect(validator.validate()).toBe(false);
    });
    xit('does not allow an input longer than 4 characters', function() {});
    return xit('does not allow an input that is not a number', function() {});
  });

}).call(this);
