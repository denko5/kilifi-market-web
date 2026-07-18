import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password })
  return response.data.data
}

export const register = async (name, email, password, passwordConfirmation) => {
  const response = await api.post('/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  })
  return response.data.data
}

export const logout = async () => {
  await api.post('/logout')
}