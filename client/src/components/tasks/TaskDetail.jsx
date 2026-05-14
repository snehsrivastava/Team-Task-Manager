import { useState } from 'react'
import { Pencil, Trash2, Send, Calendar, FolderKanban } from 'lucide-react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import Avatar from '../common/Avatar'
import Badge from '../common/Badge'
import { TASK_PRIORITY, TASK_STATUS } from '../../utils/constants'
import { formatDate, formatRelativeTime } from '../../utils/formatDate'

export default function TaskDetail({ task, isAdmin, onClose, onEdit, onDelete, onComment }) {
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)

  const priority = TASK_PRIORITY[task.priority]
  const status = TASK_STATUS[task.status]

  const handleComment = async () => {
    if (!comment.trim()) return
    setSending(true)
    await onComment(comment.trim())
    setComment('')
    setSending(false)
  }

  return (
    <Modal isOpen onClose={onClose} title={task.title} size="lg">
      <div className="space-y-5">
        {/* Meta row */}
        <div className="flex flex-wrap gap-2">
          <Badge className={priority?.color}>{priority?.label}</Badge>
          <Badge className={status?.color}>{status?.label}</Badge>
          {task.project?.title && (
            <Badge className="bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400">
              <FolderKanban size={12} className="mr-1" /> {task.project.title}
            </Badge>
          )}
          {task.dueDate && (
            <Badge className="bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400">
              <Calendar size={12} className="mr-1" /> {formatDate(task.dueDate)}
            </Badge>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Assigned to */}
        {task.assignedTo && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
            <Avatar src={task.assignedTo.avatar} name={task.assignedTo.name} />
            <div>
              <p className="text-sm font-medium">{task.assignedTo.name}</p>
              <p className="text-xs text-surface-500">{task.assignedTo.email}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onEdit}>
            <Pencil size={14} /> Edit
          </Button>
          {isAdmin && (
            <Button variant="danger" size="sm" onClick={onDelete}>
              <Trash2 size={14} /> Delete
            </Button>
          )}
        </div>

        {/* Comments */}
        <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
          <h4 className="text-sm font-semibold mb-3 text-surface-700 dark:text-surface-300">
            Comments ({task.comments?.length || 0})
          </h4>

          {task.comments?.length > 0 && (
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {task.comments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar src={c.user?.avatar} name={c.user?.name} size="sm" />
                  <div className="flex-1 bg-surface-50 dark:bg-surface-800/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{c.user?.name}</span>
                      <span className="text-xs text-surface-400">{formatRelativeTime(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-surface-600 dark:text-surface-400">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              className="input-field flex-1"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            />
            <Button onClick={handleComment} loading={sending} disabled={!comment.trim()}>
              <Send size={14} />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
