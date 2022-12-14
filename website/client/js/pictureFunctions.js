import { getCity } from "./cityFunctions";

const geoURL = "http://api.geonames.org/searchJSON?";
const geoUsername = "rohanasif1990";


/* Function to GET Picture API Data*/
const getPictures = async (pixabayKey, pixabayURL) => {
    const city = document.getElementById("city").value;
    const query = city.split(" ").join("+");
    const res = await fetch(`${pixabayURL}key=${pixabayKey}&q=${query}`);
    try {
        const picsData = await res.json();
        return picsData;
    }
    catch (error) {
        console.log("error", error)
    }
}

/* Function to Update the UI with the received data*/
const receivePictureData = async () => {
    const request = await fetch("/allPictures");
    try {
        const allData = await request.json();
        const node = document.createElement("img");
        node.setAttribute("id", "city-pic");
        node.setAttribute("src", `${allData['pic']}`);
        node.setAttribute("alt", "Your destination city");
        document.getElementById("img-container").appendChild(node);
    }
    catch (error) {
        console.log("error", error)
    }
}

/* Function to POST data */
const postPictureData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pic: data.pic
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

const updatePictureText = async () => {
    const city = document.getElementById("city").value;
    const imgText = document.getElementById("img-text");
    const cityData = await getCity(geoURL, geoUsername, city)
    imgText.innerHTML = `Somewhere in ${cityData['geonames'][0]['name']}, ${cityData['geonames'][0]['countryName']}`;
}

export { updatePictureText, postPictureData, receivePictureData, getPictures }