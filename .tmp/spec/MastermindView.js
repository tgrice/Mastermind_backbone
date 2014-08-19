(function() {
  describe('MastermindView', function() {
    var createMastermindView, lastTurnGuess, makeGuess;
    createMastermindView = function() {
      var game;
      game = new Game({
        code: '0043'
      });
      return new MastermindView({
        model: game
      });
    };
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
      return expect(view.$('[data-id=feedback-' + guessNum + ']').html()).toEqual('Game Over 0043');
    };
    it('Gives blank feedback', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('1111', view, '');
    });
    it('Gives feedback of W', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('1322', view, 'W');
    });
    it('Gives feedback of B', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('1011', view, 'B');
    });
    it('Gives feedback of WW', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('4311', view, 'WW');
    });
    it('Gives feedback of WWW', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('4301', view, 'WWW');
    });
    it('Gives feedback of BB', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('0011', view, 'BB');
    });
    it('Gives feedback of BBB', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('0045', view, 'BBB');
    });
    it('Gives feedback of BBWW', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('0034', view, 'BBWW');
    });
    it('Gives feedback of BWWW', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('0430', view, 'BWWW');
    });
    it('Gives feedback of WWWW', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('4300', view, 'WWWW');
    });
    it('Can Win', function() {
      var view;
      view = createMastermindView().render();
      return makeGuess('0043', view, 'Victory');
    });
    it('Can Lose', function() {
      var view;
      view = createMastermindView().render();
      return lastTurnGuess('1111', view, 9);
    });
    it('Disables guess button on a win', function() {
      var view;
      view = createMastermindView().render();
      view.$('#guess_input').val('0043');
      view.$('[data-id=guess_button]').click();
      return expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(true);
    });
    it('Disables the guess button on a loss', function() {
      var view;
      view = createMastermindView().render();
      lastTurnGuess('1111', view, 9);
      return expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(true);
    });
    it('Enables the guess button when reset button clicked', function() {
      var view;
      view = createMastermindView().render();
      lastTurnGuess('1111', view, 9);
      view.$('[data-id=reset-button]').click();
      return expect(view.$('[data-id=guess_button]').prop('disabled')).toBe(false);
    });
    it('clears the table when reset button clicked', function() {
      var view, x, _i, _results;
      view = createMastermindView().render();
      lastTurnGuess('1111', view, 9);
      view.$('[data-id=reset-button]').click();
      _results = [];
      for (x = _i = 0; _i <= 9; x = ++_i) {
        expect(view.$('[data-id=guess-' + x + ']').html()).toBe('');
        _results.push(expect(view.$('[data-id=feedback-' + x + ']').html()).toBe(''));
      }
      return _results;
    });
    it('Sets turnNumber to 0 when reset button is clicked', function() {
      var view;
      view = createMastermindView().render();
      lastTurnGuess('1111', view, 9);
      view.$('[data-id=reset-button]').click();
      return expect(view.turnNumber).toBe(0);
    });
    return it('Creates a new code when reset button is clicked', function() {
      var view;
      view = createMastermindView().render();
      view.$('[data-id=reset-button]').click();
      return expect(view.getCode()).toNotBe('0043');
    });
  });

}).call(this);
