let now = new Date();
let h4 = document.querySelector("h4");
let hours = now.getHours();
let minutes = now.getMinutes();

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

date.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = '<div class = "row justify-content-md-center">';
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      
       <div class = col-sm-4"> 
        <div class="weatherForecastPreview p-3">
          <div class="forecast-day">${formatDay(forecastDay.time)}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt=""
              width="52px"
              height="52"
              />
              <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span><span class="forecast-temperature-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
              </div>
          </div>    
        </div>
      
     `;

      forecastElement.innerHTML = forecastHTML + "</div>";
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b42f62837taf0ecb256c3b1a678caof5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temp");
  let description = document.querySelector("#des");
  let windSpeed = document.querySelector("#wind-Speed");
  let iconElement = document.querySelector("#icon-Main");
  let humidityElement = document.querySelector("#humidity-Element");

  celsiusTemperature = response.data.temperature.current;
  tempElement.innerHTML = `${temp}`;
  description.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  humidityElement.innerHTML = response.data.temperature.humidity;

  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-City");
  let city = searchInput.value;
  let apiKey = "b42f62837taf0ecb256c3b1a678caof5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  axios.get(apiUrl).then(showTemperature);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-Link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
