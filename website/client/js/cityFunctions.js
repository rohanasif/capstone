const geoURL = "http://api.geonames.org/searchJSON?";
const geoUsername = `rohanasif1990`;


const getCity = async () => {
    const city = document.getElementById("city").value;
    const res = await fetch(`${geoURL}q=${city}&username=${geoUsername}`);
    try {
        const cityData = await res.json();
        return cityData;
    }
    catch (error) {
        console.log("error", error);
    }
}

export { getCity }