'use strict';
/*
// Default Parameter

const bookings = [];
const createBooking = function (
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger // Directly add default value in the function `()`
) {
  // ES5
  //   numPassenger = numPassenger || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH23', 2, 800);
createBooking('LH23', 2);
createBooking('LH23', 5);
createBooking('LH123', undefined, 1000); // Skip a parameter by specify `undefined`


// Passing Argument to a function: Value (primitive) vs. Reference type.

const flight = 'LH123';
const sean = {
  name: 'Sean Lien',
  passport: 23837171,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 23837171) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, sean); // Checked in
console.log(flight); // LH123
console.log(sean);

// The mutation of argument in the function is the same as doing...
const flightNum = flight;
const passenger = sean;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
}; // Mutate the original object 

newPassport(sean);
checkIn(flight, sean); // Wrong pasport

// Passing by value vs. Passing by reference
// pass by value => pass the value only, the origianl will not be change
// pass by reference => passing the reference to the memory to function, 
// the original will be change

// Js does not have passing by reference, passing a object to a function is just
// passing a reference value of an object through passing by value, the reference of
// an object is also a value.


// First-Class function and Higher-Order functions


// Callback function
const oneWord = function (str) {
  return str.replace(/ /g, ''.toLowerCase());
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
  // function has properties since they are objects. here we use name
};
// Higher-order function
transformer('Javascipt is the best!', upperFirstWord); // Use callback function
console.log('');
transformer('Javascipt is the best!', oneWord); // Use callback function, don't use `()`.

// Js use callback function all the time
const high5 = function () {
  console.log('🖐️');
};
document.body.addEventListener('click', high5);
// `addEventListener` is the higher-order function
// `high5` is the callback function

['Jonas', 'Sean', 'Martha'].forEach(high5); // Use callback function in methods


// Returned function

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`); // This function is greeterHey
  };
};

const greeterHey = greet('Hey'); // This value is now a function
greeterHey('Sean');

greeterHey('Jonas'); // The following two is the same thing
greet('Hello')('Jonas');

// Convert to arrow function
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hi')('Jonas');


// The call and apply methods

const lufthansa = {
  airline: 'Lufthanse',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight
        ${this.iataCode}${flightNum}`);
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: `${name}`,
    });
  },
};

lufthansa.book(239, 'Sean Lien');
lufthansa.book(645, 'David Wang');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // Store function into a outside variable

// book(23, 'Peter Lee'); // Regular function call, this keyword = undefined

// 3 function methods to explicity tell the `this` keyword => call, apply, bind

// Use `call()` method to set the `this` keyword in the `book` function,
// to the first argumet we passed, the later arguments is just simply the argument
// pass to original function.
book.call(eurowings, 23, 'Sarah Williasm'); // `this` keyword point to eurowings
console.log(eurowings);

book.call(lufthansa, 239, 'Marry Cooper'); // 'this` keyword point to lufthansa
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airline',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'MarryCooper');
console.log(swiss);

// Use `apply` method, do the same thing,
// but `apply` method do not receive a list of argumet after the `this` keyword,
// but take an array of argument

const flightData = [583, 'Sam Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Use Spread to spread an array to perform same task by `call` method instead of `applly`
book.call(swiss, ...flightData); // Use Spread to spread an array to perform same task

// bind() method

// Manually set the `this` keyword for any function call, but bind does not immediatly
// call the function, instead it returns a new function, where the `this` keyword
// is bound.

// book.call(eurowings, 23, 'Sarah Williasm');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
// Use `bind` method to create a new function which `this` keyword ss specified.
bookEW(23, 'Steven William');
console.log(eurowings);

// Bind also take multiple argument, the first is to set the `this` keyword,
// the later arguments is simply just set the argument that pass to the original
// function in stone.
// Use bind to create new function just for eurowings fligh 99
const bookEW23 = book.bind(eurowings, 99);
// This is called, partial application => part of the arguments of the original
// function is already applied.

// Right now we only need to pass one argument
bookEW23('Ken He');
bookEW23('Martha Cooper');

// With event Listeners
lufthansa.planes = 300;
lufthansa.buyplane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyplane.bind(lufthansa));
// If we didn't set the `this` keyword, it will point to the button
// Note that we must use `bind` here since we need to pass a function to
// EventListener but not call a function.

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); // Set fix rate
// addVAT = value => value + value * 0.23; // Same as above

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++; // Use short circuiting

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // "Poll results are 13, 2, 4, 1"
      console.log(`Poll result are ${this.answers.join(', ')}`);
    }
  },
};

poll.registerNewAnswer();
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]


// IIFE immediately invoked function expression pattern

// A function that will only executed once, and never again

// Normal function
const runOnces = function () {
  console.log('This will never run again');
};
runOnces();

// IIFE => Wrap the whole functino expression into `()`, and add another `()` in
// the end to run it right away
(function () {
  console.log('this will never run again');
  const isPrivate = 23; // This is encapsulated / private vareiable
})(); // IIFE with function expression

(() => console.log('this will never run again'))(); // IIFE with arrow function

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);


// Closures

// We don't create closure manually, we only have to recognize the situation it is created.

// A function always has access to the variable environment of the execution
// context in which the function was created, even after that execution context
// is gone. The closure is then basically this variable environment attach to the
// function, exactly as it was at the time and place that the function was created.

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    // This function === booker
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  };
};

const booker = secureBooking(); // This is a function

// booker() function can still access and mutate the passengerCount variable
booker();
booker();
booker();

console.dir(booker);


// example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;

  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // This f functio close over all the variable environment at its birthplace.
// console.dir(f);

// f() is reassign by h()
h();
f(); // closure will change when is reassign

// console.dir(f);

// example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boading in ${wait} second`);
};

// Closure have priority over the scope chain
const perGroup = 1000;
boardPassengers(180, 3);

// `setTimeout(finction(){}, time)` => execute the function inside after the time
*/

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
