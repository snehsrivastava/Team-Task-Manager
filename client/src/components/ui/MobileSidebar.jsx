import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, CheckSquare,
  Users, Settings, LogOut, X, Zap,
} from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'
import { useAuthStore } from '../../store/useAuthStore'
import { cn } from '../../utils/helpers'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/tasks', icon: CheckSquare, label: 'Task Board' },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/profile', icon: Settings, label: 'Settings' },
]

export default function MobileSidebar() {
  const { mobileSidebarOpen, closeMobileSidebar } = useUIStore()
  const { logout } = useAuthStore()

  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileSidebar}
          />
          <motion.aside
            className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 z-50 lg:hidden"
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Zap size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg gradient-text">TaskFlow</span>
              </div>
              <button onClick={closeMobileSidebar} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
                <X size={18} />
              </button>
            </div>

            <nav className="py-4 px-3 space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800'
                    )
                  }
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-surface-200 dark:border-surface-800">
              <button
                onClick={() => { logout(); closeMobileSidebar(); }}
                className="btn-ghost w-full justify-start gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
