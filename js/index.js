const board = (playerOneBoard, playerTwoBoard) => ({
  playerOneBoard,
  playerTwoBoard,
});

const originalBoard = [];
const playerOne = 'X';
const playerTwo = 'O';
const boxes = Array.from(document.querySelectorAll('.box'));
const playGame = document.querySelector('#playGame');

function playerTurn(id, player) {
  // body...
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
