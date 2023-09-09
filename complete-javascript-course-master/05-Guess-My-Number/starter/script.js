'use strict';

// Select element in html
// The way to select elements will be the same as in CSS.
// `.name` => select elements with the same class
// `#name` => select element with id
// `*` to select all
// name => to select all element with same name

/*
console.log(document.querySelector('.message').textContent);
// `querySelector()` method to select elements.

document.querySelector('.message').textContent = '🤩 Correct Number!';
// Manipulate the text content.
console.log(document.querySelector('.message').textContent);

// `.textContent` property to access the tetContent.
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// `.value` property to get the value of input elements
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20; // Declare the score in javascript code as variable so that it not only exist in DOM but also can be use later. This kind of variables also called state variable => All data reletive to the application.
let highScore = 0;

// Refactor functionality into functions
const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
};

//! event listener
document.querySelector('.check').addEventListener('click', function () {
	const guess = Number(document.querySelector('.guess').value);
	// Store the value into a variable.
	console.log(guess, typeof guess);

	if (!guess) {
		// Give a message in the message element when there's no input.
		// document.querySelector('.message').textContent = '❌ No number!';
		displayMessage('❌ No number!');
	} else if (guess === secretNumber) {
		// document.querySelector('.message').textContent = '🤩 Correct Number!';
		displayMessage('🤩 Correct Number!');
		document.querySelector('.number').textContent = secretNumber;

		// DOM also include CSS style, so that we can change the stype in Javascript

		// When players wins
		document.querySelector('body').style.backgroundColor = '#60b347'; //change the background color into green.
		document.querySelector('.number').style.width = '30rem';

		// Implement the highscore button
		if (score > highScore) {
			highScore = score;
			document.querySelector('.highscore').textContent = highScore;
		}

		//! When guess is wrong, refactor the code using ternary operator
	} else if (guess !== secretNumber) {
		if (score > 1) {
			// document.querySelector('.message').textContent =
			// 	guess > secretNumber ? '⬆️ Too high!' : '↘️↘️↘️ Too low!';
			displayMessage(guess > secretNumber ? '⬆️ Too high!' : '↘️↘️↘️ Too low!');
			score--;
			document.querySelector('.score').textContent = score;
		} else {
			// document.querySelector('.message').textContent = '🚫 You lost the game';
			displayMessage('🚫 You lost the game');
			document.querySelector('.score').textContent = 0;
		}
	}
	// // When guess is to high
	// } else if (guess > secretNumber) {
	// 	if (score > 1) {
	// 		document.querySelector('.message').textContent = '⬆️ Too high!';
	// 		score--;
	// 		document.querySelector('.score').textContent = score;
	// 	} else {
	// 		document.querySelector('.message').textContent = '🚫 You lost the game';
	// 		document.querySelector('.score').textContent = 0;
	// 	}

	// 	// When guess is too low
	// } else if (guess < secretNumber) {
	// 	if (score > 1) {
	// 		document.querySelector('.message').textContent = '↘️↘️↘️ Too low!';
	// 		score--;
	// 		document.querySelector('.score').textContent = score;
	// 	} else {
	// 		document.querySelector('.message').textContent = '🚫 You lost the game';
	// 		document.querySelector('.score').textContent = 0;
	// 	}
});
// Select the button element, use `.addEventListener()` method on that element to attach an eventHandler. And the eventHandler is the function which will be execute when ever the event happened.

// Implement the again button//
document.querySelector('.again').addEventListener('click', function () {
	score = 20;
	secretNumber = Math.trunc(Math.random() * 20) + 1;
	document.querySelector('.score').textContent = score;
	document.querySelector('.number').textContent = '?';
	// document.querySelector('.message').textContent = 'start guessing...';
	displayMessage('start guessing...');
	document.querySelector('.number').style.width = '15rem';
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.guess').value = '';
});

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)
*/

// Implement Highscore Button
