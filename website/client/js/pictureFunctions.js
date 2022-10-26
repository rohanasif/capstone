const getPictures = async (city, pixabayURL, pixabayKey) => {
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
        const allData = await request.json()
        const node = document.createElement("img");
        node.setAttribute("id", "city-pic");
        node.setAttribute("src", `${allData['pic']}`);
        node.setAttribute("alt", "Your city");
        document.getElementById("img-container").appendChild(node);
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

const updatePictureText = async (cityData) => {
    imgText.innerHTML = `Somewhere in ${city}, ${cityData['geonames'][0]['countryName']}`;
}

export {updatePictureText, postPictureData, receivePictureData, getPictures}