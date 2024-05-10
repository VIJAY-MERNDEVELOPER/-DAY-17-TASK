let countriesUrl = "https://restcountries.com/v3.1/all";

// let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e897061e578b9f9927c2d0ff1bca9603`;
async function getWeather(lat, lon, id) {
  // console.log(lat, lon);
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e897061e578b9f9927c2d0ff1bca9603`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("response error");
      } else {
        return response.json();
      }
    })
    .then((weatherData) => {
      alert(`
        Humidity: ${weatherData.main.humidity}
        Temp: ${weatherData.main.temp}
        Sea_Level:  ${weatherData.main.sea_level}
        Ground_Level:  ${weatherData.main.grnd_level}
         `);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createElement(eleName, attribute, value, content) {
  const element = document.createElement(eleName);
  element.setAttribute(attribute, value);
  element.innerHTML = content;
  document.body.append(element);
  return element;
}

fetch(countriesUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("response error");
    } else {
      return response.json();
    }
  })
  .then((countriesData) => {
    console.log(countriesData);
    countriesData.forEach((country, id) => {
      const countryObject = {
        ...country,
        id,
        name: country.name.common,
        lat: Math.round(country.latlng[0]),
        lon: Math.round(country.latlng[1]),
      };

      createCountryCard(countryObject);
    });
  })
  .catch((error) => {
    console.log(error);
  });

function createCountryCard(element) {
  rowEle.innerHTML += `
  <div class="card col-xl-4 col-lg-4 col-sm-12 m-2 bg-white" style="width: 23rem;">
  <h3 class="text-center">${element.name}</h3>
  <img src="${element.flags.png}" class="card-img-top" alt="${element.name}" style="height: 12rem;">
  <div class="card-body">
    <p class="card-text"><span>Capital:${element.capital} </span></p>
    <p class="card-text"><span>Region: ${element.region}</span></p>
    <p class="card-text"><span>LatLng: ${element.lat} , ${element.lon} </span></p>
    <p class="card-text"><span>Country Codes: ${element.cca3}</span></p>
    <div class="d-flex justify-content-center">
    <a href="#" class="btn btn-primary" onClick="getWeather(${element.latlng[0]},${element.latlng[1]},${element.id})">Click for Weather</a></div>
    <div id="weather-data"></div>
  </div>
</div>`;
}

let weatherDetails = document.getElementById("weather-data");

let header = createElement(
  "div",
  "class",
  "container justify-content-center",
  `<h1 id="title" class="text-center">WEATHER CHECK</h1>`
);
let rowEle = createElement("div", "class", "row justify-content-center ", " ");
header.append(rowEle);

// <p><span>Humidity:</span> ${weatherData.main.humidity}</p>
// <p><span>Temp:</span> ${weatherData.main.temp}</p>
// <p><span>Sea_Level:</span>  ${weatherData.main.sea_level}</p>
// <p><span>Ground_Level:</span>   ${weatherData.main.grnd_level}</p>
