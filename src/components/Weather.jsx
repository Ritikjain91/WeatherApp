import React, { useEffect, useRef, useState } from "react";
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';  
import rain_icon from '../Assets/rain.png';        
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import snow_icon from '../Assets/snow.png';        

import './Weather.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const API_KEY = "8bbc49c861055909bce7d6c4b402dbad";

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Error fetching weather data");
                return;
            }
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            console.log(data)
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(null);
            console.error("Error in fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("london");
    }, []);

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
                    <p className="temperature">{weatherData.temperature}°C</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind Speed Icon" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Weather;
