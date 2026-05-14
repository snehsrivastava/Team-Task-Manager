import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { userApi } from '../../api/userApi'

export default function TaskForm({ task, projects, onSave, onClose }) {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const isEditing = !!task

  useEffect(() => {
    userApi.getAll().then(res => setUsers(res.data)).catch(() => {})
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      project: task?.project?._id || task?.project || (projects[0]?._id || ''),
      assignedTo: task?.assignedTo?._id || '',
      priority: task?.priority || 'medium',
      status: task?.status || 'todo',
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    },
  })

  const onSubmit = async (data) => {
    if (!data.assignedTo) delete data.assignedTo
    setLoading(true)
    try {
      await onSave(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen onClose={onClose} title={isEditing ? 'Edit Task' : 'New Task'} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Title</label>
          <input className="input-field" placeholder="Task name" {...register('title', { required: 'Required' })} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Description</label>
          <textarea className="input-field min-h-[70px] resize-none" placeholder="Details..." {...register('description')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Project</label>
            <select className="input-field" {...register('project', { required: 'Required' })}>
              <option value="">Select project</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Assign To</label>
            <select className="input-field" {...register('assignedTo')}>
              <option value="">Unassigned</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Priority</label>
            <select className="input-field" {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Status</label>
            <select className="input-field" {...register('status')}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Due Date</label>
            <input type="date" className="input-field" {...register('dueDate')} />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>{isEditing ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </Modal>
  )
}
