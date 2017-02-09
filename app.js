// Dark sky api
// 2c409eb3da49a3706de9fe983f4b9781
// google api
//   AIzaSyDPjCuKDl0jj--DT7jzc8cafgRIxLpKb1I

// fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2c409eb3da49a3706de9fe983f4b9781/37.8267,-122.4233')
// .then(response => response.json())
// .then(data => console.log(data))

// fetch('https://maps.googleapis.com/maps/api/geocode/json?address=montreal&key=AIzaSyDPjCuKDl0jj--DT7jzc8cafgRIxLpKb1I')
// .then(response=>response.json())
// .then(data => console.log(data));


(function(){
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '2c409eb3da49a3706de9fe983f4b9781';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyDPjCuKDl0jj--DT7jzc8cafgRIxLpKb1I';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';


  function getCoordinatesForCity(cityName) {
      var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

      return (
          fetch(url)
          .then(response => response.json())
          .then(data => data.results[0].geometry.location)
      );
  }


  function getCurrentWeather (coords){
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.currently)
    )
  }

  //////////////////////////// functions on top/////////////////////////

  var app = document.querySelector("#app");
  var cityForm = document.querySelector(".city-form");
  var cityInput = document.querySelector(".city-input");
  var cityWeather = document.querySelector(".city-weather");


  cityForm.addEventListener('submit', function(e){
    cityWeather.innerText = "Loading . . .";
    var city = cityInput.value;
    e.preventDefault();


    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather){
      console.log("EEEERRRFF")
      cityWeather.innerText = "";
      cityWeather.innerText = 'the current weather is : ' + weather.temperature;
    })
  });
})();
