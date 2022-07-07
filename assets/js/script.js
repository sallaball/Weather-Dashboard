
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



