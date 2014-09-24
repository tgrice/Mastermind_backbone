(function() {
  describe('GuessInputView', function() {
    var renderGuessInputView;
    renderGuessInputView = function() {
      var view;
      view = new GuessInputView;
      return view.render();
    };
    xit('does not allow an input shorter than 4 characters', function() {
      var view;
      view = renderGuessInputView();
      view.$('[data-id=guess-input]').val('123');
      view.$('[data-id=guess-button]').click();
      return expect(view.validate()).toBe(false);
    });
    xit('does not allow an input longer than 4 characters', function() {});
    return xit('does not allow an input that is not a number', function() {});
  });

}).call(this);
