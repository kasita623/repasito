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
  console.log(response.data);
}

let apiKey = `940cab7f2dffe0039b455473a663a1f7`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=buenos aires&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
