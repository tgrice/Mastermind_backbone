(function() {
  var BoardView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BoardView = (function(_super) {
    __extends(BoardView, _super);

    function BoardView() {
      _ref = BoardView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardView.prototype.render = function(turns) {
      var board;
      board = new Board();
      this.$el.html(board.build(this.options.turns));
      return this;
    };

    BoardView.prototype.addGuess = function(turnNumber, guess) {
      return this.$('[data-id=guess-' + turnNumber + ']').html(guess);
    };

    BoardView.prototype.addFeedback = function(turnNumber, feedback) {
      return this.$('[data-id=feedback-' + turnNumber + ']').html(feedback);
    };

    return BoardView;

  })(Backbone.View);

  window.BoardView = BoardView;

}).call(this);
