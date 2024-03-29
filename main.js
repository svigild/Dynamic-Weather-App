let weather = {
    "apiKey": "ab6e21a584421c933309f3791388e33a",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+ this.apiKey).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".weather").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " km/h";
        let temperatureCelsius = (parseFloat(temp)-273.15).toFixed(1);
        document.querySelector(".temp").innerText = (temperatureCelsius) + "°C";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";

        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        for (let i=0; i<months.length; i++){
            if (month == i+1){
                month = months[i];
                break;
            }
        }
        newdate = day + "th " +  month + ' ' +year;
        document.querySelector(".date").innerText =  newdate;
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-box").value);
    }
};

document.querySelector(".search-box").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        weather.search();
        document.querySelector(".search-box").value = '';
      }
});

document.querySelector(".submit-button").addEventListener("click", function () {
    weather.search();
    document.querySelector(".search-box").value = '';
});

weather.fetchWeather("Oviedo");