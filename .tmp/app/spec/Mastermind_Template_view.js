(function() {
  describe('Mastermind_Template_View', function() {
    var mockResponse, renderTemplateView;
    renderTemplateView = function() {};
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
      var fakeServer;
      return fakeServer = sinon.fakeServer.create();
    });
    afterEach(function() {
      return fakeServer.restore();
    });
    return describe('api call', function() {
      return it('hits correct url', function() {
        var gameDTO, view;
        view = renderTemplateViewView();
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
