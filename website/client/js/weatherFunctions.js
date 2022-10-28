const weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherKey = "20028a8267a24bba9a807362767bc4a7";



import { getCity } from "./cityFunctions";

const getWeather = async () => {
    const cityData = await getCity()
    const res = await fetch(`${weatherURL}&lat=${cityData['geonames'][0]['lat']}&lon=${cityData['geonames'][0]['lng']}&key=${weatherKey}`);
    try {
        const weatherData = await res.json();
        return weatherData;
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
            temp: data.temp,
            datetime: data.datetime
        })
    });

    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log(error);
    }
}

const receiveWeatherData = async (i) => {
    const request = await fetch("/allWeather");
    try {
        const allData = await request.json();
        const node = document.createElement("li");
        node.setAttribute("id", `entry-${i + 1}`);
        node.innerHTML = `<b>DATE:</b> ${allData['datetime']} <b>TEMPERATURE:</b> ${allData['temp']}`;

        document.getElementById("entries").appendChild(node);
    }
    catch (error) {
        console.log("error", error)
    }
}



export { postWeatherData, receiveWeatherData, getWeather }