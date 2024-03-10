const board = document.getElementById('game-board');
const resultElement = document.getElementById('result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let difficulty = 'medium'; // Default difficulty

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        switchPlayer();
        if (currentPlayer === 'O' && gameActive) {
            setTimeout(() => computerMove(), 500); // Delay computer move for better user experience
        }
    }
}

function computerMove() {
    let index;
    switch (difficulty) {
        case 'easy':
            index = getRandomEmptyCell();
            break;
        case 'medium':
            index = getMediumDifficultyMove();
            break;
        case 'hard':
            index = getHardDifficultyMove();
            break;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    switchPlayer();
}

function getRandomEmptyCell() {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function getMediumDifficultyMove() {
    return getRandomEmptyCell();
}

function getHardDifficultyMove() {
    // Implement your own logic for hard difficulty here
    // For simplicity, using medium difficulty logic in this example
    return getMediumDifficultyMove();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    // ... (unchanged)
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    resultElement.textContent = '';
    renderBoard();
}

// Set difficulty level
function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

// Initial render
renderBoard();
