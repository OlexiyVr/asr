const search = document.querySelector(".js-search");
const list = document.querySelector(".js-list");
search.addEventListener("submit", onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const { query, days } = evt.currentTarget.elements;
  getWeather(query.value, days.value)
    .then((data) => (list.innerHTML = createMarkup(data.forecast.forecastday)))
    .catch((err) => console.log(err));
}

function getWeather(city, days) {
  const BASE_URL = "https://api.weatherapi.com/v1";
  const API_KEY = "8ff74a90545e43e8ad971343230605";
  const params = new URLSearchParams({
    key : API_KEY,
    q: city,
    days: days,
    lang: 'uk'
  });

  return fetch(`${BASE_URL}/forecast.json?${params}`).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { text, icon },
        },
      }) => `<li>
    <img src="${icon}" alt="${text}">
    <p>${text}</p>
    <h2>${date}</h2>
    <h3>${avgtemp_c}</h3>
</li>`
    )
    .join("");
}