const board = (playerOneBoard, playerTwoBoard) => ({
  playerOneBoard,
  playerTwoBoard,
});

const p1 = [];
const p2 = [];
const newBoard = board(p1, p2);
const originalBoard = [];
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

function gameOver(playerWins) {
  playerWins.winArray.forEach(winArray => {
    if (playerWins.player === playerOne) {
      document.getElementById(winArray).style.backgroundColor = '#28a745';
      document.querySelector('.statusPanel').style.display = 'block';
      document.querySelector('.text').innerText = 'Player One Wins!';
    } else {
      document.getElementById(winArray).style.backgroundColor = '#17a2b8';
      document.querySelector('.statusPanel').style.display = 'block';
      document.querySelector('.text').innerText = 'Player Two Wins!';
    }
  });
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].removeEventListener('click', whosTurn);
  }
}

function checkForWin(playerBoard, player) {
  if (originalBoard.length < 9) {
    let winCount = 0;
    for (let i = 0; i < winAlgorithms.length; i += 1) {
      const winArray = winAlgorithms[i];
      if (checker(playerBoard, winArray) === true) {
        winCount += 1;
        playerWins = { winArray, player };
      }
    }
    if (winCount === 1) {
      gameOver(playerWins);
    } else {
      for (let i = 0; i < boxes.length; i += 1) {
        boxes[i].addEventListener('click', whosTurn);
      }
    }
  } else {
    let winCount = 0;
    for (let i = 0; i < winAlgorithms.length; i += 1) {
      const winArray = winAlgorithms[i];
      if (checker(playerBoard, winArray) === true) {
        winCount += 1;
        playerWins = { winArray, player };
      }
    }
    if (winCount === 1) {
      gameOver(playerWins);
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

function playerTurn(id, player) {
  if (boxes[id].innerText === '') {
    if (player === playerOne) {
      id = parseInt(id, 10);
      newBoard.playerOneBoard.push(id);
      originalBoard.push(id);
      document.getElementById(id).innerText = player;
      checkForWin(newBoard.playerOneBoard, player);
    } else {
      id = parseInt(id, 10);
      newBoard.playerTwoBoard.push(id);
      originalBoard.push(id);
      document.getElementById(id).innerText = player;
      checkForWin(newBoard.playerTwoBoard, player);
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
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].addEventListener('click', whosTurn);
  }
}

playGame.addEventListener('click', startGame);
