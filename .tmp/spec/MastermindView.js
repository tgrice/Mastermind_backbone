(function() {
  describe('MastermindView', function() {
    var makeGuess, makeNguesses;
    makeGuess = function(guess, view, expectedFeedback) {
      view.$('#guess_input').val(guess);
      view.$('[data-id=guess_button]').click();
      expect(view.$('[data-id=guess-0]').html()).toEqual(guess);
      return expect(view.$('[data-id=feedback-0]').html()).toEqual(expectedFeedback);
    };
    makeNguesses = function(guess, view, numberOfGuesses) {
      var i, _results;
      i = 0;
      _results = [];
      while (i < numberOfGuesses) {
        view.$('#guess_input').val(guess);
        _results.push(view.$('[data-id=guess_button]').click());
      }
      return _results;
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
    return xit('Can Lose', function() {
      var view;
      view = new MastermindView().render();
      return makeGuess('1111', view, 'Game Over');
    });
  });

}).call(this);
