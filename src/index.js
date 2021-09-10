// date & time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  minute = `0${minute}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}

let currentTime = document.querySelector(".datetime");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

// City Search

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-box");
  let currentCity = document.querySelector("h1");
  if (cityInput.value === "") {
    alert("Please enter a city!");
  } else {
    currentCity.innerHTML = `${cityInput.value}`;
  }

  let apiKey = "7e2213924aeaae29a68111d7a7f360e2";
  let unit = "metric";

  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(cityApiUrl).then(showWeather);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", showCity);

// Show City Weather

function showWeather(response) {
  console.log(response);
  let getTemperature = Math.round(response.data.main.temp);
  let getMin = Math.round(response.data.main.temp_min);
  let getMax = Math.round(response.data.main.temp_max);
  let getHumidity = Math.round(response.data.main.humidity);
  let getWind = Math.round(response.data.wind.speed);

  let temperature = document.querySelector(".currentTemp");
  temperature.innerHTML = getTemperature;

  let minTemperature = document.querySelector(".minTemp");
  minTemperature.innerHTML = getMin;

  let maxTemeperature = document.querySelector(".maxTemp");
  maxTemeperature.innerHTML = getMax;

  let humidity = document.querySelector(".humidity-value");
  humidity.innerHTML = getHumidity;

  let wind = document.querySelector(".wind-value");
  wind.innerHTML = getWind;

  let displayLocation = document.querySelector("h1");
  displayLocation.innerHTML = response.data.name;

  function displayCelcius() {
    let celciusTemp = document.querySelector(".currentTemp");
    celciusTemp.innerHTML = getTemperature;
  }

  function displayFahrenheit() {
    let convertToFahren = Math.round(getTemperature * 1.8 + 32);
    let fahrenTemp = document.querySelector(".currentTemp");
    fahrenTemp.innerHTML = convertToFahren;
  }

  let cityCelcius = document.querySelector(".currentCelcius");
  cityCelcius.addEventListener("click", displayCelcius);

  let cityFahrenheit = document.querySelector(".currentFahrenheit");
  cityFahrenheit.addEventListener("click", displayFahrenheit);
}

//current location button

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "7e2213924aeaae29a68111d7a7f360e2";
  let unit = "metric";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(geoApiUrl).then(showWeather);
}

let currentLocationButton = document.querySelector(".btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);
