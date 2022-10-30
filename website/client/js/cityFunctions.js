const getCity = async (geoURL, geoUsername) => {
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