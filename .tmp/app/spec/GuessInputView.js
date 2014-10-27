(function() {
  describe('GuessInputView', function() {
    var fakeServer, mockResponse, renderGuessInputView;
    fakeServer = null;
    renderGuessInputView = function() {
      var boardView, gameDTO, view;
      boardView = new BoardView({
        turns: 8
      });
      gameDTO = {
        Id: '00000000-0000-0000-0000-000000000000',
        code: '0043',
        gameFeedback: '',
        guess: '',
        isLoss: false,
        isWin: false,
        numOfTurns: 8,
        turnNumber: 0
      };
      view = new GuessInputView({
        boardView: boardView,
        gameDTO: gameDTO
      });
      return view.render();
    };
    mockResponse = function(data, url, method, status, headers) {
      if (method == null) {
        method = 'GET';
      }
      if (status == null) {
        status = 200;
      }
      if (headers == null) {
        headers = {
          'Content-Type': 'application/json'
        };
      }
      return fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)]);
    };
    beforeEach(function() {
      return fakeServer = sinon.fakeServer.create();
    });
    afterEach(function() {
      return fakeServer.restore();
    });
    it('renders template', function() {
      var view;
      view = renderGuessInputView();
      return expect(view.$('[data-id=mm-form]')).toExist();
    });
    describe('input validation', function() {
      xit('does not allow an input shorter than 4 characters', function() {
        var view;
        view = renderGuessInputView();
        view.$('[data-id=guessInput]').val('123');
        view.$('[data-id=guess-button]').click();
        return expect(view.isValid()).toBe(false);
      });
      xit('does not allow an input longer than 4 characters', function() {
        var view;
        view = renderGuessInputView();
        view.$('[data-id=guessInput]').val('12345');
        view.$('[data-id=guess-button]').click();
        return expect(view.isValid()).toBe(false);
      });
      return xit('does not allow an input that is not a number', function() {
        var view;
        view = renderGuessInputView();
        view.$('[data-id=guessInput]').val('123a');
        view.$('[data-id=guess-button]').click();
        return expect(view.isValid()).toBe(false);
      });
    });
    describe('clicking guess', function() {
      it('gives correct feedback when a win occurs', function() {
        var mastermindGame, view;
        view = renderGuessInputView();
        mastermindGame = {
          gameFeedback: 'Victory!',
          turnNumber: 8,
          isWin: true,
          isLoss: false
        };
        mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT');
        view.$('[data-id=guess-button]').click();
        fakeServer.respond();
        console.log(view);
        return expect(view.$('[data-id=feedback-1]').html()).toBe('Victory!');
      });
      xit('gives correct feedback when a lose occurs', function() {
        var mastermindGame, view, _i;
        view = renderGuessInputView();
        mastermindGame = {
          gameFeedback: 'Game Over!/nCode:0043!',
          turnNumber: 8,
          isWin: false,
          isLoss: true
        };
        for (_i = 0; _i <= 9; _i++) {
          playRoundOfGame(mastermindGame, view, '1111');
        }
        return expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over!/nCode:0043');
      });
      it('disables the guess button when a loss occurs', function() {
        var mastermindGame, view;
        view = renderGuessInputView();
        mastermindGame = {
          gameFeedback: 'Game Over!/nCode:0043',
          turnNumber: 8,
          isWin: false,
          isLoss: true
        };
        mastermindGame = {
          gameFeedback: 'Victory!',
          turnNumber: 8,
          isWin: false,
          isLoss: true
        };
        mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT');
        view.$('[data-id=guess-button]').click();
        fakeServer.respond();
        return expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled');
      });
      return it('disables the guess button when a win occurs', function() {
        var mastermindGame, view;
        view = renderGuessInputView();
        mastermindGame = {
          gameFeedback: 'Victory!',
          turnNumber: 8,
          isWin: true,
          isLoss: false
        };
        mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT');
        view.$('[data-id=guess-button]').click();
        fakeServer.respond();
        return expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled');
      });
    });
    return describe('api call', function() {
      return it('hits correct url', function() {
        var gameDTO, view;
        view = renderGuessInputView();
        gameDTO = {
          id: '00000000-0000-0000-0000-000000000000',
          turnNumber: 0,
          code: '1234',
          guess: '',
          gameFeedback: '',
          isWin: false,
          isLoss: false
        };
        mockResponse(gameDTO, 'api/CreateGame', 'POST');
        view.$('[data-id=make-guess]').click();
        fakeServer.respond();
        return expect(fakeServer.requests[0].url).toBe('api/Game/00000000-0000-0000-000000000000');
      });
    });
  });

}).call(this);
