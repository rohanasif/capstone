import { getCity } from "./cityFunctions";

const geoURL = "http://api.geonames.org/searchJSON?";
const geoUsername = `rohanasif1990`;
const pixabayKey = "30776478-ff0b8818f9bba72161ebb1731";
const pixabayURL = "https://pixabay.com/api?";

const getPictures = async () => {
    const city = await document.getElementById("city").value;
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

const receivePictureData = async () => {
    const request = await fetch("/allPictures");
    try {
        const allData = await request.json();
        if (allData['pic'] !== undefined) {
            const node = document.createElement("img");
            node.setAttribute("id", "city-pic");
            node.setAttribute("src", `${allData['pic']}`);
            node.setAttribute("alt", "Your destination city");
            document.getElementById("img-container").appendChild(node);
        }

    }
    catch (error) {
        console.log("error", error)
    }
}

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
    const city = await document.getElementById("city").value;
    const imgText = document.getElementById("img-text");
    const cityData = await getCity(geoURL, city, geoUsername)
    imgText.innerHTML = `Somewhere in ${cityData['geonames'][0]['name']}, ${cityData['geonames'][0]['countryName']}`;
}

export { updatePictureText, postPictureData, receivePictureData, getPictures }