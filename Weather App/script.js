const apiKey = "da367fc24ba793de8eff595872d99280";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const searchForm = document.getElementById("searchForm");
const Icon = document.querySelector(".icon");
const defaultCity = "Guadalajara";

document.addEventListener("DOMContentLoaded", function () {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(searchForm);
    const cityName = formData.get("cityName");

    checkWeather(cityName.trim());

    searchForm.reset();
  });
});

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".city").innerHTML = "City Not Found";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    Icon.src = "";
    document.querySelector(".error").innerHTML = "Invalid city name";
    return;
  }

  const data = await response.json();
  console.log(data);
  
  document.querySelector(".error").innerHTML = "";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";
  
  if (data.weather[0].main == "Clouds") {
    Icon.src = "clouds.png";
  } else if (data.weather[0].main == "Clear") {
    Icon.src = "sunny.png";
  } else if (data.weather[0].main == "Rain") {
    Icon.src = "rain.png";
  } else if (data.weather[0].main == "Light rain") {
    Icon.src = "drizzle.png";
  } else if (data.weather[0].main == "Snow") {
    Icon.src = "snowy.png";
  } else if (data.weather[0].main == "Mist") {
    Icon.src = "mist.png";
  }

  updateDateTime(data.timezone);
}

checkWeather(defaultCity);

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateDateTime(timezone) {
  const now = new Date();
  const locationTime = new Date(now.toLocaleString("en-US", { timeZone: 'America/Mexico_City'}));

  const dayName = daysOfWeek[locationTime.getDay()];
  const monthName = monthsOfYear[locationTime.getMonth()];
  const dayNum = locationTime.getDate();
  const year = locationTime.getFullYear();
  const hour = locationTime.getHours();
  const minutes = locationTime.getMinutes();
  const seconds = locationTime.getSeconds();
  const period = hour >= 12 ? "PM" : "AM";

  document.getElementById("dayname").textContent = dayName;
  document.getElementById("Month").textContent = monthName;
  document.getElementById("daynum").textContent = dayNum;
  document.getElementById("year").textContent = year;
  document.getElementById("hour").textContent = formatTime(hour);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
  document.getElementById("period").textContent = period;

  setTimeout(() => updateDateTime(timezone), 1000);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

updateDateTime();