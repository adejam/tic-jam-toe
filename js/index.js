const board = (playerOneBoard, playerTwoBoard) => ({
  playerOneBoard,
  playerTwoBoard,
});

const boxes = Array.from(document.querySelectorAll('.box'));
const playGame = document.querySelector('#playGame');

function whosTurn() {
  // body...
}

function startGame() {
  document.querySelector('.statusPanel').style.display = 'none';
  for (let i = 0; i < boxes.length; i += 1) {
    boxes[i].addEventListener('click', whosTurn, false);
  }
}

playGame.addEventListener('click', startGame);
