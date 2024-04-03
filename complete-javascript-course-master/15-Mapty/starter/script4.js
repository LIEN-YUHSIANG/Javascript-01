// Refactiring for Project Architecture => v238
'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Create App class
class App {
  // Create private fields
  #map;
  #mapEvent;

  // Constructor function is triggered when ever a new object is instantiated from a class
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    // Since we use `this` keyword in this callback function, we have to specify it to be the `app`
    // or it will be point to the object where eventhander is attached.
    inputType.addEventListener('change', this._toggleElevationFoeld);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords; // Use distructuring assignment to the object
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com.tw/maps/@P${latitude},${longitude},7z?entry=ttu`
    );

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map('map').setView(coords, 13); // Make the map into a global variable

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on(`click`, this._showForm.bind(this));
    // Since `this` keyword of a callback function will be point to the object where the eventlistener is attached, in this case `#map`,
    // so we need to use `bind()` method to manually set the `this` as the app object
  }

  _showForm(mapE) {
    this.#mapEvent = mapE; // Make the mapE into a global variable
    form.classList.remove(`hidden`);
    inputDistance.focus();
  }

  _toggleElevationFoeld() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `running-popup`,
        })
      )
      .setPopupContent(`Workout`)
      .openPopup();
  }
}

// Instantiation app class object
const app = new App();
