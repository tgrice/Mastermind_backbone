class Board

  build: (size) ->
    tableSetup = """
                   <table class='game' data-id='game-table'>
                     <tr>
                       <th>Guess</th>
                       <th>Feedback</th>
                     </tr>
                 """
    cells = """"""
    tableClose = """
                   </table>
                 """
    while size > 0
      cells +=
        """
        <tr>
          <td class='guess' data-id='guess-""" + size + """'></td>
          <td class='feedback' data-id='feedback-""" + size + """'></td>
        </tr>
        """
      size--
    tableSetup + cells + tableClose

window.Board = Board
