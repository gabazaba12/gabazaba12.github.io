document.addEventListener('DOMContentLoaded', function () {
    const modeSelection = document.getElementById('modeSelection');
    const gameContainer = document.getElementById('gameContainer');
    const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
    const playerVsComputerBtn = document.getElementById('playerVsComputerBtn');
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let cells = Array.from({ length: 9 }, () => '');
    let gameMode = null;

    playerVsPlayerBtn.addEventListener('click', () => startGame('playerVsPlayer'));
    playerVsComputerBtn.addEventListener('click', () => startGame('playerVsComputer'));

    resetBtn.addEventListener('click', resetGame);

    function startGame(mode) {
        gameMode = mode;
        modeSelection.style.display = 'none';
        gameContainer.style.display = 'block';

        board.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }

        if (gameMode === 'playerVsComputer' && currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500);
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (cells[index] === '' && !result.textContent) {
            cells[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWinner()) {
                result.textContent = `Gracz ${currentPlayer} wygrywa!`;
            } else if (cells.every(cell => cell !== '')) {
                result.textContent = 'Remis!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                if (gameMode === 'playerVsComputer' && currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 500);
                }
            }
        }
    }

    function makeComputerMove() {
        const emptyCells = cells.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        cells[computerMove] = 'O';
        document.querySelector(`.cell[data-index="${computerMove}"]`).textContent = 'O';

        if (checkWinner()) {
            result.textContent = 'Komputer wygrywa!';
        } else if (cells.every(cell => cell !== '')) {
            result.textContent = 'Remis!';
        } else {
            currentPlayer = 'X';
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c];
        });
    }

    function resetGame() {
        cells = Array.from({ length: 9 }, () => '');
        currentPlayer = 'X';
        result.textContent = '';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });

        modeSelection.style.display = 'flex';
        gameContainer.style.display = 'none';
    }
});
