/* let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);

let firstName = 'Matilda';

console.log(firstName);
console.log(firstName);
console.log(firstName);

//* Variable name conventions
let jonas_matilda = 'JM';
let $function = 27;

let PI = 3.14159;

let myFirstJob = 'coder';
let myVurrentJob = 'teacher';

console.log(myFirstJob)

let country = 'Taiwan';
let continent = 'Aisa';
let population = '23M'

console.log(country, continent, population)

//* Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true); 
console.log(typeof javascriptIsFun); 
// console.log(typeof 23); 
// console.log(typeof 'Jonas'); //! Always use "" to create a string.

//* Dynamic typing
javascriptIsFun = 'YES'; 
//! Don't use `let` when changing the value of the variable.
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);

//* Undefined datatype
let year;
console.log(year)
console.log(typeof year);
// Undefined is both the value and type of the `undefined datatype`
// When decalring an empty variable, it'll automatically hold the value of indefined.
year = 1991;
console.log(year)
console.log(typeof year);

console.log(typeof null);

let isIsland = true;
let language;
console.log(isIsland)
console.log(population)
console.log(country)
console.log(language)


//* 3 ways to declaring variables let, const, var

let age = 30;
age = 31; //! reasignning & mutate a variable
//! When we need to mutate a variable or declare a empty varuable,
//! use `let`

const birthYear = 1991;
//! Use `const` to declare an immutable variable.
//! We cannot declare empty `const` variable.

var job = 'programmer';
job = 'teacher';

lastName = 'Lien' 
//!This works but always declare the variables.
console.log(lastName)

const language = "Chinese"


//* Basic operator
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3)

const firstName = "Lien";
const lastName = "Yuhsiang"
console.log(firstName + ' ' + lastName)

// Assignment operators
let x = 10 + 5;
x += 10; // x = x + 10
x *= 4;
x ++; // x = x + 1
x --; // x = x - 1
x --;
console.log(x)

// Comparison operators
console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);


//*  Operator Precednece
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10;
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah);
console.log(averageAge);


//* trings and Template Literals

const firstName = "Lien";
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const sean = "I'm " + firstName + 
', a ' + (year - birthYear) + " years old " + job + '!';
console.log(sean);
//! Template leiterals
const seanNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(seanNew); 

console.log(`Just a regular String...`);

console.log('String with \n\
multiple \n\
lines');
//! Template string
console.log(`String
multiple
lines`);


//* Taking Decision: if / else Statments

const age = 15;
const isOldEnough = age >= 18;

if (age >= 18) {
    console.log('Sarah can start driving license 🚗');
} else{
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years`);
}

const birthYear = 1991;
let century; //! Must declare the variable that use in statements first!

if(birthYear <= 2000){
    century = 20;
} else {
    century = 21;
}
console.log(century);


//* Type Conversion and Coersion of String and Numbers

// Type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear); 
//! Use Number() function to manually convert. But the original variable's type is unconverted.
console.log(Number(inputYear) + 18); 

console.log(Number('Jonas')); //! This will return `NaN` == `Not a number.
console.log(typeof NaN );

console.log(String(23), 23); //! Function has to start with capital letters.

// Type coercion
console.log('I am ' + 23 + ' year old'); // Coerce number into string
console.log('I am ' + String(23)+ ' year old');

//! `+` operator will coerce number into string
console.log('23' + '10' + 3);
//! `-`, `*`, `/` operator will coerce string into number
console.log('23' - '10' - 3);
console.log('23' * '2');
console.log('23' / '2');

let n = '1' + 1; 
n = n - 1;
console.log(n);


//* Truthy and Falsy Values

// Only 5 falsy values: 0, '', undefined, null, Nan

// Boolean type conversion
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

// Boolean coercion => 1. Using logical operators, 2. logical context => if/else statement
const money = 100; //! Automatically coerce number to boolean
if (money) {
    console.log("Don't spend it all :)")
} else {
    console.log('You should get a job!')
}

let height = 0;
if (height) {
    console.log('YAY! Height is defined')
} else {
    console.log('Height is UNDEFINED')
}


//* Equality Operators: == vs. ===

const age = 18;
if (age === 18) console.log('You just became an adult.');
//! `===` called strict equality operator, do not perform type coercion.
console.log('8' === 8);
console.log('8' == 8);
//! `==` called loose equality operator, perform type coercion.
if (age == 18) console.log('You just became an adult. (loose)');

//! When compairing values, always use `===`.
const favourite = Number(prompt("What's yout favourite number?")); // Use prompt() function to get user input.
console.log(favourite);
console.log(typeof favourite);

if (favourite == 23) { // '23' == 23
    console.log('Cool 23 is an amazing number!')
}
if (favourite === 23) { // 23 === 23 => true
    console.log('Cool 23 is an amazing number!');
} else if (favourite === 7) {
    console.log('7 is also a cool number');
} else if (favourite === 9) {
    console.log('9 is also a cool number');
} else [
    console.log('Number is not 23 or 7 or 9')
]
// Different operators
if (favourite !== 23) {
    console.log('Why not 23?')
}


//* Boolean Logic & Logical Operators

const hasDriverLicense = true;
const hasGoodVision = true;

// And operator => `&&`
console.log(hasDriverLicense && hasGoodVision);
// Or operator => `||`
console.log(hasDriverLicense || hasGoodVision);
//  Not operator => `!`
console.log(!hasDriverLicense);

const shouldDrive = hasDriverLicense && hasGoodVision;

if (hasDriverLicense && hasGoodVision) {
    console.log('Sarah is able to drive')
} else {
    console.log('Someone else should drive')
}

const isTired = false; 
console.log(hasDriverLicense && hasGoodVision && isTired);

if (hasDriverLicense && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive')
} else {
    console.log('Someone else should drive')
}


//* The switch Statment

const day = prompt("Choose a day: ");

switch (day) {
    case 'monday': //  if (day) === 'monday' {}
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break; //! Without the break, the code will not stop until it meet a `break`
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log("Record video");
        break;
    case 'saturday':
    case 'sunday':
        console.log("enjoy the weekend");
        break;
    default: // Execute when all other cases failed.
        console.log("Not a valid day!");
}

// Code using if / else statement performing same task
const newDay = prompt('Choose a day');

if (newDay === 'monday') {
    console.log('Plan course structure');
    console.log('Go to coding meetup');
} else if (newDay === 'tuesday') {
    console.log('Prepare theory videos');
} else if (newDay === 'wednesday' || day === 'thursday') {
    console.log('Write code examples');
} else if (newDay === 'friday') {
    console.log('Record video');
} else if (newDay === 'saturday' || newDay === 'sunday') {
    console.log('enjoy the weekend');
} else {
    console.log('Not a valid day!')
}


//* Statments and Expressions

// Expressions => Code that produce a value. 
3 + 4
1991
true && false && !false

// Statements => Code that perform some action. Like a whole sentance.
if (23 > 10) {
    const str = '23 is bigger';
}

// Template  literal only take expressions, but not statements.
const me = 'Jonas'
console.log(`I'm ${2037 - 1991} years old ${me}`)
*/

//* The Conditional (Ternary) Operator

// Conditional operator allow us to write some code similar to an if/else 
// statement in one line.

const age = 18;
age >= 18 ? console.log('I like to drink wine 🍷') :
console.log('I like eto drink water 💧');

// Execute the first part if condition is true and second part if false
//! <condition> ? <if part> : <else part>

const drink = age >= 18 ? 'wine 🍷' : 'wate 💧';
console.log(drink) // Since Conditional operator is expression, we can declare variables.

let drink2; // Same code as above but in if / else statement.
if (age >= 18) {
    drink2 = 'wine 🍷';
} else {
    drink2 = 'wate 💧';
}
console.log(drink2)

//! We can put conditional operator into template literal since its a expression.
console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'wate 💧'}`);

const bill = 275;
let tip;

console.log(`The bill was ${bill}, 
the tip was ${tip = 50 < bill < 300 ? bill * 0.15 : bill * 0.2}, 
and the total value ${bill + tip}`);