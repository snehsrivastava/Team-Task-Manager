import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../common/Modal'
import Button from '../common/Button'

export default function ProjectForm({ project, onSave, onClose }) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!project

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      status: project?.status || 'active',
      dueDate: project?.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : '',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await onSave(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen onClose={onClose} title={isEditing ? 'Edit Project' : 'New Project'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Title</label>
          <input
            className="input-field"
            placeholder="Project name"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Description</label>
          <textarea
            className="input-field min-h-[80px] resize-none"
            placeholder="Brief description..."
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Status</label>
            <select className="input-field" {...register('status')}>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Due Date</label>
            <input type="date" className="input-field" {...register('dueDate')} />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={loading}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
