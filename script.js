document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
  
    function checkWinner() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return true;
        }
      }
  
      return false;
    }
  
    function checkDraw() {
      return !gameBoard.includes('');
    }
  
    function handleClick(index) {
      if (gameBoard[index] === '' && !checkWinner() && !checkDraw()) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
          alert(`Player ${currentPlayer} wins!`);
        } else if (checkDraw()) {
          alert('It\'s a draw!');
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  
    function renderBoard() {
      board.innerHTML = '';
      gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
      });
    }
  
    renderBoard();
  });
  