// Values and Variables
const country = 'Taiwan';
const continent = 'Asia';
let population = '23';
console.log(country, continent, population);

// Data Types
const isIsland = true;
let language;
console.log(typeof isIsland, typeof population, typeof country, typeof language);

//  let, const, var
language = 'Chinese';

// Basic operators
const halfPopulation = 23 / 2;
console.log(population ++);
const finlandPopulation = 6;
console.log(population > finlandPopulation);
console.log(population < 33);
let ds = country + ' is in ' + continent + ', and its ' + population + ' million people speak ' + language;

console.log(ds)

// Strings and Template Literals
ds = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(ds);

// Taking Decisions: if / else Statements
if (population > 33) {
    console.log(`Taiwan's population is above average`);
} else {
    console.log(`Taiwan's population is below average`);
}

// Type Conversion and Coercion
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);

// Equality Operators: == vs. ===
let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));
if (numNeighbours === 1) {
    console.log('Only1border!')
} else if (numNeighbours > 1) {
    console.log('Morethan1border')
} else {
    console.log('Noborders')
}

// Logical Operators
if (language === 'english' && population < 50) {
    console.log(`You should live in ${country}`)
} else {
    console.log(`${country} does not meet your criteria`)
}

// The Switch statement
let newLanguage = prompt('Choose a language');

switch (newLanguage) {
    case 'chinese': 
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default :
    console.log('Great language too :D');
}

// The Conditional (Ternary) Operator
population > 33 ? console.log(`${country}'s population is above average`) : 
console.log(`${country}'s population is below average`);
