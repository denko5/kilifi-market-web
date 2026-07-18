import { useState, useEffect } from 'react'
import { getWeather } from '../services/weatherService'

function WeatherWidget({ marketId }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!marketId) return
    setLoading(true)
    setError(false)
    getWeather(marketId)
      .then(setWeather)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [marketId])

  if (!marketId) return null
  if (loading) return <p className="text-sm text-gray-400">Loading weather...</p>
  if (error) return <p className="text-sm text-gray-400">Weather unavailable</p>
  if (!weather) return null

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
      <h3 className="font-semibold text-blue-800 mb-2">Current Weather</h3>
      <div className="grid grid-cols-2 gap-2 text-blue-700">
        <span>🌡️ {weather.temperature}°C</span>
        <span>💧 {weather.humidity}% humidity</span>
        <span>🌧️ {weather.rain_probability}% rain</span>
        <span>💨 {weather.wind_speed} km/h wind</span>
      </div>
    </div>
  )
}

export default WeatherWidget