const apiKey = "339fe881f66b982c1ebb8581e7684ad7"; // OpenWeather se API key lo
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.getElementById("search-btn").addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    fetchWeather(city);
});

document.getElementById("city-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchWeather(this.value);
    }
});

async function fetchWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temperature").innerText = `${data.main.temp}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
