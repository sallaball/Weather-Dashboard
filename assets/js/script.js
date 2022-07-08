var searchHistory = document.getElementById('search-history');
var searchBody = document.getElementById('search-body')
var searchForm = document.getElementById('city-form')
var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('search-btn');
var locationName = document.getElementById('location-name');
var weatherDIV = document.getElementById('weather-section')
var futureweatherDIV = document.getElementById('future-weatherDIV');
var tdate = document.getElementById('date')
var temp = document.getElementById('temp');
var currentIcon = document.getElementById('currentIcon');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var UV = document.getElementById('UV');



var today = moment();

var searchList = [];
var maxHistory = 10;

function initLocalStorage(){
    if (localStorage.getItem('storedSearches')){
        searchList = JSON.parse(localStorage.getItem('storedSearches'));
        for (let i = 0; i < searchList.length; i++) {
            createStoragebtn(searchList);
        }
    }
}

function createStoragebtn(items) {
    searchHistory.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        var newEl = document.createElement('li');
        newEl.classList = "searchList btn";
        newEl.textContent = items[i];
        searchHistory.appendChild(newEl);
    }
    searchInput.value = '';
};


searchButton.addEventListener('click', function(e) {
    searchBody.classList = "";
    weatherDIV.style.display = 'block';
    e.preventDefault();
    var input = searchInput.value;
    if(input.length > 0) {
        currentWeather(input);
        searchList.unshift(input);
        if(searchList.length > maxHistory) {
            searchList.pop();
        }
        createStoragebtn(searchList);
        searchButton.blur();
        localStorage.setItem('storedSearches', JSON.stringify(searchList));
    }
})

searchHistory.addEventListener('click', function(e) {
    if (e.target.matches('.searchList')) {
        e.preventDefault();
        searchInput.value = e.target.textContent;
        searchButton.click();
    }
})

function currentWeather(location) {
    var apiKey = "03fbbb9b84ed4fa3eb1a5a1ff00e858b";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (weather) {
        console.log(weather)
        var longitude = weather.coord.lon;
        var latitude = weather.coord.lat;
        locationName.textContent = weather.name;

        tdate.textContent = today.format('MM/DD/YYYY');
        humidity.textContent = weather.main.humidity;
        wind.textContent = weather.wind.speed;
        temp.textContent = weather.main.temp;
        UVColor(temp.uvi);
        currentIcon.src = "https:" + weather.icon;
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
    // forecastUL.innerHTML = '';
    fetch(queryURL)
    .then(function(response) {
        return response.json();
        // console.log(response);
    })
    .then(function(data) {
        for(var i = 0; i < 10; i++){
            var forecastDay = data.daily[i];
            console.log(data);
            var newCard = document.createElement('div');
            // var img = document.createElement('img');
            var newEl = document.createElement('h4');
            newCard.className = "forecastDay dayCard";
            // forecastUL.appendChild(newCard);

            newEl.textContent = moment.unix(forecastDay).format('ll');
            newEl.classList = 'future-ul text-center'
            newCard.appendChild(newEl);

            // newEl = document.createElement('div');
            // newEl.classList="";
            // newCard.appendChild(newEl);

            // img.classList = ''
            // img.src = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`;
            // newEl.appendChild(img);

            newEl = document.createElement('p');
            newEl.textContent = `Temp: ${Math.floor(temp.max)} / ${Math.floor(temp.min)}`;
            newCard.appendChild(newEl);

            newEl = document.createElement('p');
            newEl.textContent = `Humidity: ${humidity}%`
            newCard.appendChild(newEl);

            newEl = document.createElement('p');
            newEl.textContent = `Wind: ${wind.speed} MPH.`
            newCard.appendChild(newEl);

            

        }
    });
}

initLocalStorage();





// ${Math.floor(forecastDay.temp.max)} / ${Math.floor(forecastDay.temp.min)}`;
