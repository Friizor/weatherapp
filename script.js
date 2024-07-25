document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia("(max-width: 430px)").matches) {
        document.querySelector("button[type=submit]").textContent = 'Search';
    }
});


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e1f71e54cbd296f88ae8114d0c860c73";

//this is privat API KEY
//if u install the project and its not work its probally because this KEY is not active anymore.
//if u want to gget your own key visit the website: https://openweathermap.org.
//you justt have to login and get your own key and replace it.
//ENJOY
//Made by Friizor ("with help of BroCode Youtube video") 🤫

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;
    
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            cityInput.value = "";
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a city");
    }

});

async function getWeatherData(city){
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl);
    
    //console.log(response);

    if(!response.ok) {
        throw new Error("Could Not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data)


    const {
        name : city,
        main : {temp, humidity}, 
        weather:[{description, id}]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);
 
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌨";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default: 
            return "?";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}