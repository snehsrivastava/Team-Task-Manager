import { Activity } from 'lucide-react'
import Avatar from '../common/Avatar'
import { formatRelativeTime } from '../../utils/formatDate'
import { ACTIVITY_LABELS } from '../../utils/constants'

export default function RecentActivity({ activities }) {
  if (!activities?.length) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="flex flex-col items-center justify-center h-52 text-surface-400 text-sm">
          <Activity size={24} className="mb-2 opacity-50" />
          No recent activity
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {activities.map((item) => (
          <div key={item._id} className="flex gap-3">
            <Avatar src={item.user?.avatar} name={item.user?.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-surface-700 dark:text-surface-300">
                <span className="font-medium">{item.user?.name}</span>{' '}
                {ACTIVITY_LABELS[item.action] || item.action}
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-500 truncate">
                {item.target}
              </p>
              <p className="text-xs text-surface-400 mt-0.5">
                {formatRelativeTime(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
