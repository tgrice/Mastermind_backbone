(function() {
  var Board;

  Board = (function() {
    function Board() {}

    Board.prototype.build = function(size) {
      var cells, tableClose, tableSetup;
      tableSetup = "<div> \n  <table class='game' data-id='game-table'>\n    <tr>\n      <th>Guess</th>\n      <th>Feedback</th>\n    </tr>";
      cells = "";
      tableClose = "  </table>\n  <form name='mm-form' data-id='mm-form'>\n    <input data-id='guess-input' name='guess-input'/>\n  </form>\n  <div data-id='click-buttons'>\n    <button data-id='guess-button' type='button'>Guess</button>\n    <button data-id='reset-button' type='button'>New Game</button>\n  </div>\n</div>";
      while (size >= 0) {
        cells += "<tr>\n  <td class='guess' data-id='guess-" + size + "'></td>\n<td class='feedback' data-id='feedback-" + size + "'></td>\n</tr>";
        size--;
      }
      return tableSetup + cells + tableClose;
    };

    return Board;

  })();

  window.Board = Board;

}).call(this);
