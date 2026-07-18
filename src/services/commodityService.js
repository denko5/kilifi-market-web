import api from './api'

export const getCommodities = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const response = await api.get(`/commodities${query ? `?${query}` : ''}`)
  return response.data.data
}

export const getCommodity = async (id) => {
  const response = await api.get(`/commodities/${id}`)
  return response.data.data
}

export const createCommodity = async (formData) => {
  const response = await api.post('/commodities', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.data
}

export const updateCommodity = async (id, formData) => {
  formData.append('_method', 'PUT')
  const response = await api.post(`/commodities/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.data
}

export const deleteCommodity = async (id) => {
  await api.delete(`/commodities/${id}`)
}