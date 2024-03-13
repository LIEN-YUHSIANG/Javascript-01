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

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
    const {latitude} = position.coords; // Use distructuring assignment to the object
    const {longitude} = position.coords;
    console.log(`https://www.google.com.tw/maps/@P${latitude},${longitude},7z?entry=ttu`);

    const coords = [latitude, longitude]

    const map = L.map('map').setView(coords, 13);
    // When having multiple scripts in the HTML, the one in the later order will have access to all the global var that the earlier script have.

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    
    console.log(latitude, longitude);
    }, function() {
    alert('Could not get your position');
    })   
}