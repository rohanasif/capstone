import { TestEnvironment } from "jest-environment-jsdom";
import { mainFunction, getCity, geoURL, geoUsername, postWeatherData, receiveWeatherData, getWeather, updatePictureText, postPictureData, receivePictureData, getPictures, forLoop} from "../website/client/js/app.js"
require('jest-fetch-mock').enableMocks();

test("Fetched data should be", async ()=> {
    expect.assertions(1);
    const data = await fetchMock(`${geoURL}q=new+york&username=${geoUsername}`);
    expect(data.status).toEqual(200);
})