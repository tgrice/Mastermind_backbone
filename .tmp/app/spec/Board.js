(function() {
  describe('Board', function() {
    return it('board to build', function() {
      var board;
      board = new Board();
      return expect(board.build(2)).not.toBeEmpty();
    });
  });

}).call(this);
