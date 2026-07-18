import api from './api'

export const getPrices = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const response = await api.get(`/prices${query ? `?${query}` : ''}`)
  return response.data.data
}

export const getTodayPrices = async () => {
  const response = await api.get('/prices/today')
  return response.data.data
}

export const comparePrices = async (commodityId) => {
  const response = await api.get(`/prices/compare/${commodityId}`)
  return response.data.data
}

export const getPrice = async (id) => {
  const response = await api.get(`/prices/${id}`)
  return response.data.data
}

export const createPrice = async (data) => {
  const response = await api.post('/prices', data)
  return response.data.data
}

export const updatePrice = async (id, data) => {
  const response = await api.put(`/prices/${id}`, data)
  return response.data.data
}

export const deletePrice = async (id) => {
  await api.delete(`/prices/${id}`)
}