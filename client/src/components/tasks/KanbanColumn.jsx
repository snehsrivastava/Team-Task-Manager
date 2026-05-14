import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import TaskCard from './TaskCard'
import { TASK_STATUS } from '../../utils/constants'

const COLUMN_COLORS = {
  todo: 'border-t-slate-400',
  in_progress: 'border-t-blue-500',
  in_review: 'border-t-purple-500',
  done: 'border-t-emerald-500',
}

export default function KanbanColumn({ status, tasks, onTaskClick, onEdit, onDelete, isAdmin }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const statusConfig = TASK_STATUS[status]

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl bg-surface-50/50 dark:bg-surface-800/30 border-t-2 ${COLUMN_COLORS[status]} transition-colors ${
        isOver ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">
            {statusConfig?.label}
          </span>
          <span className="w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-medium text-surface-600 dark:text-surface-400">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 px-3 pb-3 space-y-2.5 min-h-[100px] overflow-y-auto">
        {tasks.map(task => (
          <motion.div key={task._id} layout layoutId={task._id}>
            <TaskCard
              task={task}
              onClick={() => onTaskClick(task)}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
