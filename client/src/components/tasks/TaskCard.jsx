import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { Calendar, MessageSquare, GripVertical, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { formatDate, isOverdue } from '../../utils/formatDate'
import { TASK_PRIORITY } from '../../utils/constants'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'
import { cn } from '../../utils/helpers'
import { useClickOutside } from '../../hooks/useClickOutside'

export default function TaskCard({ task, onClick, onEdit, onDelete, isAdmin, isDragging }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useClickOutside(() => setMenuOpen(false))

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : undefined

  const priority = TASK_PRIORITY[task.priority]

  const handleMenuClick = (e) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    setMenuOpen(false)
    onEdit?.(task)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    setMenuOpen(false)
    onDelete?.(task)
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={cn(
        'p-3.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 cursor-pointer group relative',
        'hover:shadow-card-hover hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-200',
        isDragging && 'shadow-2xl opacity-90 rotate-2 scale-105 border-primary-400',
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Three-dot menu */}
      <div className="absolute top-2.5 right-2.5 z-10" ref={menuRef}>
        <button
          onClick={handleMenuClick}
          className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical size={14} className="text-surface-400" />
        </button>

        {menuOpen && (
          <motion.div
            className="absolute right-0 top-7 w-32 bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 py-1 z-20"
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
            >
              <Pencil size={13} /> Edit
            </button>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            )}
          </motion.div>
        )}
      </div>

      <div className="flex items-start justify-between mb-2 pr-6">
        <div className="flex items-start gap-2 flex-1">
          <GripVertical size={14} className="text-surface-300 dark:text-surface-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          <h4 className="text-sm font-medium text-surface-800 dark:text-surface-200 line-clamp-2">
            {task.title}
          </h4>
        </div>
        <Badge className={priority?.color}>{priority?.label}</Badge>
      </div>

      {task.description && (
        <p className="text-xs text-surface-400 line-clamp-1 mb-3 ml-6">{task.description}</p>
      )}

      <div className="flex items-center justify-between ml-6">
        <div className="flex items-center gap-2">
          {task.assignedTo && (
            <Avatar src={task.assignedTo.avatar} name={task.assignedTo.name} size="sm" />
          )}
          {task.comments?.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-surface-400">
              <MessageSquare size={12} /> {task.comments.length}
            </span>
          )}
        </div>
        {task.dueDate && (
          <span className={cn(
            'text-xs flex items-center gap-1',
            isOverdue(task.dueDate) && task.status !== 'done' ? 'text-red-500' : 'text-surface-400'
          )}>
            <Calendar size={12} />
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </motion.div>
  )
}
