const apiKey = 'c975bd84d87fc0ecb39f35ed676bcba7';
const places = [
    'Lilla Essingen', 'Enskede', 'Jordbro', 'Handen', 'Rågsved',
    'Varberg', 'Ystad', 'Köpenhamn', 'Fisksätra'
];

document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather-container');
    places.forEach(place => {
        fetchWeatherData(place)
            .then(data => {
                const weatherItem = createWeatherItem(data);
                weatherContainer.appendChild(weatherItem);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
});

function fetchWeatherData(place) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(place)}&appid=${apiKey}&units=metric`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        });
}

function createWeatherItem(data) {
    const item = document.createElement('li');
    item.className = 'weather-item';

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    item.appendChild(weatherIcon);

    const placeName = document.createElement('h2');
    placeName.textContent = data.name;
    item.appendChild(placeName);

    const details = document.createElement('div');
    details.className = 'weather-details';

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp} °C (Feels like: ${data.main.feels_like} °C)`;
    details.appendChild(temperature);

    const minMaxTemp = document.createElement('p');
    minMaxTemp.textContent = `Min/Max Temp: ${data.main.temp_min} °C / ${data.main.temp_max} °C`;
    details.appendChild(minMaxTemp);

    const weatherDescription = document.createElement('p');
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    details.appendChild(weatherDescription);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    details.appendChild(humidity);

    const wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed} m/s at ${data.wind.deg}°`;
    details.appendChild(wind);

    const sunrise = document.createElement('p');
    sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    details.appendChild(sunrise);

    const sunset = document.createElement('p');
    sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    details.appendChild(sunset);

    item.appendChild(details);

    return item;
}