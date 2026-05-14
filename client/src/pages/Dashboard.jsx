import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FolderKanban, CheckCircle2, Clock, AlertTriangle,
  TrendingUp, Activity,
} from 'lucide-react'
import { dashboardApi } from '../api/dashboardApi'
import Skeleton from '../components/common/Skeleton'
import StatCard from '../components/dashboard/StatCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import ProgressChart from '../components/dashboard/ProgressChart'
import { staggerContainer, staggerItem, pageTransition } from '../animations/variants'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getActivity(15),
        ])
        setStats(statsRes.data)
        setActivity(activityRes.data)
      } catch {
        // silently fail — empty state shown
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-5">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-5">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="glass-card p-5">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: FolderKanban, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Completed Tasks', value: stats?.completedTasks || 0, icon: CheckCircle2, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Pending Tasks', value: stats?.pendingTasks || 0, icon: Clock, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Overdue Tasks', value: stats?.overdueTasks || 0, icon: AlertTriangle, color: 'from-red-500 to-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  ]

  return (
    <motion.div className="space-y-6" {...pageTransition}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">Overview of your team's progress</p>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {statCards.map((card) => (
          <motion.div key={card.label} variants={staggerItem}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart data={stats?.statusBreakdown} />
        </div>
        <RecentActivity activities={activity} />
      </div>
    </motion.div>
  )
}
