describe 'MastermindView', ->
  fakeServer = null

  renderMastermindView = ->
    game = new Backbone.Model
      code: '0043'
      id: '00000000-0000-0000-0000-000000000000'
      turnNumber: 0
      guess: ''
      isWin: false
      isLoss: false
    view  = new MastermindView
      model: game
    view.render()

  mockResponse = (data, url, method='GET', status=200, headers={'application/json'}) ->
    fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)])

  playRoundOfGame = (expectedFeedback, view, guess) ->
    view.$('[data-id=guess-input]').val(guess)
    mockResponse(expectedFeedback, 'api/game/00000000-0000-0000-0000-000000000000?guess=' + guess + '&code=0043')
    view.$('[data-id=guess-button]').click()
    fakeServer.respond()

  createTurnObject = (id, turnNumber, code, guess, isWin, isLoss) ->
    {id: id, turnNumber: turnNumber, code: code, guess: guess, isIwn: isWin, isLoss: isLoss}

  beforeEach ->
    fakeServer = sinon.fakeServer.create()

  afterEach ->
    fakeServer.restore()

  xit 'renders template', ->
    view = renderMastermindView()
    expect(view.$('[data-id=game-table]')).toExist()

  describe 'clicking reset', ->

    xit 'resets board', ->
      view = renderMastermindView()
      playRoundOfGame('', view, '2222')
      view.$('[data-id=reset-button]').click()

      expect(view.$('.guess').html()).toBe('')
      expect(view.$('.feedback').html()).toBe('')

    xit 'creates new game and creates new secret code', ->
      view = renderMastermindView()
      mockResponse(createTurnObject(1, 0, '1234', '', false, false), 'api/CreateGame')
      view.$('[data-id=reset-button]').click()
      expect(fakeServer.requests[0].url).toBe('api/CreateGame')

  describe 'clicking guess', ->

    it 'inserts guess into table', ->
      view = renderMastermindView()
      #playRoundOfGame('', view, '1111')
      view.$('[data-id=guess-input]').val('1111')
      mockResponse({feedback: ''}, 'api/game/00000000-0000-0000-0000-000000000000?guess=1111', 'PUT')
      view.$('[data-id=guess-button]').click()
      fakeServer.respond()
      console.log "requestBoday"
      console.log fakeServer
      console.log _.last(fakeServer.requests).requestBody
      console.log view.el.html

      expect(view.$('[data-id=guess-0]').html()).toBe('1111')

    xit 'inserts feedback into table', ->
      view = renderMastermindView()
      playRoundOfGame('BBW', view, '0037')

      expect(view.$('[data-id=feedback-0]').html()).toBe('BBW')

    xit 'gives correct feedback when a win occurs', ->
      view = renderMastermindView()
      playRoundOfGame('Victory', view, '0043')

      expect(view.$('[data-id=feedback-0]').html()).toBe('Victory')

    xit 'gives correct feedback when a lose occurs', ->
      view = renderMastermindView()
      playRoundOfGame('', view, '1111') for [0..9]

      expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over 0043')

























