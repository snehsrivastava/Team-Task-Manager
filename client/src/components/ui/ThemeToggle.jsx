import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/useThemeStore'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { isDark, toggle } = useThemeStore()

  return (
    <button
      onClick={toggle}
      className="relative p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-surface-600" />}
      </motion.div>
    </button>
  )
}
