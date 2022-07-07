
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

function localStorage() {
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

// var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var listEl = document.getElementById("searchData");

var form = document.querySelector(".city-input");
form.addEventListener("submit", e=> {
    e.preventDefault();
    var inputVal = input.value;
    
});

// API key
var APIKey = "011dffec3dd0ab191bb9b1386db7001b";
var inputVal = input.value;

fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var searchArr = data.response.docs;
        for(var i = 0; i < searchArr.length; i++) {
            var listItem = document.createElement("li");
            listItem.textContent = searchArr[i].description;
            listEl.appendChild(listItem);
        }
    })
    .catch(() => {
        msg.textContent = "Please seach for a valid city";
    });


var city = [];



