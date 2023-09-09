'use strict';

// Store the selection into variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
	modal.classList.remove('hidden'); // Remove class from element.
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

// Implement the open buttons
console.log(btnsOpenModal);
for (let i = 0; i < btnsOpenModal.length; i++)
	btnsOpenModal[i].addEventListener('click', openModal);

// Imnplement the close button and close when click overlay
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Handling key press event
// Keypress event are global events, so we will list on the whole document.
document.addEventListener('keydown', function (event) {
	console.log(event);

	if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});
