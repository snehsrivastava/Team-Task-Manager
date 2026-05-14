import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckSquare, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import { taskApi } from '../api/taskApi'
import { projectApi } from '../api/projectApi'
import { useAuthStore } from '../store/useAuthStore'
import KanbanBoard from '../components/tasks/KanbanBoard'
import TaskForm from '../components/tasks/TaskForm'
import TaskDetail from '../components/tasks/TaskDetail'
import ConfirmDialog from '../components/common/ConfirmDialog'
import Button from '../components/common/Button'
import Skeleton from '../components/common/Skeleton'
import EmptyState from '../components/common/EmptyState'
import { KANBAN_COLUMNS } from '../utils/constants'
import { pageTransition } from '../animations/variants'

export default function TaskBoard() {
  const { user } = useAuthStore()
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [viewTask, setViewTask] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const isAdmin = user?.role === 'admin'

  const fetchTasks = async () => {
    try {
      const params = {}
      if (selectedProject) params.project = selectedProject
      const res = await taskApi.getAll(params)
      setTasks(res.data)
    } catch {
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await projectApi.getAll()
      setProjects(res.data)
    } catch {}
  }

  useEffect(() => { fetchProjects() }, [])
  useEffect(() => { fetchTasks() }, [selectedProject])

  const handleStatusChange = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t))
    try {
      await taskApi.updateStatus(taskId, newStatus)
    } catch {
      toast.error('Failed to update status')
      fetchTasks()
    }
  }

  const handleSaveTask = async (data) => {
    try {
      if (editTask) {
        await taskApi.update(editTask._id, data)
        toast.success('Task updated')
      } else {
        await taskApi.create(data)
        toast.success('Task created')
      }
      setShowForm(false)
      setEditTask(null)
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to save task')
    }
  }

  const handleDeleteTask = async () => {
    setDeleting(true)
    try {
      await taskApi.remove(deleteTarget._id)
      toast.success('Task deleted')
      setDeleteTarget(null)
      setViewTask(null)
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const handleAddComment = async (taskId, text) => {
    try {
      const res = await taskApi.addComment(taskId, text)
      setViewTask(res.data)
      fetchTasks()
    } catch (err) {
      toast.error(err.message || 'Failed to add comment')
    }
  }

  // Edit from card menu
  const handleEditFromCard = (task) => {
    setEditTask(task)
    setShowForm(true)
  }

  // Delete from card menu
  const handleDeleteFromCard = (task) => {
    setDeleteTarget(task)
  }

  // Group tasks by status
  const columns = {}
  KANBAN_COLUMNS.forEach(status => {
    columns[status] = tasks.filter(t => t.status === status)
  })

  return (
    <motion.div className="space-y-6 h-full" {...pageTransition}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Task Board</h1>
          <p className="text-sm text-surface-500">{tasks.length} tasks</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-surface-400" />
            <select
              className="input-field py-2 text-sm w-44"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">All Projects</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
            </select>
          </div>
          <Button onClick={() => { setEditTask(null); setShowForm(true) }}>
            <Plus size={16} /> Add Task
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 && !selectedProject ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks yet"
          description="Create your first task to start managing your work."
          action={<Button onClick={() => setShowForm(true)}><Plus size={16} /> Create Task</Button>}
        />
      ) : (
        <KanbanBoard
          columns={columns}
          onStatusChange={handleStatusChange}
          onTaskClick={(task) => setViewTask(task)}
          onEdit={handleEditFromCard}
          onDelete={handleDeleteFromCard}
          isAdmin={isAdmin}
        />
      )}

      {showForm && (
        <TaskForm
          task={editTask}
          projects={projects}
          onSave={handleSaveTask}
          onClose={() => { setShowForm(false); setEditTask(null) }}
        />
      )}

      {viewTask && (
        <TaskDetail
          task={viewTask}
          isAdmin={isAdmin}
          onClose={() => setViewTask(null)}
          onEdit={() => { setEditTask(viewTask); setViewTask(null); setShowForm(true) }}
          onDelete={() => { setDeleteTarget(viewTask); setViewTask(null) }}
          onComment={(text) => handleAddComment(viewTask._id, text)}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </motion.div>
  )
}
