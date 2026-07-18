import api from './api'

export const getCategories = async () => {
  const response = await api.get('/commodity-categories')
  return response.data.data
}