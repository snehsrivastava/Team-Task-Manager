import { Link } from 'react-router-dom'
import { Calendar, Users, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { formatDate, isOverdue } from '../../utils/formatDate'
import { PROJECT_STATUS } from '../../utils/constants'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'
import { useClickOutside } from '../../hooks/useClickOutside'

export default function ProjectCard({ project, isAdmin, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useClickOutside(() => setMenuOpen(false))
  const status = PROJECT_STATUS[project.status]

  return (
    <div className="glass-card-hover p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/projects/${project._id}`} className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-900 dark:text-white truncate hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
        </Link>
        {isAdmin && (
          <div className="relative ml-2" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
              <MoreVertical size={16} className="text-surface-400" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 w-36 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 py-1 z-10">
                <button onClick={() => { setMenuOpen(false); onEdit() }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => { setMenuOpen(false); onDelete() }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {project.description && (
        <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-4">{project.description}</p>
      )}

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-surface-500">{project.taskStats?.done || 0}/{project.taskStats?.total || 0} tasks</span>
          <span className="font-medium text-surface-700 dark:text-surface-300">{project.progress || 0}%</span>
        </div>
        <div className="h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-700"
            style={{ width: `${project.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-100 dark:border-surface-700">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {project.members?.slice(0, 4).map((m) => (
              <Avatar key={m._id} src={m.avatar} name={m.name} size="sm" />
            ))}
            {project.members?.length > 4 && (
              <div className="w-7 h-7 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center text-xs font-medium ring-2 ring-white dark:ring-surface-800">
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={status?.color}>{status?.label}</Badge>
          {project.dueDate && (
            <span className={`text-xs flex items-center gap-1 ${isOverdue(project.dueDate) && project.status !== 'completed' ? 'text-red-500' : 'text-surface-400'}`}>
              <Calendar size={12} />
              {formatDate(project.dueDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
