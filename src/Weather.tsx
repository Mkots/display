import React, {useEffect, useState} from 'react';
import './Weather.css';
import {weatherDecoder} from "./utils/weatherDecoder.ts";

const Weather: React.FC = () => {
    const [temperature, setTemperature] = useState<number|undefined>()
    const [weather, setWeather] =  useState<undefined| {description: string, image: string}>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const {latitude: lat, longitude: long} = pos.coords;
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code`)
                .then((data) => {
                return data.json() as Promise<{current: {temperature_2m: number, weather_code: number}}>
            })
            .then((data) => {
                setTemperature(data.current.temperature_2m)
                setWeather(weatherDecoder(data.current.weather_code, true))
        }).catch((err) => {
            console.error(err)
        })})
    }, [])


    return (
        <div className="weather">
        <div className="temperature">
            {temperature+"°C"}
        </div>
        <div className="weather-state">
            <img src={weather?.image} alt={weather?.description}/>
            {weather?.description}
        </div>
            </div>
    )
}

export default Weather;