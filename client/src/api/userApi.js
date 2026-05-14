import api from './axios'

export const userApi = {
  getAll: () => api.get('/users'),
  updateProfile: (data) => api.put('/users/profile', data),
}
