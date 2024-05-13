import {useEffect, useState} from 'react'
import './App.css'
import Weather from "./Weather.tsx";

function App() {
  const [time, setTime] = useState<string>()
  const [date, setDate] = useState<string>()

  useEffect(() => {
    const dateUpdate = setInterval(() => {
      const dateObject = new Date()

      const hour = dateObject.getHours()
      const minute = dateObject.getMinutes()
      const currentTime = hour + ' : ' + minute.toString().padStart(2, '0')

      setTime(currentTime)
      setDate(dateObject.toDateString())
    }, 1000)
    return () => clearInterval(dateUpdate)
  }, [])

  return (
      <div className="screen">
        <div className="date">
          {date}
        </div>
        <div className="time">
          {time}
        </div>
        <Weather />
      </div>
  )
}

export default App
