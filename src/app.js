function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let weekDay = week[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${weekDay}, ${month} ${day}`;
}

function getDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <li> <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="20"/> ${getDay(
          forecastDay.dt * 1000
        )} <strong>${Math.round(forecastDay.temp.max)} | ${Math.round(
          forecastDay.temp.min
        )}</strong></li>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=940cab7f2dffe0039b455473a663a1f7&units=metric 
`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

  getForecast(response.data.coord);
}

function show(city) {
  let apiKey = `940cab7f2dffe0039b455473a663a1f7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citycity");
  show(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

show("Lima");
