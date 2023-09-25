'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `        
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

  // Insert html and adjust the opacity
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
// https://countries-api-836d.onrender.com/countries/

// First AJAX cal XMLHttpRequest
/*
const getCountryData = function (country) {
  // Send a request to a public api
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Use eventlistener to receive the data we request
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //  Create template HTML

    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);
    const html = `        
  <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

    // Insert html and adjust the opacity
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// Since the AJAX request are running behind the scene, and we don't know which of the
// data will arrive first. We have to cahin the AJAX request if we want them in 
// specific order
getCountryData('portugal');
getCountryData('usa');
getCountryData('taiwan');


// Callback Hell, sequence AJAX call
// We will have to nest the AJAX call inorder to execute asynchronous task in sequence

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `        
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

  // Insert html and adjust the opacity
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbor = function (country) {
  // AVAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Use eventlistener to receive the data we request
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];
    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('USA');

// Example of callback hell
setTimeout(() => {
  console.log('1 second pass');
  setTimeout(() => {
    console.log('2 second pass');
    setTimeout(() => {
      console.log('3 second pass');
      setTimeout(() => {
        console.log('4 second pass');
        setTimeout(() => {
          console.log('5 second pass');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);


// Promesis and the Fetch API

// // Old way for request
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// Fetch API and a promise which is the response of it

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `        
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

  // Insert html and adjust the opacity
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request);

// Consume a promise
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       // Use the first .then to handle the promise return by fetch function
//       console.log(response);
//       return response.json(); // This will be a new promise
//       // To read the data from the response, use .json() on the
//       // response object
//     })
//     .then(function (data) {
//       // Use another .then method to handle the reponse promise of .json()
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Convert using arrow function
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    // Use the first .then to handle the promise return by fetch function,
    // and use .json() to read the data
    .then(data => renderCountry(data[0]));
  // Use another .then method to handle the reponse promise of .json()
};

// getCountryData('portugal');

// Chaining Promises
const getCountryandNeighbour = function (country) {
  // Country 1 Fetch API
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // if (!neighbour) return; // Handling error

      // Country 2 Fetch API
      // Return the promise of the Fetch API so that we can chain more
      // .then().
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // Chaining for the second Fetch API
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};
getCountryandNeighbour('portugal');
// getCountryandNeighbour('German');


// Handleing Rejected Promises

const getCountryandNeighbour = function (country) {
  // Country 1 Fetch API
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json()
      // First way to catch the error => use the second callback function
      // err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return; // Handling error

      // Country 2 Fetch API
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // Chaining for the second Fetch API
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    // Use .catch() to catch error globally
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryandNeighbour('portugal');
btn.addEventListener('click', function () {
  getCountryandNeighbour('German');
});

getCountryandNeighbour('sdshhasda');


// Throwing Errors Manually

// Create a helper function: fetch, handle, and convert

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryandNeighbour = function (country) {
  // Country 1 Fetch API
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);

      // Use `new` operator and `Error` constructor function to create a new error
      // manually, then use the `throw` keyword which will immediately terminate
      // the current function just like `return`.
      // The effect of creating and throwing error in any `.then()` will cause
      // the promise to be immediately reject.
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'sdsdsdsdsd';

      if (!neighbour) return; // Handling error

      // Country 2 Fetch API
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // Chaining for the second Fetch API
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    // Use .catch() to catch error globally
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};


// Convert using helper function
const getCountryandNeighbourNew = function (country) {
  // Country 1 Fetch API
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);

      // Handling error of no neighbour
      if (!('borders' in data[0])) throw new Error('No neighbour found!');
      const neighbour = data[0].borders[0];
      // Country 2 Fetch API
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryandNeighbourNew('German');
});

getCountryandNeighbourNew('australia');
*/

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => {
      // Manually handle error
      if (!response.ok) throw new Error(`${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      // Return the second promise response to chain .then handlers
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      // Manually handle error
      if (!response.ok) throw new Error(`${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.status}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);


// Event Loop

// Execution order of the code:
// Function outside of any callback ⇒ Promise Micro task ⇒ Normal Callbacks

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
// Create a promise that is immediately resolved
Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Create a long execution time micro task that will delay the timer callback
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000000; i++) {
    // Simulate a Micro task that have a long execution time
  }
  console.log(res);
});
console.log('Test end');

// Code will be execute in the following order:
// Test start
// Test end
// Resolved promise 1
// Resolved promise 2
// 0 sec timer

// If we have a Micro task that take a long time to execute, the timer will be delay,
// So note that we cannot perform accurate task with the Js timer.


// Build Promises manually

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw is heppening ✅`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // Mark as fulfilled
      resolve('You WIN 💰'); // This will be consume by .then()
    } else {
      reject(new Error('You lost your money 💩')); // This will be error msg handle by .catch()
    }
  }, 2000);
});

// Consume the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));
// You WIN 💰 or You lost your money 💩

// Normally we only consume promise, the time we manually build promise is when we
// wrap the old callback functions into promises, this is called `promisifying`.

// `promisifying` => convert callback based asynchronous behavior into
// promise based.

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    // In this callback we can do anything we want after 2 seconds
    console.log(`1 second pass`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 second pass`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 second pass`);
    return wait(1);
  })
  .then(() => {
    console.log(`4 second pass`);
    return wait(1);
  });

// setTimeout(() => {
//   console.log('1 second pass');
//   setTimeout(() => {
//     console.log('2 second pass');
//     setTimeout(() => {
//       console.log('3 second pass');
//       setTimeout(() => {
//         console.log('4 second pass');
//         setTimeout(() => {
//           console.log('5 second pass');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Create fulfilled or reject promise immediataly
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('abc')).catch(x => console.error(x));


// Promisifying the Geolocation API

// This will get our current location
// Takes TWO argument, first is the function when success, second is the error
// This is a callback base API

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// Promisify it
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // Easier conversion
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => {
      // Manually handle error
      if (!response.ok) throw new Error(`${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      // Return the second promise response to chain .then handlers
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      // Manually handle error
      if (!response.ok) throw new Error(`${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`${err} 💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.status}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
*/

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createIamge = function (url) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = url;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;
createIamge('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createIamge('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createIamge('img/img-3.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log(`Image 3 loaded`);
  })
  .catch(err => console.log(err));


// Consuming Promises with Async / Await

// Create async function

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // After the promise is resolved, the value of the whole await expression is
  // goin to be the resolved value of the promise, so we can assign it to a variable.
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${dataGeo.countryCode}`
  );
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI();
console.log(`FIRST`);


// Error handling with try & catch

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Use try & catch
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    // Manually throw error right after the fetch to catch the reject promise
    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${dataGeo.countryCode}`
    );

    // Manually throw error right after the fetch to catch the reject promise
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);

    // We won't get the value we want, async function will return a promise,
    // since when the function is still loading, there is no way that we know
    // the information we want. we have to consume it again
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(`${err} 💥💥`);
    renderError(`Something went wrong 💥💥 ${err.message}`);

    // Reject promise returned from async function
    // Since the promise is only reject when the internet fail, in order or us to 
    // catch the error of whereAmI promise, we have to throw the error again, for
    // the later code to handle
    throw err;
  }
};

console.log(`1: Will get location`);

// The following code is not doing to work since when the code is still running in the
// background, we have no way to know the data. We'll only get a pending promise.
// const city = whereAmI();
// console.log(city);

// Since the async function returns a promise, we can use .then() to consume it.
whereAmI()
  // Try to consume the promise return by the function
  .then(city => console.log(`2: ${city}`))
  // catch the error of the promise, since the promise of the function will only be 
  // reject when internet fail, we have to manually throw the error again in order to 
  // handle it
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log(`3: Finished getting location`));

// convert to a async IIFE
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(`3: Finished getting location`);
})();


// Running Promises in Parallel

const get3Countries = async function (c1, c2, c3) {
  try {
    // Running promises in sequence
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // Running parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    // console.log(data1.capital, data2.capital, data3.capital);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'usa', 'canada');


// Promise Combinators: race, allSettled, any

// Promise.race()

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

// Promise.race() is use to prevent never ending promises or long running promises
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long!`));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(3.5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled()

// Takes in an array of promises, and simply return an array of all
// the settled promises no matter the promise is reject or not.
// Never short circuit

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// Promise.all() will short circuit when there is a rejected promise
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any()

//Takes in an array of promises, and will return the first fulfiled promise, 
// also it will simply ignore all the rejected promises.

// The result of a Promise.any() is always a fulfilled promise unless all the promise
// got rejected
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createIamge = function (url) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = url;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// Using async / await to consume'

// const addImagePack = async function (l1, l2, l3) {
//   try {
//     const img1 = await createIamge(l1);
//     await wait(2);
//     img1.style.display = 'none';
//     const img2 = await createIamge(l2);
//     await wait(2);
//     img2.style.display = 'none';
//     const img3 = await createIamge(l3);
//     console.log(img1, img2, img3);
//   } catch (err) {
//     console.error(err);
//   }
// };

// addImagePack('img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg');

const loadAll = async function (imgArr) {
  try {
    // When using `.map` and async function, we will get an array of promise
    // so we can use Promise combnator to handle the array.
    let imgs = imgArr.map(async url => await createIamge(url));
    // Async function always return a promise
    console.log(imgs);
    // Use Promise.all to consume the array of promise we got
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(imgs => imgs.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

// const loadAll = async function (imgArr) {
//   let imgs = await Promise.allSettled(imgArr.map(url => createIamge(url)));
//   console.log(imgs);
// };

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
