let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let fullDate = new Date();
let currentDay = fullDate.getDay();
let currentDate = fullDate.getDate();
let currentMonth = fullDate.getMonth();
let hour = fullDate.getHours();
let minute = fullDate.getMinutes();
if (minute < 10) {
  minute = `0${fullDate.getMinutes()}`;
}

let date = document.querySelector("#current-date");
let time = document.querySelector("#current-time");
date.innerHTML = `${days[currentDay]} ${currentDate} | ${months[currentMonth]}`;
time.innerHTML = `${hour}:${minute}`;

function displayWeatherCondition(response) {
  document.querySelector(".current-state").innerHTML = response.data.name;
  document.querySelector("h4").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} mph`;
}

//This is information that will automatically show up when the page is rendered//

function displayCustomaryState(response) {
  console.log(response);
  let h1Element = document.querySelector("h1");
  let h4Element = document.querySelector("h4");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  console.log(currentWeatherIcon);

  h1Element.innerHTML = response.data.name;
  h4Element.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(
    `alt`,
    `${response.data.weather[0].description}`
  );
}
let city = `New York`;
let h1Element = document.querySelector("h1");
let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
let metric = "metric";
let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${metric}`;
axios.get(apiUrl).then(displayCustomaryState);

//By clicking the search button or pressing enter this will allow the correct city information to appear//
function searchButton(event) {
  event.preventDefault();
  let searchCircle = document.querySelector("#search-circle");
  let city = document.querySelector("#search-circle").value;
  let currentState = document.querySelector(".current-state");
  currentState.innerHTML = `${searchCircle.value}`;

  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let metric = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchCircle = document.querySelector("#search-circle");
let searchHandle = document.querySelector("#search-button");
let searchEvent = searchHandle.addEventListener("click", searchButton);
let searchEvent2 = searchCircle.addEventListener("submit", searchButton);

// When the "Current city" button is clicked this will allow that information to appear//
function displayCurrentWeatherCondition(response) {
  let temp = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${temp}°C   <img
                          src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                          alt="sun-icon"
                        />`;
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let metric = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayCurrentWeatherCondition);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", showCurrentCity);

function temperatureChangeCel(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `12°C 
  <img
    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
    alt="sun-icon"
  />`;
}

//this is for the unit change to show correct unit/temp data//
function temperatureChangeFah(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `82°F 
  <img
    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
    alt="sun-icon"
  />`;
}

let celsiusTemperature = document.querySelector("#cel-temp");
celsiusTemperature.addEventListener("click", temperatureChangeCel);
let fahrenheitTemperature = document.querySelector("#far-temp");
fahrenheitTemperature.addEventListener("click", temperatureChangeFah);
