import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useThemeStore } from './store/useThemeStore'
import { useAuthStore } from './store/useAuthStore'

export default function App() {
  const { isDark } = useThemeStore()
  const { loadUser } = useAuthStore()

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return <AppRoutes />
}
