class Board

  build: (size) ->
    tableSetup = """
                 <div> 
                   <table class='game' data-id='game-table'>
                     <tr>
                       <th>Guess</th>
                       <th>Feedback</th>
                     </tr>
                 """
    cells = """"""
    tableClose = """
                   </table>
                   <form name='mm-form' data-id='mm-form'>
                     <input data-id='guess-input' name='guess-input'/>
                   </form>
                   <div data-id='click-buttons'>
                     <button data-id='guess-button' type='button'>Guess</button>
                     <button data-id='reset-button' type='button'>New Game</button>
                   </div>
                 </div>
                 """
    while size >= 0
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
