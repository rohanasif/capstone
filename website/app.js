const geoURL = "http://api.geonames.org/searchJSON?";
const geoUsername = `rohanasif1990`;
const weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?"
const weatherKey = "20028a8267a24bba9a807362767bc4a7"

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();


const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;

    if (city !== "") {
        getCity(geoURL, city, geoUsername)
            .then(function (data) {
                getWeather(weatherURL, weatherKey, data["geonames"][0]['lat'], data["geonames"][0]['lng'])
            }).then(function (data) {
                postWeatherData("/addWeather", { temp: data.temp })
            }).then(function () {
                receiveWeatherData()
            }).catch(function (error) {
                console.log(error);
                alert("Invalid city");
            })
    }
})

const getCity = async (geoURL, city, geoUsername) => {
    const res = await fetch(`${geoURL}q=${city}&username=${geoUsername}`);
    try {
        const cityData = await res.json();
        console.log(cityData)
        return cityData;
    }
    catch (error) {
        console.log("error", error);
    }
}


const postWeatherData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temp: data.temp
        })
    });

    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    }
    catch (error) {
        console.log(error);
    }
}

const receiveWeatherData = async () => {
    const request = await fetch("/allWeather");
    try {
        const allData = await request.json()
        document.getElementById("temp").innerHTML = allData.temp;
    }
    catch (error) {
        console.log("error", error)
    }
}

const getWeather = async (weatherURL, weatherKey, lat, lon) => {
    const res = await fetch(`${weatherURL}&lat=${lat}&lon=${lon}&key=${weatherKey}`);
    try {
        const weatherData = await res.json();
        return weatherData;
    }
    catch (error) {
        console.log("error", error);
    }
}
