'use strict';

var buttonNewGame = document.getElementById('new-game');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var numberOfGames = document.getElementById('games');
var output = document.getElementById('output');
var outputResult = document.getElementById('result');
var outputEndOfGame = document.getElementById('end-game');
var modal = document.getElementById('modal');

var player = {
  score: 0,
  choice: ''
};

var computer = {
  score: 0,
  choice: ''
};

var params = {
  playerWins: 0,
  compWins: 0,
  gameLength: 0,
  progress: []
};

var newGame = function() {
  output.innerHTML = '';
  scoresResult();
  outputEndOfGame.innerHTML = '';
};

buttonNewGame.addEventListener('click', function() {
  resetGame();
  newGame();
  params.gameLength = window.prompt('How many games we play?');
  if (!params.gameLength || isNaN(params.gameLength)) {
    numberOfGames.innerHTML = '<br> Enter the number!' + '<br>';
    disableButtons(true);
  } else {
    numberOfGames.innerHTML = '<br> You have to win: <strong>[ ' + params.gameLength + ' ]</strong> times to end the game!';
    buttonNewGame.disabled = true;
    disableButtons(false);
  }
});

function disableButtons(flag) {
  buttonPaper.disabled = flag;
  buttonRock.disabled = flag;
  buttonScissors.disabled = flag;
}
disableButtons(true);

var randomMove = function() {
  var compChoices = ['Paper', 'Rock', 'Scissors'];
  var compMove = Math.floor(Math.random() * 3);
  console.log('compChoice: ', compChoices[compMove]);
  return compChoices[compMove];
};


var playerMove = function(userMove) {
  player.choice = userMove;
  computer.choice = randomMove();
  var compareResult = compare();
  resultOutput(compareResult);
  scoresResult();
  addRecord();
  endOfGame();
};

var buttonPlayerMove = document.querySelectorAll('.player-move');
//console.log('tablica: ', buttonPlayerMove);  
for (var i = 0; i < buttonPlayerMove.length; i++) {
  buttonPlayerMove[i].addEventListener('click', function() {
    //console.log(this.getAttribute('data-move'));
    playerMove(this.getAttribute('data-move'));
  });
}

var compare = function() {
  if (player.choice === computer.choice) {
      return 'Draw! ';
  } else if ((player.choice === 'Paper') && (computer.choice == 'Rock') ||
             (player.choice === 'Rock') && (computer.choice == 'Scissors') ||
             (player.choice === 'Scissors') && (computer.choice == 'Paper')) {
      player.score++;
      return 'You Won! ';
  } else {
      computer.score++;
      return 'You Lost! ';
      }
};

var scoresResult = function() {
  outputResult.innerHTML = 'Player >>>> <strong>' + player.score +  ' vs ' + computer.score + '</strong> <<<< Computer <br><br>';
};

var resetGame = function() {
  player.score = 0;
  computer.score = 0;
  params = {
    playerWins: 0,
    compWins: 0,
    gameLength: 0,
    progress: [],
  };
};

function resultOutput(compareResult) {
  output.innerHTML = compareResult + "you pick: " + player.choice + " computer pick: " + computer.choice + " <br><br>";
}

function endOfGame() {
  if (params.gameLength == player.score) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    createModal();
    showModal();
    outputEndOfGame.innerHTML = '<strong>YOU ARE A WINNER OF THIS GAME!</strong> <br><br> TO PLAY AGAIN SELECT: <strong>START NEW GAME</strong>';
  } else if (params.gameLength == computer.score) {
    buttonNewGame.disabled = false;
    disableButtons(true);
    createModal();
    showModal();
    outputEndOfGame.innerHTML = '<strong>YOU LOSE! COMPUTER HAS WINS THIS GAME!</strong> <br><br> TO PLAY AGAIN SELECT <strong>START NEW GAME</strong>';
  }
}

function createModal() {
  var modal = document.querySelectorAll('.modal .content');
  var newHTML = '<table><thead><tr><th>Rounds | </th><th>Your Move | </th><th>Computer Move | </th><th>Round Result | </th><th></tr></thead><tbody>';
  for (i = 0; i < params.progress.length; i++) {
      newHTML += '<tr><td>' +
          params.progress[i].rounds + '</td><td>' +
          params.progress[i].playerChoice + '</td><td>' +
          params.progress[i].computerChoice + '</td><td>' +
          params.progress[i].playerScore + ' : ' + params.progress[i].computerScores + '</td></tr>'
  }
  newHTML += '</tbody></table>';
  console.log(newHTML);
  modal[0].innerHTML = newHTML;
}

function addRecord() {
  params.progress.push({
      rounds: (params.gameLength),
      playerScore: (player.score),
      computerScores: (computer.score),
      playerChoice: (player.choice),
      computerChoice: (computer.choice)
  })
  console.log('progres: ', params.progress);
}


var showModal = function(event){
    document.querySelector('#modal-overlay').classList.add('show');
};
 

var hideModal = function(event){
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButton = document.querySelectorAll('.modal .close');

//for(var i = 0; i < closeButtons.length; i++){
  closeButton[0].addEventListener('click', hideModal);