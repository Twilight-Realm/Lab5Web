document.getElementById('getWeather').addEventListener('click', fetchWeather);

function fetchWeather() {
    const cityName = 'Kiev';
    const apiKey = 'ec9ff9fcea13f88d2a30d87e3318386d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const windGust = data.wind.gust;
            const windDeg = data.wind.deg;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            const country = data.sys.country;
            const cityName = data.name;

            document.getElementById('weatherInfo').innerHTML = `
                <h2>Weather in ${cityName}, ${country}</h2>
                <p>Temperature: ${temperature}°C (Feels like: ${feelsLike}°C)</p>
                <p>Min Temperature: ${tempMin}°C, Max Temperature: ${tempMax}°C</p>
                <p>Pressure: ${pressure} hPa</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s (Gust: ${windGust} m/s), Direction: ${windDeg}°</p>
                <p>Weather: ${weatherDescription}</p>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherInfo').innerHTML = `
                <p>Failed to retrieve weather data. Please try again later.</p>
            `;
        });
}
