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
  console.log(response);
  document.querySelector(".current-state").innerHTML = response.data.name;
  document.querySelector("h4").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} mph`;
}

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

function showTemperature(response) {
  console.log(response);
}

if (searchHandle && searchCircle !== "") {
  let searchEvent = searchHandle.addEventListener("click", searchButton);
  let searchEvent2 = searchCircle.addEventListener("submit", searchButton);
}

function temperatureChangeCel(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = `12°C 
  <img
    src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
    alt="sun-icon"
  />`;
}

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
