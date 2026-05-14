import api from './axios'

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getActivity: (limit = 20) => api.get('/dashboard/activity', { params: { limit } }),
}
