const apikey: string = "a1d246c8ec39df999bd6733d0059d1ee";
const apiUrl: string =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector<HTMLInputElement>(".search input");
const searchButton = document.querySelector<HTMLButtonElement>(".search button");

const weatherIcon = document.querySelector<HTMLImageElement>(".weather-icon");

async function checkWeather(city: string): Promise<void> {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status === 404) {
    // Cast to HTMLElement to access 'style'
    (document.querySelector(".error") as HTMLElement).style.display = "block";
    (document.querySelector(".weather") as HTMLElement).style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city")!.innerHTML = data.name;
    document.querySelector(".temp")!.innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity")!.innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind")!.innerHTML = data.wind.speed + "km/h";

    // Set weather icon based on weather conditions
    if (data.weather[0].main === "Clouds") {
      weatherIcon!.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon!.src = "images/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon!.src = "images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon!.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon!.src = "images/mist.png";
    }

    // Cast to HTMLElement to access 'style'
    (document.querySelector(".weather") as HTMLElement).style.display = "block";
    (document.querySelector(".error") as HTMLElement).style.display = "none";
  }
}

searchButton!.addEventListener("click", () => {
  if (searchBox) {
    checkWeather(searchBox.value);
  }
});
