(function() {
  describe('BoardView', function() {
    var renderBoardView;
    renderBoardView = function() {
      var turns, view;
      turns = 2;
      view = new BoardView({
        turns: turns
      });
      return view.render();
    };
    return it('renders template', function() {
      var view;
      view = renderBoardView();
      return expect(view.$('[data-id=game-table]')).toExist();
    });
  });

}).call(this);
