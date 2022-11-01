/* Function to GET Weather API data */
const getWeather = async (weatherURL, weatherKey, lat, lon) => {
    try {
        const res = await fetch(`${weatherURL}key=${weatherKey}&lat=${lat}&lon=${lon}`)
        const weatherData = await res.json();
        return weatherData;
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
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

/* Function to update the UI with received data */
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