import React, {useEffect, useState} from 'react';
import './Weather.css';

const Weather: React.FC = () => {
    const [temperature, setTemperature] = useState<number|undefined>()
    const [humidity, setHumidity] = useState<number|undefined>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const {latitude: lat, longitude: long} = pos.coords;
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m`)
                .then((data) => {
                return data.json() as Promise<{current: {temperature_2m: number, relative_humidity_2m: number}}>
            })
            .then((data) => {
                setTemperature(data.current.temperature_2m)
                setHumidity(data.current.relative_humidity_2m)
        }).catch((err) => {
            console.error(err)
        })})
    }, [])


    return (
        <div className="weather">
        <div className="temperature">
            {temperature+"°C"}
        </div>
        <div className="humidity">
            {humidity+"%"}
        </div>
            </div>
    )
}

export default Weather;