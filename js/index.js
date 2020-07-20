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

function checkForWin() {
  // body...
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
