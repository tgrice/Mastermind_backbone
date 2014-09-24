describe 'MastermindView', ->
  fakeServer = null

  renderMastermindView = ->
    game = new Backbone.Model
      id: '00000000-0000-0000-0000-000000000000'
      turnNumber: 0
      code: '0043'
      guess: ''
      gameFeedback: ''
      isWin: false
      isLoss: false
    view  = new MastermindView
      model: game
    view.render()

  mockResponse = (data, url, method='GET', status=200, headers={'Content-Type': 'application/json'}) ->
    fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)])

  playRoundOfGame = (expectedFeedback, view, guess) ->
    view.$('[data-id=guess-input]').val(guess)
    mockResponse(expectedFeedback, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT')
    view.$('[data-id=guess-button]').click()
    fakeServer.respond()

  createTurnObject = (id, turnNumber, code, guess, isWin, isLoss) ->
    {id: id, turnNumber: turnNumber, code: code, guess: guess, isIwn: isWin, isLoss: isLoss}

  beforeEach ->
    fakeServer = sinon.fakeServer.create()

  afterEach ->
    fakeServer.restore()

  it 'renders template', ->
    view = renderMastermindView()
    expect(view.$('[data-id=game-table]')).toExist()

  describe 'clicking reset', ->

    it 'resets board', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'B', turnNumber: 1, isWin: false, isLoss: false}
      playRoundOfGame(mastermindGame, view, '0222')

      expect(view.$('[data-id=guess-0]').html()).toBe('0222')
      expect(view.$('[data-id=feedback-0]').html()).toBe('B')

      Game = {id: 'be5eb589-64db-416e-8ef2-222549d50a79', turnNumber: 0, code: '1234', guess: '', gameFeedback: '', isWin: false, isLoss: false}
      mockResponse(Game, 'api/CreateGame', 'POST')
      view.$('[data-id=reset-button]').click()
      fakeServer.respond()

      expect(view.$('.guess').html()).toBe('')
      expect(view.$('.feedback').html()).toBe('')

    it 'creates new game', ->
      view = renderMastermindView()
      mastermindGameDTO = {id: 'be5eb589-64db-416e-8ef2-222549d50a79', turnNumber: 0, code: '1234', guess: '', gameFeedback: '', isWin: false, isLoss: false}
      mockResponse(mastermindGameDTO, 'api/CreateGame', 'POST')
      view.$('[data-id=reset-button]').click()
      fakeServer.respond()

      expect(fakeServer.requests[0].url).toBe('api/CreateGame')

  describe 'clicking guess', ->

    it 'inserts guess into table', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: '', turnNumber: 1, isWin: false, isLoss: false}
      playRoundOfGame(mastermindGame, view, '1111')

      expect(view.$('[data-id=guess-0]').html()).toBe('1111')

    it 'inserts feedback into table', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'BBW', turnNumber: 1, isWin: false, isLoss: false}
      playRoundOfGame(mastermindGame, view, '0037')

      expect(view.$('[data-id=feedback-0]').html()).toBe('BBW')

    it 'gives correct feedback when a win occurs', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'Victory!', turnNumber: 1, isWin: false, isLoss: false}
      playRoundOfGame(mastermindGame, view, '0043')

      expect(view.$('[data-id=feedback-0]').html()).toBe('Victory!')

    it 'gives correct feedback when a lose occurs', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'Game Over!/nCode:0043', turnNumber: 9, isWin: false, isLoss: false}
      playRoundOfGame(mastermindGame, view, '1111') for [0..9]

      expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over!/nCode:0043')

    it 'disables the guess button when a loss occurs', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'Game Over!/nCode:0043', turnNumber: 9, isWin: false, isLoss: true}
      playRoundOfGame(mastermindGame, view, '1111') for [0..9]

      expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled')

    it 'disables the guess button when a win occurs', ->
      view = renderMastermindView()
      mastermindGame = {gameFeedback: 'Victory!', turnNumber: 1, isWin: true, isLoss: false}
      playRoundOfGame(mastermindGame, view, '1111') for [0..9]

      expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled')

  describe 'guess input vaidation', ->

    it 'does not allow a guess shorter than 4 digits', ->
      view = renderMastermindView()
      view.$('[data-id=guess-input]').val('123')

      expect(view.isValid()).toBe(false)


























