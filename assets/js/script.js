
// API key
var APIKey = "011dffec3dd0ab191bb9b1386db7001b";
var inputVal = input.value;

// var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);

var form = document.querySelector(".city-input");
form.addEventListener("submit", e=> {
    e.preventDefault();
    var inputVal = input.value;
});

// API key
var APIKey = "011dffec3dd0ab191bb9b1386db7001b";
var inputVal = input.value;

fetch(queryURL)
    .then(response => response.json())
    .then(data => {

    })
    .catch(() => {
        msg.textContent = "Please seach for a valid city";
    });


var cityList = [];



var buildSeach = function() {
    for(i = 0; i<cityList.length; i++) {
    var searchText = $("<h2>").attr("class", "search-text col-md-2").text("Search for a City");
    var searchBar = $("<input>").attr("class", "search-bar").val(localStorage.getItem(cityList[i]));
    var searchBtn = $("<button>").attr("class", "btn search-btn").attr("id", "search-btn");

    newBtn.on("click", function () {
        var text = $(this).val();
        localStorage.setItem(text);
        console.log(text);
    });

    searchText.append(searchBar);
    searchText.append(searchBtn);

    $(".container").append(searchText);
}
}

buildSeach();