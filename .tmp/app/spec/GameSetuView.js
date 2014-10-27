(function() {
  describe('GameSetupView', function() {
    return it('renders template', function() {
      var view;
      view = renderMastermindView();
      return expect(view.$('[data-id=game-table]')).toExist();
    });
  });

}).call(this);
