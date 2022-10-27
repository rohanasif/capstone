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

export { postWeatherData, receiveWeatherData, getWeather }