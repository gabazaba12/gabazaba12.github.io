document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let difficultyLevel;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(e) {
        const index = e.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            checkWinner();
            if (gameActive) {
                togglePlayer();
                if (currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 500);
                }
            }
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                result.textContent = `${currentPlayer} wins!`;
                gameActive = false;
                highlightWinner(pattern);
                break;
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            result.textContent = 'It\'s a tie!';
            gameActive = false;
        }
    }

    function highlightWinner(pattern) {
        for (let index of pattern) {
            cells[index].style.backgroundColor = '#aaffaa';
        }
    }

    function makeComputerMove() {
        switch (difficultyLevel) {
            case 'easy':
                makeRandomMove();
                break;
            case 'medium':
                makeSmartMove();
                break;
            case 'hard':
                makeBestMove();
                break;
        }

        checkWinner();
        togglePlayer();
    }

    function makeRandomMove() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
            if (value === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const move = emptyCells[randomIndex];

        gameBoard[move] = currentPlayer;
        cells[move].textContent = currentPlayer;
    }

    function makeSmartMove() {
        // Add logic for medium difficulty (if desired)
        makeRandomMove();
    }

    function makeBestMove() {
        // Add logic for hard difficulty (if desired)
        makeRandomMove();
    }

    function setDifficulty(level) {
        difficultyLevel = level;
    }

    // Example: Set difficulty level to 'easy'
    setDifficulty('easy');
});
