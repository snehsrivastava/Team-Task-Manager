import { Menu, Bell } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'
import { useAuthStore } from '../../store/useAuthStore'
import ThemeToggle from './ThemeToggle'
import Avatar from '../common/Avatar'

export default function Navbar() {
  const { toggleMobileSidebar } = useUIStore()
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-20 h-16 glass border-b border-surface-200 dark:border-surface-800 px-4 lg:px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-medium text-surface-500 dark:text-surface-400">
            Welcome back,
          </h2>
          <h1 className="text-base font-semibold text-surface-900 dark:text-white -mt-0.5">
            {user?.name || 'User'}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
          <Bell size={18} className="text-surface-600 dark:text-surface-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>
        <ThemeToggle />
        <div className="ml-1">
          <Avatar src={user?.avatar} name={user?.name} size="md" />
        </div>
      </div>
    </header>
  )
}
