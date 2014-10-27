(function() {
  var Board;

  Board = (function() {
    function Board() {}

    Board.prototype.build = function(size) {
      var cells, tableClose, tableSetup;
      tableSetup = "<table class='game' data-id='game-table'>\n  <tr>\n    <th>Guess</th>\n    <th>Feedback</th>\n  </tr>";
      cells = "";
      tableClose = "</table>";
      while (size > 0) {
        cells += "<tr>\n  <td class='guess' data-id='guess-" + size + "'></td>\n<td class='feedback' data-id='feedback-" + size + "'></td>\n</tr>";
        size--;
      }
      return tableSetup + cells + tableClose;
    };

    return Board;

  })();

  window.Board = Board;

}).call(this);
