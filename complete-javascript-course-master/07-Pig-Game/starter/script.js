'use strict';

// Select elements and store in variables.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
};
init();

// // Declare variables to store data.
// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;

// // Declare a state variable to store the game status
// let playing = true;

// Declare functions
const switchPlayer = function () {
	// Switch to next player
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	// Use ternary operator to switch player
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// Starting conditions.
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Roll the dice functionality.
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. display the dice (change the img source)
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		// 3. Ckeck for rolled 1: if true, switch to next player,
		// if false add dice roll to current score
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchPlayer();
		}
	}
});

// Implement the function of hold the score.
btnHold.addEventListener('click', function () {
	if (playing) {
		// 1. Add current score to active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		// 2. check if player's score is >= 100
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
			// Switch to the next player
			switchPlayer();
		}
	}
});

// Implement the NEW GAME button
btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function () {
// 	playing = true;
// 	activePlayer = 0;
// 	currentScore = 0;
// 	current0El.textContent = 0;
// 	current1El.textContent = 0;
// 	score0El.textContent = 0;
// 	score1El.textContent = 0;
// 	diceEl.classList.add('hidden');

// 	if (player0El.classList.contains('player--winner')) {
// 		player0El.classList.remove('player--winner');
// 	}
// 	if (player1El.classList.contains('player--winner')) {
// 		player1El.classList.remove('player--winner');
// 	}
// 	if (player0El.classList.contains('player--active')) {
// 		player0El.classList.remove('player--active');
// 	}
// 	if (player1El.classList.contains('player--active')) {
// 		player1El.classList.remove('player--active');
// 	}
// 	player0El.classList.add('player--active');
// });
