import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, CheckSquare,
  Users, Settings, LogOut, ChevronLeft, Zap,
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

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const { logout } = useAuthStore()

  return (
    <motion.aside
      className="hidden lg:flex flex-col h-screen glass border-r border-surface-200/50 dark:border-surface-800/50 sticky top-0 z-30"
      animate={{ width: sidebarOpen ? 256 : 72 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-surface-200/50 dark:border-surface-800/50">
        <motion.div
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-glow"
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={18} className="text-white" />
        </motion.div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-lg gradient-text whitespace-nowrap"
          >
            TaskFlow
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-primary-700 dark:text-primary-400'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-200'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200/30 dark:border-primary-800/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="whitespace-nowrap">{label}</span>}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse + Logout */}
      <div className="p-3 border-t border-surface-200/50 dark:border-surface-800/50 space-y-1">
        <button onClick={toggleSidebar} className="btn-ghost w-full justify-start gap-3">
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
            <ChevronLeft size={20} />
          </motion.div>
          {sidebarOpen && <span className="text-sm">Collapse</span>}
        </button>
        <button onClick={logout} className="btn-ghost w-full justify-start gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
          <LogOut size={20} />
          {sidebarOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
