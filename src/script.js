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
let day = days[currentDay];
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

//formatting hours

function formatHours(timestamp) {
  let fullDate = new Date(timestamp);

  let hour = fullDate.getHours();
  if (hour < 10) {
    `0${fullDate.getHours}`;
  }
  let minute = fullDate.getMinutes();
  if (minute < 10) {
    minute = `0${fullDate.getMinutes()}`;
  }

  return `${hour}:${minute}`;
}

/*showing the currection humidity and wind icons

function displayWeatherCondition(response) {

}*/

//This is information that will automatically show up when the page is rendered//

function displayNYForecast(response) {
  let forecastElement = document.querySelector("#forecast-weather");
  forecastElement.innerHTML = null;
  let forecastInfo = null;

  for (let index = 0; index <= 5; index++) {
    forecastInfo = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col">
              <h5>${formatHours(forecastInfo.dt * 1000)}</h5>

              <br />
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastInfo.weather[0].icon
                }@2x.png"
                alt= "${forecastInfo.weather[0].description}"
              /> 
              <br /> 
              <div class="top-temp">${Math.ceil(
                forecastInfo.main.temp_max
              )}°C</div>
              <br /> 
              <div class="bottom-temp">${Math.floor(
                forecastInfo.main.temp_min
              )}°C</div> 
            </div>
`;
  }
}

function displayCustomaryState(response) {
  let h1Element = document.querySelector("h1");
  let h4Element = document.querySelector("h4");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  h1Element.innerHTML = response.data.name;
  h4Element.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(
    `alt`,
    `${response.data.weather[0].description}`
  );
  let metric = "metric";
  let city = `New York`;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayNYForecast);
}
let city = `New York`;
let h1Element = document.querySelector("h1");
let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
let metric = "metric";
let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${metric}`;
axios.get(apiUrl).then(displayCustomaryState);

//By clicking the search button or pressing enter this will allow the correct city information to appear//

function displayWeatherCondition(response) {
  let h1Element = document.querySelector("h1");
  let h4Element = document.querySelector("h4");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  h1Element.innerHTML = response.data.name;
  h4Element.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(
    `alt`,
    `${response.data.weather[0].description}`
  );

  document.querySelector(".current-state").innerHTML = response.data.name;
  document.querySelector("h4").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} mph`;
}

//this section  will display the correct forecast information//

function displayWeatherForecast(forecast) {
  let forecastElement = document.querySelector("#forecast-weather");
  forecastElement.innerHTML = null;
  let forecastInfo = null;

  for (let index = 0; index <= 5; index++) {
    forecastInfo = forecast.data.list[index];
    forecastElement.innerHTML += `
      <div class="col">
              <h5>${formatHours(forecastInfo.dt * 1000)}</h5>

              <br />
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastInfo.weather[0].icon
                }@2x.png"
                alt= "${forecastInfo.weather[0].description}"
              />
              <br />
              <div class="top-temp">${Math.ceil(
                forecastInfo.main.temp_max
              )}°</div>
              <br />
              <div class="bottom-temp">${Math.floor(
                forecastInfo.main.temp_min
              )}°</div>
            </div>
`;
  }
}

function searchButton(event) {
  event.preventDefault();
  let searchCircle = document.querySelector("#search-circle");
  let city = document.querySelector("#search-circle").value;
  let h1Element = document.querySelector("h1");
  let currentState = document.querySelector(".current-state");
  currentState.innerHTML = `${searchCircle.value}`;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let metric = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  //call to display weather forecast//
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherForecast);
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
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.innerHTML = `${temp}°C `;
  let icon = response.data.weather[0].icon;
  let weatherDescription = response.data.weather[0].main;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(`alt`, `${weatherDescription}`);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let metric = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayCurrentWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", showCurrentCity);

//this is for the unit change to show correctly unit/temp data//

function displayWeatherCelUnit(response) {
  let h1Element = document.querySelector("h1");
  let h4Element = document.querySelector("h4");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  h1Element.innerHTML = response.data.name;
  h4Element.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  currentWeatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentWeatherIcon.setAttribute(
    `alt`,
    `${response.data.weather[0].description}`
  );
}

function displayWeatherFahUnit(response) {
  let h1Element = document.querySelector("h1");
  let h4Element = document.querySelector("h4");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  h1Element.innerHTML = response.data.name;
  h4Element.innerHTML = `${Math.round(response.data.main.temp)}°F`;
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

function temperatureChangeCel(event) {
  event.preventDefault();
  let h1 = document.querySelector(`h1`);
  let city = h1.innerHTML;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let metric = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherCelUnit);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function temperatureChangeFah(event) {
  event.preventDefault();
  let h1 = document.querySelector(`h1`);
  let city = h1.innerHTML;
  let apiKey = `370334c8b45ae9d3140c8d2756c6dc22`;
  let imperial = "imperial";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndPoint}&appid=${apiKey}&units=${imperial}`;
  axios.get(apiUrl).then(displayWeatherFahUnit);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${imperial}`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

let celsiusTemperature = document.querySelector("#cel-temp");
celsiusTemperature.addEventListener("click", temperatureChangeCel);
let fahrenheitTemperature = document.querySelector("#far-temp");
fahrenheitTemperature.addEventListener("click", temperatureChangeFah);
