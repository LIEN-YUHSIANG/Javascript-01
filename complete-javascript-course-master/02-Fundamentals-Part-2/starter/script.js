/*
//* Strcict mode will forboide certain actions and showvase errors on the console
'use strict'; // Activate strict mode (must be the first line of code)

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive");

//! Strict mode also reserve words
// const interface = 'Audio';
// const private = 534;


//* Functions
function logger() {
    console.log('My name is Sean');
}

// calling / running / invoking functions
logger();
logger(); 
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0); // Capture the return value via variable
console.log(appleJuice);
console.log(fruitProcessor(5, 0)) // Use the return value directly

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice)


//* Function Declarations vs. Expressions

//! Function Declaration => We can call function declaration before they are defined.
const age1 = calcAge1(1991);

function calcAge1(birthYear) {
    return 2037 - birthYear;
}

// Parameter is the placeholder in the functions, 
// and the argument this the actual value use to full the placeholder.
console.log(age1)

//! Function Expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);
console.log(age1, age2);


//* Arrow Functions
// A shorter and faster function expression.

//! Function Expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

//! Arrow Function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3)

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retures in ${retirement} years`
}

console.log(yearsUntilRetirement(1991, "Sean"));
console.log(yearsUntilRetirement(1980, "Bob"));


//* Functions calling functions

function cutFruitePieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${cutFruitePieces(apples)} apples and ${cutFruitePieces(oranges)} oranges.`;
    return juice;
}

console.log(fruitProcessor(2, 3));


//* Reviewing Functions\

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement; // `return` will exit the code block.
        }
    else {
        return -1;
    }
}
console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));


//* Arrays

const friend1 = 'Micheal';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Micheal' ,'Steven', 'Peter']; // This is an array
console.log(friends)

const y = new Array(1991, 1994, 2008, 2020); // Another way to create an Array
console.log(y);

console.log(friends[0]); //! Arrays are zero-based. Index start from 0.
console.log(friends[2]);

console.log(friends.length); //! Use `length` property to show the len of arrays.
console.log(friends[friends.length - 1]);

friends[2] = 'Jay'; //! Replace the item by index positions.
console.log(friends);

const firstName = 'Sean';
const seans= [firstName, 'Lien', 2037 - 2001, 'student', friends];
console.log(seans);
console.log(seans.length);

// Exercise
const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years.length - 1)];
console.log(ages);


//* Basic Array Operations (Methods)
const friends = ['Micheal' ,'Steven', 'Peter']

// Add elements
// .push() add item to the end of the array. and return the new length
const newLength = friends.push('Jay') 
console.log(friends);
console.log(newLength);

// .unshift() ad item to the start of the array, and return the new length
friends.unshift('John');
console.log(friends);

// Remove elements
// .pop() is opposite of the `push` method 
// => Remove the last item in the array, and return the removed item.
friends.pop();
const popped = friends.pop(); 
console.log(friends);
console.log(popped);

// .shift() remove the first item from the array, and return the removed item.
friends.shift();
console.log(friends);

// .indexOf() return the index number of the item, return `-1` if item not exist.
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

// .includes() check if the item is in the array, return boolean values
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
friends.push(23);
// Use strict equality
console.log(friends.includes('23'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
    console.log("You have a friend called Steven")
}


//* Intro to Objects

// This is an object, and it have 5 properties. Use `{}` to create an object
const seans = {
    firstName: 'Sean',
    lastName: 'Lien',
    age: 2037 - 2001,
    job: 'student',
    friends: ['sdsd', 'sdsd', 'dsdss']
};


//* Dot vs. Bracket Notation of objects

const seans = {
    firstName: 'Sean',
    lastName: 'Lien',
    age: 2037 - 2001,
    job: 'student',
    friends: ['Micheal', 'sss', 'dsdss']
};

// Retrieve properties
console.log(seans);
console.log(seans.lastName); // Dot notation
console.log(seans['lastName']); // Bracket notation

const nameKey = 'Name';
console.log(seans['first' + nameKey]);
console.log(seans['last' + nameKey]); //! This only work with bracket notation.

const interestedIn = prompt('What do you want to know about Sean? \
Choose between firstName, lastName, age, job, and friends');
console.log(interestedIn);
console.log(seans[interestedIn]);

// `undefined` will be showcase if properties not existed.
if (seans[interestedIn]) {
    console.log(seans[interestedIn]);
} else {
    console.log('Wrong request!\
    Choose between firstName, lastName, age, job, and friends');
}

// Add new properties
seans.location = 'Taiwan'; //Dot notation
seans['Twitter'] = 'dajjsdid'; // Bracket notation
console.log(seans);

console.log(`${seans.firstName} has ${seans.friends.length} friends,\
 and his best friend is called ${seans.friends[0]}`);


//* Object Methods

const seans = {
    firstName: 'Sean',
    lastName: 'Lien',
    birthYear: 2001,
    job: 'student',
    friends: ['sdsd', 'sdsd', 'dsdss'],
    hasDriverLicense: true,

    // calcAge: function(birthYear) {
    //     return 2037 - birthYear; //! We can only put function expressions but not declaration.
    // }

    // calcAge: function() {
    //     // console.log(this); // Using the `this` keyword, which is point to the object.
    //     return 2037 - this.birthYear;
    // }

    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function() {
        if (this.hasDriverLicense) {
        return `${this.firstName} is a ${this.age}-year old ${this.job}, and he has a driver's license`;
        } else {
        return `${this.firstName} is a ${this.age}-year old ${this.job}, and he as no driver's license`;
        }
    }
};

console.log(seans.calcAge()); // Dot notation
// console.log(seans['calcAge'](seans.birthYear)); // Bracket notation

console.log(seans.age);
console.log(seans.age);
console.log(seans.age);

console.log(seans.getSummary())


//* Challenge 3


const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}
console.log(mark.calcBMI());
console.log(john.calcBMI());

console.log(`${john.bmi > mark.bmi ? john.fullName : mark.fullName}'s BMI (${john.bmi > mark.bmi ? john.bmi : mark.bmi}) is higher than ${john.bmi > mark.bmi ? mark.fullName : john.fullName}'s (${john.bmi > mark.bmi ? mark.bmi : john.bmi})`);


//* Iteration: The for loop

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep += 1) {
    console.log(`Lifting weight repetition ${rep}`);
}

// for (<Initialize the counter>; <condition>; <update the counter>) {
//     <action>;
// }


// Looping arrays, Breaking and Continuing

const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Micheal', 'Peter', 'Steven'],
    true
];

const types = []; // Create an empty array to put item in later.

for (let i= 0; i < jonasArray.length; i++) {
    console.log(jonasArray[i], typeof jonasArray[i]);

    // Add items to the `types` array
    // types[i] = typeof jonasArray[i];
    types.push(typeof jonasArray[i]); 
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i ++) {
    ages.push(2037 - years[i]);
}

console.log(ages);

// continue and break
console.log('---- ONLY STRING ----')
for (let i= 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] !== 'string') continue; 
    // if the item is not a string, the code will exit and 
    // jump to the next iteration, the code after `continue` will not be execute.
    console.log(jonasArray[i], typeof jonasArray[i]);
}

console.log('---- BREAK WITH NUMBER ----')
for (let i= 0; i < jonasArray.length; i++) {
    if (typeof jonasArray[i] === 'number') break; 
    // If we meet a number, terminate the whole loop.
    console.log(jonasArray[i], typeof jonasArray[i]);
}


//* Looping backwards and loops in loops
const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Micheal', 'Peter', 'Steven'],
];

// Looping backwards
for (let i = jonasArray.length - 1; i >= 0; i --) {
    console.log(i, jonasArray[i]);
}

// Loops in loops
for (let exercise = 1; exercise < 4; exercise ++) {
    console.log(`-------- Starting exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep ++) {
        console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♂️`);
    }
}


//* While loop

for (let rep = 1; rep <= 10; rep ++) {
    console.log(`lifting weight repetition ${rep} 🏋️‍♂️`);
}

console.log('')
// While loop
let rep = 1;
while (rep <= 10) {
    console.log(`lifting weight repetition ${rep} 🏋️‍♂️`);
    rep ++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('loop is about to end...');
}
*/

//* Challenge 4

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */

const bills = [
    22, 295, 176, 440, 37, 105, 10, 1100, 86, 52
];

let tips = [];
let totals = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + calcTip(bills[i]));
}

console.log(tips);
console.log(totals);


function calcAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

console.log(calcAverage(totals));