import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./Weather.css"
import { LOGICAL_OPERATORS } from '@babel/types';
import { render } from '@testing-library/react';

function Weather() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [city, setCity] = useState('');
    const [temp, setTemp] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [desc, setDesc] = useState(null);
    const [icon, setIcon] = useState(null);
    const [wind, setWind] = useState(null);
    const [locationEnabled, setLocationEnabled] = useState(true);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            },
            (error) => {
              setLocationEnabled(false);
              console.log(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
       axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=537ed30b6111caa086efc2bb866a7028`)
       .then((data) => {
           setCity(data.data.name);
           setHumidity(data.data.main.humidity);
           setTemp(data.data.main.temp);
           setSunrise(data.data.sys.sunrise);
           setSunset(data.data.sys.sunset);
           setDesc(data.data.weather[0].main);
           setIcon(data.data.weather[0].icon);
           setWind(data.data.wind.speed);
           console.log(data);
       })
    }, [lat,long])

  return(
      <>
      {!locationEnabled ? (
      <div className = "weather-wrapper">
        <h1 className ="city">Please enable your location in your browser</h1>
      </div> 
      ) : (
        <div className = "weather-wrapper">
        <h1 className ="city">{city}</h1>
        <h2 className ="temp">{Math.floor(temp)}°C</h2>
        <hr className="line"></hr>
        <div className ="left">
            <h3 className ="desc"><img className="icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="imgIcon" /> {desc}</h3>
            <li className="sunriseset">
            <h3 className ="sunrise">{new Date(sunrise * 1000).toLocaleTimeString('en-GB')}</h3>
            <td className ="time">Sunrise</td></li>
            <li className="sunriseset">
            <h3 className ="sunset">{new Date(sunset * 1000).toLocaleTimeString('en-GB')}</h3>
            <td className ="time">Sunset</td>
            </li>
            <li className="right">
            <h2 className ="humidity">{humidity}</h2>
            <td className ="time">Humidity</td></li>
            <li className="right">
            <h2 className ="wind">{wind} m/s</h2>
            <td className ="time">Wind speed</td>
            </li>
        </div>
        </div>
      )}
      </>
  )
       
    
}
export default Weather;