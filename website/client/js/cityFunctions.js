const getCity = async (geoURL, geoUsername, city) => {
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