const API_KEY = "29f303d1ce04ba1c6034831f57df80b2";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const cityName = document.getElementById("inputCity");
const btn = document.querySelector("#btn");
const h1 = document.getElementById("city");
const pTemp = document.getElementById("temp");
const desc = document.getElementById("description");
const icon = document.querySelector(".icon");
const errorMessage = document.querySelector("#errorMessage");
function getWeather(city) {
  fetch(URL + city) //promise
    .then((res) => res.json()) //response
    .then((data) => {
      h1.innerText = data.name;
      console.log(data);

      pTemp.innerText = data.main.temp + " c°";
      desc.innerText = data.weather[0].description;
      console.log(data.weather.icon);
      if (data.main.temp <= 20) {
        icon.innerHTML = "⛅️  ";
      } else {
        icon.innerHTML = "😎  ";
      }
    });
}

btn.addEventListener("click", () => {
  getWeather(cityName.value);
});
