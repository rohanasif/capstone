import { postWeatherData, receiveWeatherData, getWeather } from "./weatherFunctions"
import { updatePictureText, postPictureData, receivePictureData, getPictures } from "./pictureFunctions"
import { getCity } from "./cityFunctions";
import "../css/styles.scss"

const present = new Date();

const weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherKey = "20028a8267a24bba9a807362767bc4a7";
const geoURL = "http://api.geonames.org/searchJSON?";
const geoUsername = "rohanasif1990";

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const time = document.getElementById("time");


document.addEventListener("DOMContentLoaded", () => {
    submitBtn.addEventListener("click", (e) => {
        mainFunction(e)
    })
})

const forLoop = async () => {
    const city = await document.getElementById("city").value;
    for (let i = 0; i < 16; i++) {
        try {
            getCity(geoURL, city, geoUsername)
                .then(coords => getWeather(weatherURL, weatherKey, coords["geonames"][0]['lat'], coords["geonames"][0]['lng']))
                .then(weatherData => postWeatherData("/addWeather", { temp: weatherData['data'][i]['temp'], datetime: weatherData['data'][i]['datetime'] }))
                .then(receiveWeatherData(i))

        }
        catch (error) {
            console.log(error);
            // alert("Please enter a valid city and a valid time");
        }
    }
}

const mainFunction = (e) => {
    e.preventDefault();

    const city = document.getElementById("city").value;
    const departure = document.getElementById("date").value;

    const [depart_date, depart_time] = departure.split("T")
    const [depart_year, depart_month, depart_day] = depart_date.split("-")
    const [depart_hour, depart_minute] = depart_time.split(":")

    const future = new Date(depart_year, depart_month - 1, depart_day, depart_hour, depart_minute);
    if (city === "" || departure === "" || future < present) {
        alert("Invalid input");
    }
    else {

        time.innerHTML = `<b>Departure in ${Math.ceil((future - present) / 3600 / 1000 / 24)} day(s)</b>`

        forLoop();
        updatePictureText();
        getPictures()
            .then(picsData => {
                const total = picsData['hits'].length
                const picIndex = Math.floor(Math.random() * total)
                postPictureData("/addPicture", { pic: picsData['hits'][picIndex]["webformatURL"] })
            })
            .then(receivePictureData())
            .catch(function (error) {
                console.log(error);
                alert("No pictures found")
            })
    }
}