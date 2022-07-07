
var searchHistory = document.getElementById('search-history');
var searchBody = document.getElementsByClassName('search-body')
var searchForm = document.getElementById('city-form')
var searchInput = document.getElementsByClassName('search-input');
var searchButton = document.getElementsByClassName('btn');
var locationName = document.getElementById('location-name');
var weather = document.getElementById('weather-section')
var futureWeather = document.getElementById('future-weather');
var date = document.getElementById('date')
var temp = document.getElementById('temp');
var currentIcon = document.getElementById('currentIcon');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var UV = document.getElementById('UV');



var today = moment();

var searchList = [];
var MaxHistory = 10;

function initlocalStorage() {
    if(localStorage.getItem('storedSearches')) {
        searchList = JSON.parse(localStorage.getItem('storedSearches'));
        for (let i = 0; i < searchList.length; i++) {
            createStoragebtn(searchList);
        }
    }
}

function createStoragebtn(items) {
    searchHistory.unnerHTML = '';
    for (var i = 0; i < items.length; i++) {
        var newEl = document.createElement("li");
        newEl.classList = "searchList btn";
        newEl.textContent = items[i];
        searchHistory.appendChild(newEl);
    }
    searchList.value = '';
};

searchForm.addEventListener('submit', function(e) {
    searchBody.classList = "";
    weather.style.display = 'block';
    e.preventDefault();
    var input = searchList.value;
    if(input.length > 0) {
        weather(input);
        searchList.unshift(input);
        if(searchList.length > MaxHistory) {
            searchList.pop();
        }
        createStoragebtn(searchList);
        searchButton.blur();
        localStorage.setItem('storedSearches'. JSON.stringify(searchList));
    }
})

searchHistory.addEventListener('click', function(e) {
    if (e.target.matches('searchList')) {
        e.preventDefault()
        searchList.value = e.target.textContent;
        searchButton.click();
    }
})

function weather(location) {
    var apiKey = "011dffec3dd0ab191bb9b1386db7001b";
    var queryURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}}&aqi=no`;
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(weathers) {
        var longitude = weathers.location.lon;
        var latitude = weathers.location.lat;

        locationName.textContent = weathers.location.name + ', ' + weathers.location.region;

        date.textContent = today.format('MM/DD/YYYY');
        humidity.textContent = weathers.current.humidity;
        wind.textContent = weathers.current.wind_mph;
        temp.textContent = weathers.current.temp_f;
        UVColor(weathers.current.uv);
        currentIcon.src = "https:" + weather.current.condition.icon;
        getForecast(latitude, longitude);
    });
    
}

function UVColor(index) {
    var color = '';
    if(index <= 2) {
        color = "green";
    } else if (index <= 5) {
        color = "yellow";

    } else if (index <= 7) {
        color = "orange";
    } else if (index <= 10) {
        color = "red";
    } else {
        color = "blue"
    }
    UV.style.backgroundColor = color;
    UV.textContent = index;
}

function getForecast(lat, lon) {
    var apiKey = "76d1b8a660744f79324838626af74619"
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
    forecastUL.innerHTML = '';
    fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        for(var i = 0; i < 10; i++){
            var forecastDay = data.daily[i];
            var newCard = document.createElement('div');
            var newEl = document.createElement('h4');
            newCard.className = "forecastDay dayCard";
            forecastUL.appendChild(newCard);

            newEl.textContent = moment.unix(forecastDay.dt).format('ll');
            newEl.classList = 'text-center'
            newCard.appendChild(newEl);

            newEl = document.createElement('div');
            newEl.classList="mx-auto bg-white border rounded mb-2";
            newCard.appendChild(newEl);
            
            img.classList = 'mx-auto d-block'
            img.src = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`;
            newEl.appendChild(img);

            newEl = document.createElement('p');
            newEl.textContent = `Humidity: ${forecastDay.humidity}%`
            newCard.appendChild(newEl);

            newEl = document.createElement('p');
            newEl.textContent = `Wind: ${forecastDay.wind_speed} MPH.`
            newCard.appendChild(newEl);

            newEl = document.createElement('p');
            newEl.textContent = `Temp: ${Math.floor(forecastDay.temp.max)} / ${Math.floor(forecastDay.temp.min)}`;
            newCard.appendChild(newEl);

        }
    });
}

initlocalStorage();





