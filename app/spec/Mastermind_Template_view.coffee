describe 'Mastermind_Template_View', ->

  renderTemplateView = () ->

  mockResponse = (data, url, method='GET', status=200, headers={'Content-Type': 'application/json'}) ->
    fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)])

  beforeEach ->
    fakeServer = sinon.fakeServer.create()

  afterEach ->
    fakeServer.restore()

  describe 'api call', ->

    it 'hits correct url', ->
      view = renderTemplateViewView()
      gameDTO = {id: '00000000-0000-0000-0000-000000000000', turnNumber: 0, code: '1234', guess: '', gameFeedback: '', isWin: false, isLoss: false}
      mockResponse(gameDTO, 'api/CreateGame', 'POST')
      view.$('[data-id=make-guess]').click()
      fakeServer.respond()

      expect(fakeServer.requests[0].url).toBe('api/Game/00000000-0000-0000-000000000000')
