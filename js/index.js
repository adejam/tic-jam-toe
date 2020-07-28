const board = (playerOneBoard, playerTwoBoard) => ({
  playerOneBoard,
  playerTwoBoard,
});

const p1 = [];
const p2 = [];
let newBoard = board(p1, p2);
let originalBoard = [];
const playerOne = 'X';
const playerTwo = 'O';
const boxes = Array.from(document.querySelectorAll('.box'));
const playGame = document.querySelector('#playGame');
const winAlgorithms = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
let playerWins = {};
const checker = (playerBoard, winArray) => winArray.every(v => playerBoard.includes(v));

function gameOverResult(winArray, color, display, winText) {
  document.getElementById(winArray).style.backgroundColor = color;
  document.querySelector('.statusPanel').style.display = display;
  document.querySelector('.text').innerText = winText;
}
function gameOver(playerWins) {
  playerWins.winArray.forEach(winArray => {
    if (playerWins.player === playerOne) {
      gameOverResult(winArray, '#28a745', 'block', 'Player One Wins!');
    } else {
      gameOverResult(winArray, '#17a2b8', 'block', 'Player Two Wins!');
    }
  });
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].removeEventListener('click', whosTurn);
  }
}

function checkForWinChecker(winAlgorithms, checker, playerBoard, player) {
  let winCount = 0;
  for (let i = 0; i < winAlgorithms.length; i += 1) {
    const winArray = winAlgorithms[i];
    if (checker(playerBoard, winArray) === true) {
      winCount += 1;
      playerWins = { winArray, player };
    }
  }
  return { winCount, playerWins };
}

function checkForWin(playerBoard, player) {
  if (originalBoard.length < 9) {
    const check = checkForWinChecker(winAlgorithms, checker, playerBoard, player);
    if (check.winCount === 1) {
      gameOver(check.playerWins);
    } else {
      for (let i = 0; i < boxes.length; i += 1) {
        boxes[i].addEventListener('click', whosTurn);
      }
    }
  } else {
    const check = checkForWinChecker(winAlgorithms, checker, playerBoard, player);
    if (check.winCount === 1) {
      gameOver(check.playerWins);
    } else {
      for (let i = 0; i < boxes.length; i += 1) {
        boxes[i].removeEventListener('click', whosTurn);
        boxes[i].style.backgroundColor = '#ffc107';
      }
      document.querySelector('.statusPanel').style.display = 'block';
      document.querySelector('.text').innerText = 'Its a Tie!';
    }
  }
}

function dryPlayerTurn(id, player, thePlayerBoard) {
  thePlayerBoard.push(id);
  originalBoard.push(id);
  document.getElementById(id).innerText = player;
  checkForWin(thePlayerBoard, player);
}

function playerTurn(id, player) {
  if (boxes[id].innerText === '') {
    id = parseInt(id, 10);
    if (player === playerOne) {
      dryPlayerTurn(id, player, newBoard.playerOneBoard);
    } else {
      dryPlayerTurn(id, player, newBoard.playerTwoBoard);
    }
  }
}

function whosTurn(box) {
  if (originalBoard.length % 2 === 0) {
    playerTurn(box.target.id, playerOne);
  } else {
    playerTurn(box.target.id, playerTwo);
  }
}

function startGame() {
  document.querySelector('.statusPanel').style.display = 'none';
  newBoard = board([], []);
  playerWins = {};
  originalBoard = [];
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].innerText = '';
    boxes[i].style.removeProperty('background-color');
    boxes[i].addEventListener('click', whosTurn);
  }
}

playGame.addEventListener('click', startGame);
