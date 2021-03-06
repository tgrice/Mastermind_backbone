(function() {
  describe('MastermindView', function() {
    var createTurnObject, fakeServer, mockResponse, playRoundOfGame, renderMastermindView;
    fakeServer = null;
    renderMastermindView = function() {
      var game, view;
      game = new Backbone.Model({
        id: '00000000-0000-0000-0000-000000000000',
        turnNumber: 0,
        code: '0043',
        guess: '',
        gameFeedback: '',
        isWin: false,
        isLoss: false
      });
      view = new MastermindView({
        model: game
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
    playRoundOfGame = function(expectedFeedback, view, guess) {
      view.$('[data-id=guess-input]').val(guess);
      mockResponse(expectedFeedback, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT');
      view.$('[data-id=guess-button]').click();
      return fakeServer.respond();
    };
    createTurnObject = function(id, turnNumber, code, guess, isWin, isLoss) {
      return {
        id: id,
        turnNumber: turnNumber,
        code: code,
        guess: guess,
        isIwn: isWin,
        isLoss: isLoss
      };
    };
    beforeEach(function() {
      return fakeServer = sinon.fakeServer.create();
    });
    afterEach(function() {
      return fakeServer.restore();
    });
    it('renders template', function() {
      var view;
      view = renderMastermindView();
      return expect(view.$('[data-id=game-table]')).toExist();
    });
    describe('clicking reset', function() {
      it('resets board', function() {
        var Game, mastermindGame, view;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'B',
          turnNumber: 1,
          isWin: false,
          isLoss: false
        };
        playRoundOfGame(mastermindGame, view, '0222');
        expect(view.$('[data-id=guess-0]').html()).toBe('0222');
        expect(view.$('[data-id=feedback-0]').html()).toBe('B');
        Game = {
          id: 'be5eb589-64db-416e-8ef2-222549d50a79',
          turnNumber: 0,
          code: '1234',
          guess: '',
          gameFeedback: '',
          isWin: false,
          isLoss: false
        };
        mockResponse(Game, 'api/CreateGame', 'POST');
        view.$('[data-id=reset-button]').click();
        fakeServer.respond();
        expect(view.$('.guess').html()).toBe('');
        return expect(view.$('.feedback').html()).toBe('');
      });
      return it('creates new game', function() {
        var mastermindGameDTO, view;
        view = renderMastermindView();
        mastermindGameDTO = {
          id: 'be5eb589-64db-416e-8ef2-222549d50a79',
          turnNumber: 0,
          code: '1234',
          guess: '',
          gameFeedback: '',
          isWin: false,
          isLoss: false
        };
        mockResponse(mastermindGameDTO, 'api/CreateGame', 'POST');
        view.$('[data-id=reset-button]').click();
        fakeServer.respond();
        return expect(fakeServer.requests[0].url).toBe('api/CreateGame');
      });
    });
    describe('clicking guess', function() {
      it('inserts guess into table', function() {
        var mastermindGame, view;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: '',
          turnNumber: 1,
          isWin: false,
          isLoss: false
        };
        playRoundOfGame(mastermindGame, view, '1111');
        return expect(view.$('[data-id=guess-0]').html()).toBe('1111');
      });
      it('inserts feedback into table', function() {
        var mastermindGame, view;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'BBW',
          turnNumber: 1,
          isWin: false,
          isLoss: false
        };
        playRoundOfGame(mastermindGame, view, '0037');
        return expect(view.$('[data-id=feedback-0]').html()).toBe('BBW');
      });
      it('gives correct feedback when a win occurs', function() {
        var mastermindGame, view;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'Victory!',
          turnNumber: 1,
          isWin: false,
          isLoss: false
        };
        playRoundOfGame(mastermindGame, view, '0043');
        return expect(view.$('[data-id=feedback-0]').html()).toBe('Victory!');
      });
      it('gives correct feedback when a lose occurs', function() {
        var mastermindGame, view, _i;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'Game Over!/nCode:0043',
          turnNumber: 9,
          isWin: false,
          isLoss: false
        };
        for (_i = 0; _i <= 9; _i++) {
          playRoundOfGame(mastermindGame, view, '1111');
        }
        return expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over!/nCode:0043');
      });
      it('disables the guess button when a loss occurs', function() {
        var mastermindGame, view, _i;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'Game Over!/nCode:0043',
          turnNumber: 9,
          isWin: false,
          isLoss: true
        };
        for (_i = 0; _i <= 9; _i++) {
          playRoundOfGame(mastermindGame, view, '1111');
        }
        return expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled');
      });
      return it('disables the guess button when a win occurs', function() {
        var mastermindGame, view, _i;
        view = renderMastermindView();
        mastermindGame = {
          gameFeedback: 'Victory!',
          turnNumber: 1,
          isWin: true,
          isLoss: false
        };
        for (_i = 0; _i <= 9; _i++) {
          playRoundOfGame(mastermindGame, view, '1111');
        }
        return expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled');
      });
    });
    return describe('guess input vaidation', function() {
      return it('does not allow a guess shorter than 4 digits', function() {
        var view;
        view = renderMastermindView();
        view.$('[data-id=guess-input]').val('123');
        return expect(view.isValid()).toBe(false);
      });
    });
  });

}).call(this);
