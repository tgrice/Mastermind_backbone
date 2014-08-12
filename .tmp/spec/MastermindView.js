(function() {
  describe('MastermindView', function() {
    var lastTurnGuess, makeGuess;
    makeGuess = function(guess, view, expectedFeedback) {
      view.$('#guess_input').val(guess);
      view.$('[data-id=guess_button]').click();
      expect(view.$('[data-id=guess-0]').html()).toEqual(guess);
      return expect(view.$('[data-id=feedback-0]').html()).toEqual(expectedFeedback);
    };
    lastTurnGuess = function(guess, view, guessNum) {
      var x, _i;
      for (x = _i = 0; _i <= 9; x = ++_i) {
        makeGuess('1111', view, '');
      }
      view.$('#guess_input').val('1111');
      view.$('[data-id=guess_button]').click();
      expect(view.$('[data-id=guess-' + guessNum + ']').html()).toEqual('1111');
      return expect(view.$('[data-id=feedback-' + guessNum + ']').html()).toEqual('Game Over');
    };
    it('can populte text box', function() {
      var view;
      view = new MastermindView().render();
      view.$('#guess_input').val(1234);
      return expect(view.$('#guess_input').val()).toEqual('1234');
    });
    it('Displays first guess correctly', function() {
      var view;
      view = new MastermindView().render();
      view.$('#guess_input').val(1234);
      view.$('[data-id=guess_button]').click();
      return expect(view.$('[data-id=guess-0]').html()).toEqual('1234');
    });
    it('Displays second guess correctly', function() {
      var view;
      view = new MastermindView().render();
      view.$('#guess_input').val(1234);
      view.$('[data-id=guess_button]').click();
      expect(view.$('[data-id=guess-0]').html()).toEqual('1234');
      view.$('#guess_input').val(5678);
      view.$('[data-id=guess_button]').click();
      return expect(view.$('[data-id=guess-1]').html()).toEqual('5678');
    });
    it('Gives blank feedback', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('1111', view, '');
    });
    it('Gives feedback of W', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('1322', view, 'W');
    });
    it('Gives feedback of B', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('1011', view, 'B');
    });
    it('Gives feedback of WW', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('4311', view, 'WW');
    });
    it('Gives feedback of WWW', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('4301', view, 'WWW');
    });
    it('Gives feedback of BB', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('0011', view, 'BB');
    });
    it('Gives feedback of BBB', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('0045', view, 'BBB');
    });
    it('Gives feedback of BBWW', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('0034', view, 'BBWW');
    });
    it('Gives feedback of BWWW', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('0430', view, 'BWWW');
    });
    it('Gives feedback of WWWW', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('4300', view, 'WWWW');
    });
    it('Can Win', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('0043', view, 'Victory');
    });
    it('Can Lose', function() {
      var view;
      view = new MastermindView().render();
      return lastTurnGuess('1111', view, 9);
    });
    return it('Shows hidden cell with code when lose occurs', function() {
      var view;
      view = new MastermindView().render();
      lastTurnGuess('1111', view, 9);
      return expect(view.$('#reveal').html()).toEqual('0043');
    });
  });

}).call(this);
