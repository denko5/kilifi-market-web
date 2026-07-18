import api from './api'

export const getMarkets = async (page = 1) => {
  const response = await api.get(`/markets?page=${page}`)
  return response.data.data
}

export const getMarket = async (id) => {
  const response = await api.get(`/markets/${id}`)
  return response.data.data
}

export const createMarket = async (data) => {
  const response = await api.post('/markets', data)
  return response.data.data
}

export const updateMarket = async (id, data) => {
  const response = await api.put(`/markets/${id}`, data)
  return response.data.data
}

export const deleteMarket = async (id) => {
  await api.delete(`/markets/${id}`)
}