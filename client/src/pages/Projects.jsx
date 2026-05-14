import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, FolderKanban } from 'lucide-react'
import toast from 'react-hot-toast'
import { projectApi } from '../api/projectApi'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'
import Skeleton from '../components/common/Skeleton'
import EmptyState from '../components/common/EmptyState'
import SearchBar from '../components/ui/SearchBar'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectForm from '../components/projects/ProjectForm'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { useDebounce } from '../hooks/useDebounce'
import { staggerContainer, staggerItem, pageTransition } from '../animations/variants'

export default function Projects() {
  const { user } = useAuthStore()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const debouncedSearch = useDebounce(search)

  const isAdmin = user?.role === 'admin'

  const fetchProjects = async () => {
    try {
      const res = await projectApi.getAll({ search: debouncedSearch })
      setProjects(res.data)
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [debouncedSearch])

  const handleSave = async (data) => {
    try {
      if (editProject) {
        await projectApi.update(editProject._id, data)
        toast.success('Project updated')
      } else {
        await projectApi.create(data)
        toast.success('Project created')
      }
      setShowForm(false)
      setEditProject(null)
      fetchProjects()
    } catch (err) {
      toast.error(err.message || 'Failed to save project')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await projectApi.remove(deleteTarget._id)
      toast.success('Project deleted')
      setDeleteTarget(null)
      fetchProjects()
    } catch (err) {
      toast.error(err.message || 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <motion.div className="space-y-6" {...pageTransition}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Projects</h1>
          <p className="text-sm text-surface-500">{projects.length} projects</p>
        </div>
        <div className="flex gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
          {isAdmin && (
            <Button onClick={() => { setEditProject(null); setShowForm(true) }}>
              <Plus size={16} /> New
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2 w-full mt-4" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description={isAdmin ? 'Create your first project to get started.' : 'You haven\'t been added to any projects yet.'}
          action={isAdmin && <Button onClick={() => setShowForm(true)}><Plus size={16} /> Create Project</Button>}
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {projects.map((project) => (
            <motion.div key={project._id} variants={staggerItem}>
              <ProjectCard
                project={project}
                isAdmin={isAdmin}
                onEdit={() => { setEditProject(project); setShowForm(true) }}
                onDelete={() => setDeleteTarget(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {showForm && (
        <ProjectForm
          project={editProject}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditProject(null) }}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Delete "${deleteTarget?.title}"? All tasks in this project will also be deleted.`}
        loading={deleting}
      />
    </motion.div>
  )
}
