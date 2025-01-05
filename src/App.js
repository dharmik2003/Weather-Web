import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching weather details:", err);
      });
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center app-background">
      <div className="weather-app-container p-4 shadow rounded text-center bg-white">
        <h1 className="mb-4 text-primary">Weather App</h1>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {Object.keys(data).length > 0 && (
          <div className="weather-result mt-4">
            <div className="shadow rounded p-4 bg-light">
              <img
                height={50}
                width={50}
                className="weather-icon mb-3"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                alt="Weather icon"
              />
              <h2 className="text-primary">{data?.name}</h2>
              <p className="h4">
                <strong>Temperature:</strong>{" "}
                {(data?.main?.temp - 273.15).toFixed(2)}°C
              </p>
              <p className="h5">
                <strong>Condition:</strong> {data?.weather?.[0]?.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
