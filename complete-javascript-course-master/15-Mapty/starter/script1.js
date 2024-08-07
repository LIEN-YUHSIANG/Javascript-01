// Using Geolocation API => v233

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

// Use Geolocation API

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords; // Use distructuring assignment to the object
      const { longitude } = position.coords;
      console.log(
        `https://www.google.com.tw/maps/@P${latitude},${longitude},7z?entry=ttu`
      );
      console.log(latitude, longitude);
    },
    function () {
      alert('Could not get your position');
    }
  );
}
