import api from './api'

export const getWeather = async (marketId) => {
  const response = await api.get(`/weather?market_id=${marketId}`)
  return response.data.data
}