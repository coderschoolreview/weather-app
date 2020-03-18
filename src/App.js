import React from "react";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import clearSky from "./img/01n@2x.png";
import clouds from "./img/02n@2x.png";
import rain from "./img/09n@2x.png";
import thunderstorm from "./img/11n@2x.png";
import mist from "./img/50n@2x.png";
import snow from "./img/13n@2x.png";

const APIKEY = process.env.REACT_APP_APIKEY;
const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const weatherPics = {
  sky: clearSky,
  cloud: clouds,
  rain: rain,
  thunder: thunderstorm,
  mist: mist,
  snow: snow
};
// import "bootstrap/dist/css/bootstrap.min.css";
/* Example of an API call from this JSON. Api from https://openweathermap.org
{ "coord": { "lon": 139,"lat": 35},
  "weather": [...],
  "base": "stations",
  "main": {
    "temp": 281.52,...
  },
  "wind": {...},
  "clouds": {...},
  "dt": 1560350192,
  "sys": {...},
  "timezone": 32400,
  "id": 1851632,
  "name": "Shuzenji",
  "cod": 200
}
*/

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: null,
      isLoading: true,
      todaysDate: null,
      foreCastArray: [1, 2, 3, 4, 5],
      location: null
    };
    this.moment = require("moment"); //import in moment.js
  }

  getWeatherPics = string => {
    //input a description, output an img source
    if (string.toLowerCase().includes("cloud")) {
      return weatherPics.cloud;
    } else if (string.toLowerCase().includes("sky")) {
      return weatherPics.sky;
    } else if (string.toLowerCase().includes("rain")) {
      return weatherPics.rain;
    } else if (string.toLowerCase().includes("mist")) {
      return weatherPics.mist;
    } else if (string.toLowerCase().includes("thunder")) {
      return weatherPics.thunder;
    } else if (string.toLowerCase().includes("snow")) {
      return weatherPics.snow;
    }
  };
  currentWeather = async (city, lat, long) => {
    // console.log("day", this.moment("03-22-2020 15:00:00").day());
    try {
      // const APIKEY = process.env.REACT_APP_APIKEY;
      // let city = "Ho Chi Minh";
      let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKEY}`;

      // let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${APIKEY}`;
      // let response = await fetch(url);
      // let result = await response.json();
      // console.log(result);
      let response2 = await fetch(forecast);
      let result2 = await response2.json();
      console.log(result2);

      this.setState(
        {
          location: city,
          isLoading: false,
          todaysDate: this.moment(result2.list[0].dt_txt).format("MM-DD-YYYY"),
          foreCastArray: [
            result2.list[0],
            result2.list[8],
            result2.list[16],
            result2.list[24],
            result2.list[32]
          ]
        },
        () => {
          console.log(this.state.foreCastArray);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  getLocation = (city = "Ho Chi Minh") => {
    //default is hochiminh if no input specified
    navigator.geolocation.getCurrentPosition(position => {
      this.currentWeather(
        city,
        position.coords.latitude,
        position.coords.longitude
      ); //as of now, lat and long are not needed at all. Only if you use the api call which uses it
    });
  };
  componentDidMount() {
    //after component mounts and after 1st render
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log("navigation.geolocation works");
        },
        function(error) {
          console.log("Error occurred. Error code: " + error.code);
        },
        { timeout: 5000 }
      );
    } else {
      console.log("no geolocation support");
    }
    this.getLocation();
  }
  changeCity = city => {
    console.log("test");
    this.getLocation(city);
  };
  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="text-center p-4">
          <h1 className="text-light">I am Loading</h1>
          <ClipLoader
            css={
              // Can be a string as well. Need to ensure each key-value pair ends with ;
              `
                display: block;
                margin: 0 auto;
                border-color: white;
              `
            }
            size={150}
            color={"#123abc"}
            loading={this.state.isLoading}
          />
        </div>
      );
    } else
      return (
        <div className="p-5">
          <div className="d-flex">
            <div className="shadow text-center bg-light p-3 rounded w-50 my-3">
              <h1 className="col-12 display-4 my-2 py-3">Weather App</h1>
              <h2 className="col-12">
                {this.state.location !== null && this.state.location}
              </h2>
              <h2 className="col-12">Date: {this.state.todaysDate}</h2>
            </div>
            <div className="d-inline-block flex-grow-1 p-3">
              <div className="d-flex row justify-content-center align-items-center">
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("London")}
                >
                  London
                </button>
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("Paris")}
                >
                  Paris
                </button>
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("Ho Chi Minh")}
                >
                  Ho Chi Minh
                </button>
              </div>
              <div className="d-flex row justify-content-center align-items-center">
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("Berlin")}
                >
                  Berlin
                </button>
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("San Francisco")}
                >
                  San Francisco
                </button>
                <button
                  className="btn btn-light m-2"
                  onClick={() => this.changeCity("Qatar")}
                >
                  Qatar
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.foreCastArray !== null &&
              this.state.foreCastArray.map((item, index) => {
                return (
                  <div className="col shadow m-2 bg-warning">
                    <div className="d-flex flex-column row align-items-center text-center text-dark ">
                      <h3>
                        {item.dt_txt !== null &&
                          DAYS_OF_THE_WEEK[this.moment(item.dt_txt).day()]}
                      </h3>
                      <h3 className="col-12">
                        {item.main !== null && item.main.temp} F
                      </h3>
                      <img
                        className="col-12"
                        src={
                          item.weather !== null &&
                          this.getWeatherPics(item.weather[0].description)
                        }
                        alt="clear sky"
                      />
                      <h3 className="col-12">
                        {item.weather !== null && item.weather[0].description}{" "}
                      </h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
  }
}
