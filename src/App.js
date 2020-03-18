import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
/* Example of an API call JSON
{"coord": { "lon": 139,"lat": 35},
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 281.52,
    "feels_like": 278.99,
    "temp_min": 280.15,
    "temp_max": 283.71,
    "pressure": 1016,
    "humidity": 93
  },
  "wind": {
    "speed": 0.47,
    "deg": 107.538
  },
  "clouds": {
    "all": 2
  },
  "dt": 1560350192,
  "sys": {
    "type": 3,
    "id": 2019346,
    "message": 0.0065,
    "country": "JP",
    "sunrise": 1560281377,
    "sunset": 1560333478
  },
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
      weather: null
    };
  }

  currentWeather = async (lat, long) => {
    console.log("hi");
    const APIKEY = "c1700a01cc56123066c9acc11696de49";
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`;
    let response = await fetch(url);
    let result = await response.json();

    this.setState({ weather: result });
    console.log(result);
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.currentWeather(position.coords.latitude, position.coords.longitude);
    });
  };

  componentDidMount() {
    //useEffect has to take a callback, so do an anonymous function
    console.log("hi");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          alert("it works");
        },
        function(error) {
          alert("Error occurred. Error code: " + error.code);
        },
        { timeout: 1000 }
      );
    } else {
      alert("no geolocation support");
    }
    this.getLocation();
  }

  render() {
    // if (this.state.weather == null) {
    //   return <div>no weather yet</div>;
    // }
    return (
      <div className="App">
        <h1>WeatherApp12</h1>
        <h2>{this.state.weather !== null && this.state.weather.name}</h2>
        <h3>{this.state.weather !== null && this.state.weather.main.temp}</h3>
        <h4>weather description</h4>
      </div>
    );
  }
}
