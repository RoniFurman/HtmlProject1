const API_KEY = "29f303d1ce04ba1c6034831f57df80b2";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const cityName = document.getElementById("inputCity");
const btn = document.querySelector("#btn");
const h1 = document.getElementById("city");
const pTemp = document.getElementById("temp");
const desc = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.querySelector("#errorMessage");
function getWeather(city) {
  try {
    fetch(URL + city)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod == 200) {
          errorMessage.innerText = "";
          h1.innerText = data.name;
          pTemp.innerText = data.main.temp;
          description.innerText = data.weather[0].description;
          const icon = data.weather[0].icon;
          weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          console.log(data);
        } else {
          h1.innerText = "";
          pTemp.innerText = "";
          description.innerText = "";
          weatherIcon.src = "";

          errorMessage.innerText = "City not found...";
        }
      });
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", () => {
  getWeather(cityName.value);
});
