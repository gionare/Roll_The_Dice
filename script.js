'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//declaring variables
let scores, currentScore, activePlayer, playing;

// initialization function
const init = function () {
  // following 5line vaiables get scoped coz variables has been assigned
  // in the function and dsnt had declaration outside. after it has been created
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // sett curent scores to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  // sett total score to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // appear dice roll
  diceEl.classList.add('hidden');
  // remove dark color of winner
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // set player 1 as starting player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
};

init();

//switch to next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //using turnary operator
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// roling button functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll, from 1 to inc. 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; //display image according to dice number

    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice; //add dice to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      current0El.textContent = currentScore; //Change later
    } else {
      //switch to next player /-update- took it as an function
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current sore to active players score
    //scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    console.log('current score ' + scores[activePlayer]);
    //display
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >=100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch next player
      switchPlayer();
    }
  }
});

//after pressing new game
// using init function, initialization
btnNew.addEventListener('click', init);
