/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
const board = (playerOneBoard, playerTwoBoard) => ({
  playerOneBoard,
  playerTwoBoard,
});

const playerName = (playerOneName, playerTwoName) => ({
  playerOneName,
  playerTwoName,
});

const p1 = [];
const p2 = [];
let newBoard = board(p1, p2);
let originalBoard = [];
const playerOne = 'X';
const playerTwo = 'O';
let newNames;
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

let whosTurn;

const gameOverResult = (winArray, boxHover, color, display, winText) => {
  document.getElementById(winArray).classList.add(color);
  document.getElementById(winArray).classList.remove(boxHover);
  document.querySelector('#statusP').classList.remove(display);
  document.querySelector('.text').innerText = winText;
};
function gameOver(playerWins) {
  playerWins.winArray.forEach(winArray => {
    if (playerWins.player === playerOne) {
      const gameOverArray = [
        winArray,
        'boxHover',
        'bg_green',
        'd_none',
        `${newNames.playerOneName} Wins!`,
      ];
      gameOverResult(...gameOverArray);
    } else {
      const gameOverArray = [
        winArray,
        'boxHover',
        'bg_blue',
        'd_none',
        `${newNames.playerTwoName} Wins!`,
      ];
      gameOverResult(...gameOverArray);
    }
  });
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].removeEventListener('click', whosTurn);
  }
}

function checkForWinChecker(winAlgorithms, playerBoard, player) {
  const checker = (playerBoard, winArray) => winArray.every(v => playerBoard.includes(v));
  let winCount = false;
  for (let i = 0; i < winAlgorithms.length; i += 1) {
    const winArray = winAlgorithms[i];
    if (checker(playerBoard, winArray) === true) {
      winCount = true;
      playerWins = { winArray, player };
      break;
    }
  }
  return { winCount, playerWins };
}

function checkForWinTrue(winCount, playerWins) {
  if (winCount === true) {
    gameOver(playerWins);
  }
}

function checkForWin(playerBoard, player) {
  const check = checkForWinChecker(winAlgorithms, playerBoard, player);
  if (originalBoard.length < 9) {
    checkForWinTrue(check.winCount, check.playerWins);
    if (check.winCount === false) {
      for (let i = 0; i < boxes.length; i += 1) {
        boxes[i].addEventListener('click', whosTurn);
      }
    }
  } else {
    checkForWinTrue(check.winCount, check.playerWins);
    if (check.winCount === false) {
      for (let i = 0; i < boxes.length; i += 1) {
        boxes[i].removeEventListener('click', whosTurn);
        boxes[i].classList.remove('boxHover');
        boxes[i].classList.add('bg_warning');
      }
      document.querySelector('#statusP').classList.remove('d_none');
      document.querySelector('.text').innerText = 'Its a Tie!';
    }
  }
}

function PushToBoards(id, player, thePlayerBoard) {
  thePlayerBoard.push(id);
  originalBoard.push(id);
  document.getElementById(id).innerText = player;
  checkForWin(thePlayerBoard, player);
}

function playerTurn(id, player) {
  if (boxes[id].innerText === '') {
    id = parseInt(id, 10);
    const player1Array = [id, player, newBoard.playerOneBoard];
    const player2Array = [id, player, newBoard.playerTwoBoard];
    player === playerOne ? PushToBoards(...player1Array) : PushToBoards(...player2Array);
  }
}

whosTurn = ({ target: { id } }) => {
  originalBoard.length % 2 === 0 ? playerTurn(id, playerOne) : playerTurn(id, playerTwo);
};

function startGame(e) {
  e.preventDefault();
  document.querySelector('#statusP').classList.add('d_none');
  newBoard = board([], []);
  const playerOneName = document.querySelector('#playerOneName').value;
  const playerTwoName = document.querySelector('#playerTwoName').value;
  newNames = playerName(playerOneName, playerTwoName);
  playGame.reset();
  playerWins = {};
  originalBoard = [];

  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].innerText = '';
    boxes[i].classList.add('boxHover');
    if (boxes[i].classList.contains('bg_blue')) {
      boxes[i].classList.remove('bg_blue');
    } else if (boxes[i].classList.contains('bg_green')) {
      boxes[i].classList.remove('bg_green');
    } else if (boxes[i].classList.contains('bg_warning')) {
      boxes[i].classList.remove('bg_warning');
    }
    boxes[i].addEventListener('click', whosTurn);
  }
}

playGame.addEventListener('submit', startGame);
