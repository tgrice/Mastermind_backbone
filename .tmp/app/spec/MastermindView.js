(function() {
  describe('MastermindView', function() {
    var createTurnObject, fakeServer, mockResponse, playRoundOfGame, renderMastermindView;
    fakeServer = null;
    renderMastermindView = function() {
      var game, view;
      game = new Backbone.Model({
        code: '0043',
        id: '00000000-0000-0000-0000-000000000000',
        turnNumber: 0,
        guess: '',
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
          'application/json': 'application/json'
        };
      }
      return fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)]);
    };
    playRoundOfGame = function(expectedFeedback, view, guess) {
      view.$('[data-id=guess-input]').val(guess);
      mockResponse(expectedFeedback, 'api/game/00000000-0000-0000-0000-000000000000?guess=' + guess + '&code=0043');
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
    xit('renders template', function() {
      var view;
      view = renderMastermindView();
      return expect(view.$('[data-id=game-table]')).toExist();
    });
    describe('clicking reset', function() {
      xit('resets board', function() {
        var view;
        view = renderMastermindView();
        playRoundOfGame('', view, '2222');
        view.$('[data-id=reset-button]').click();
        expect(view.$('.guess').html()).toBe('');
        return expect(view.$('.feedback').html()).toBe('');
      });
      return xit('creates new game and creates new secret code', function() {
        var view;
        view = renderMastermindView();
        mockResponse(createTurnObject(1, 0, '1234', '', false, false), 'api/CreateGame');
        view.$('[data-id=reset-button]').click();
        return expect(fakeServer.requests[0].url).toBe('api/CreateGame');
      });
    });
    return describe('clicking guess', function() {
      it('inserts guess into table', function() {
        var view;
        view = renderMastermindView();
        view.$('[data-id=guess-input]').val('1111');
        mockResponse({
          feedback: ''
        }, 'api/game/00000000-0000-0000-0000-000000000000?guess=1111', 'PUT');
        view.$('[data-id=guess-button]').click();
        fakeServer.respond();
        console.log("requestBoday");
        console.log(fakeServer);
        console.log(_.last(fakeServer.requests).requestBody);
        console.log(view.el.html);
        return expect(view.$('[data-id=guess-0]').html()).toBe('1111');
      });
      xit('inserts feedback into table', function() {
        var view;
        view = renderMastermindView();
        playRoundOfGame('BBW', view, '0037');
        return expect(view.$('[data-id=feedback-0]').html()).toBe('BBW');
      });
      xit('gives correct feedback when a win occurs', function() {
        var view;
        view = renderMastermindView();
        playRoundOfGame('Victory', view, '0043');
        return expect(view.$('[data-id=feedback-0]').html()).toBe('Victory');
      });
      return xit('gives correct feedback when a lose occurs', function() {
        var view, _i;
        view = renderMastermindView();
        for (_i = 0; _i <= 9; _i++) {
          playRoundOfGame('', view, '1111');
        }
        return expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over 0043');
      });
    });
  });

}).call(this);
