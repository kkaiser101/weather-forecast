var APIKey = "6ef347330304f0c20652c15c2c4c11a5";
var city = "Gilbert";
var submit = document.querySelector("#city-search-btn");
var geocodeQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;


console.log(city.value);
//we use this function to fetch the data we want to get them in a json and get the data
async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getWeather() {

    //we use await to get the latitude and longitude of the city inputed to be inputed in the forecast query
    geoCord = await getData(geocodeQuery)
    var cityLat = geoCord[0].lat;
    var cityLon = geoCord[0].lon;

    var forecastQuery = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey + "&units=imperial";
    forecastData = await getData(forecastQuery);
    console.log(forecastData);

    //creates card for todays weather that will appear bigger than the 5 day forecast

    var weatherToday = document.createElement('card');

    var weatherDate = document.createElement('h3');
    weatherDate.textContent = forecastData.list[0].dt_txt;
    weatherToday.appendChild(weatherDate);

    var weatherTemperature = document.createElement('p');
    weatherTemperature.setAttribute("id","todays-temperature")
    weatherTemperature.textContent = "Temperature: " + forecastData.list[0].main.temp + " F";
    weatherToday.appendChild(weatherTemperature);

    var weatherWind = document.createElement('p');
    weatherWind.setAttribute("id","todays-wind")
    weatherWind.textContent = "Wind:  " + forecastData.list[0].wind.speed + " MPH";
    weatherToday.appendChild(weatherWind);

    var weatherHumidity = document.createElement('p');
    weatherHumidity.setAttribute("id","todays-humidity")
    weatherHumidity.textContent = "Humidity: " + forecastData.list[0].main.humidity + " %";
    weatherToday.appendChild(weatherHumidity);

    document.body.appendChild(weatherToday);


    for (i = 1; i < Math.min(forecastData.list.length, 6); i++){
        console.log(forecastData.list[i]);
        console.log(forecastData.list[i].main.temp);

        var weatherFuture = document.createElement('card');

        var weatherDate = document.createElement('h4');
        weatherDate.textContent = forecastData.list[i].dt_txt;
        weatherFuture.appendChild(weatherDate);

        var weatherTemperature = document.createElement('p');
        weatherTemperature.textContent = "Temperature: " + forecastData.list[i].main.temp + " F";
        weatherFuture.appendChild(weatherTemperature);

        var weatherWind = document.createElement('p');
        weatherWind.textContent = "Wind:  " + forecastData.list[i].wind.speed + " MPH";
        weatherFuture.appendChild(weatherWind);

        var weatherHumidity = document.createElement('p');
        weatherHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + " %";
        weatherFuture.appendChild(weatherHumidity);

        document.body.appendChild(weatherFuture);
    }
}

getWeather()



