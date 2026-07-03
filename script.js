const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:first-child");
const dateTimeField = document.querySelector(".time_location p:last-child");
const conditionField = document.querySelector(".condition p");
const weatherIcon = document.querySelector(".weather-icon");

const searchForm = document.querySelector("form");
const searchField = document.querySelector(".search_area");

const apiKey = "13ad3d4d20264d5c88b74940261606";

async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const temperature = data.current.temp_c;
        const locationName = data.location.name;
        const localTime = data.location.localtime;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;

        temperatureField.innerText = `${temperature}°C`;
        locationField.innerText = locationName;
        dateTimeField.innerText = localTime;
        conditionField.innerText = condition;
        weatherIcon.src = "https:" + icon;
        weatherIcon.alt = condition;

    } catch (error) {
        alert("City not found!");
        console.log(error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = searchField.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetchWeather(city);
    searchField.value = "";
});

// Default weather
fetchWeather("New Delhi, India");