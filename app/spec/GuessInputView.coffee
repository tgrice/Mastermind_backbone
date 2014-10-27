describe 'GuessInputView', ->
  fakeServer = null

  renderGuessInputView = ->
    boardView = new BoardView(turns: 8)
    gameDTO =
      Id: '00000000-0000-0000-0000-000000000000'
      code: '0043'
      gameFeedback: ''
      guess: ''
      isLoss: false
      isWin: false
      numOfTurns: 8
      turnNumber: 0
    view = new GuessInputView(boardView: boardView, gameDTO: gameDTO)
    view.render()

  mockResponse = (data, url, method='GET', status=200, headers={'Content-Type': 'application/json'}) ->
    fakeServer.respondWith(method, url, [status, headers, JSON.stringify(data)])

  beforeEach ->
    fakeServer = sinon.fakeServer.create()

  afterEach ->
    fakeServer.restore()

  it 'renders template', ->
    view = renderGuessInputView()
    expect(view.$('[data-id=mm-form]')).toExist()

  describe 'input validation', ->

    xit 'does not allow an input shorter than 4 characters', ->
      view = renderGuessInputView()

      view.$('[data-id=guessInput]').val('123')
      view.$('[data-id=guess-button]').click()

      expect(view.isValid()).toBe(false)

    xit 'does not allow an input longer than 4 characters', ->
      view = renderGuessInputView()

      view.$('[data-id=guessInput]').val('12345')
      view.$('[data-id=guess-button]').click()

      expect(view.isValid()).toBe(false)

    xit 'does not allow an input that is not a number', ->
      view = renderGuessInputView()

      view.$('[data-id=guessInput]').val('123a')
      view.$('[data-id=guess-button]').click()

      expect(view.isValid()).toBe(false)

  describe 'clicking guess', ->

    it 'gives correct feedback when a win occurs', ->
      view = renderGuessInputView()
      mastermindGame =
        gameFeedback: 'Victory!'
        turnNumber: 8
        isWin: true
        isLoss: false
      mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT')
      view.$('[data-id=guess-button]').click()
      fakeServer.respond()

      console.log view

      expect(view.$('[data-id=feedback-1]').html()).toBe('Victory!')

    xit 'gives correct feedback when a lose occurs', ->
      view = renderGuessInputView()
      mastermindGame =
        gameFeedback: 'Game Over!/nCode:0043!'
        turnNumber: 8
        isWin: false
        isLoss: true
      playRoundOfGame(mastermindGame, view, '1111') for [0..9]

      expect(view.$('[data-id=feedback-9]').html()).toBe('Game Over!/nCode:0043')

    it 'disables the guess button when a loss occurs', ->
      view = renderGuessInputView()
      mastermindGame = {gameFeedback: 'Game Over!/nCode:0043', turnNumber: 8, isWin: false, isLoss: true}
      mastermindGame =
        gameFeedback: 'Victory!'
        turnNumber: 8
        isWin: false
        isLoss: true
      mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT')
      view.$('[data-id=guess-button]').click()
      fakeServer.respond()

      expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled')

    it 'disables the guess button when a win occurs', ->
      view = renderGuessInputView()
      mastermindGame =
        gameFeedback: 'Victory!'
        turnNumber: 8
        isWin: true
        isLoss: false
      mockResponse(mastermindGame, 'api/game/00000000-0000-0000-0000-000000000000', 'PUT')
      view.$('[data-id=guess-button]').click()
      fakeServer.respond()

      expect(view.$('[data-id=guess-button]').attr('disabled')).toBe('disabled')

  describe 'api call', ->

    it 'hits correct url', ->
      view = renderGuessInputView()
      gameDTO = 
        id: '00000000-0000-0000-0000-000000000000'
        turnNumber: 0
        code: '1234'
        guess: ''
        gameFeedback: ''
        isWin: false
        isLoss: false
      mockResponse(gameDTO, 'api/CreateGame', 'POST')
      view.$('[data-id=make-guess]').click()
      fakeServer.respond()

      expect(fakeServer.requests[0].url).toBe('api/Game/00000000-0000-0000-000000000000')

