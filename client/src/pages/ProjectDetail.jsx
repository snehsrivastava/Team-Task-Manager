import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Users, Calendar, UserPlus, UserMinus } from 'lucide-react'
import toast from 'react-hot-toast'
import { projectApi } from '../api/projectApi'
import { userApi } from '../api/userApi'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'
import Avatar from '../components/common/Avatar'
import Badge from '../components/common/Badge'
import Skeleton from '../components/common/Skeleton'
import Modal from '../components/common/Modal'
import { PROJECT_STATUS } from '../utils/constants'
import { formatDate } from '../utils/formatDate'
import { pageTransition } from '../animations/variants'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState([])
  const [showAddMember, setShowAddMember] = useState(false)
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await projectApi.getOne(id)
        setProject(res.data)
      } catch {
        toast.error('Project not found')
        navigate('/projects')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleAddMember = async (userId) => {
    try {
      const res = await projectApi.addMember(id, userId)
      setProject(res.data)
      toast.success('Member added')
    } catch (err) {
      toast.error(err.message || 'Failed to add member')
    }
  }

  const handleRemoveMember = async (userId) => {
    try {
      const res = await projectApi.removeMember(id, userId)
      setProject(res.data)
      toast.success('Member removed')
    } catch (err) {
      toast.error(err.message || 'Failed to remove member')
    }
  }

  const openAddMember = async () => {
    try {
      const res = await userApi.getAll()
      setAllUsers(res.data)
    } catch {}
    setShowAddMember(true)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    )
  }

  if (!project) return null

  const memberIds = project.members?.map(m => m._id) || []
  const nonMembers = allUsers.filter(u => !memberIds.includes(u._id))
  const status = PROJECT_STATUS[project.status]

  return (
    <motion.div className="space-y-6" {...pageTransition}>
      <button onClick={() => navigate('/projects')} className="btn-ghost text-sm">
        <ArrowLeft size={16} /> Back to Projects
      </button>

      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{project.title}</h1>
              <Badge className={status?.color}>{status?.label}</Badge>
            </div>
            {project.description && (
              <p className="text-surface-500 dark:text-surface-400">{project.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500">
            <Calendar size={14} />
            {project.dueDate ? formatDate(project.dueDate) : 'No due date'}
          </div>
        </div>

        {/* Members */}
        <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 flex items-center gap-2">
              <Users size={16} /> Team Members ({project.members?.length || 0})
            </h3>
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={openAddMember}>
                <UserPlus size={14} /> Add
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {project.members?.map((member) => (
              <div key={member._id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
                <Avatar src={member.avatar} name={member.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-surface-800 dark:text-surface-200">{member.name}</p>
                  <p className="text-xs text-surface-500 truncate">{member.email}</p>
                </div>
                {isAdmin && member._id !== project.createdBy?._id && (
                  <button onClick={() => handleRemoveMember(member._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-surface-400 hover:text-red-500 transition-colors">
                    <UserMinus size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddMember && (
        <Modal isOpen onClose={() => setShowAddMember(false)} title="Add Team Member">
          {nonMembers.length === 0 ? (
            <p className="text-sm text-surface-500 py-4 text-center">All users are already members.</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {nonMembers.map((u) => (
                <div key={u._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800">
                  <div className="flex items-center gap-3">
                    <Avatar src={u.avatar} name={u.name} />
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-surface-500">{u.email}</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleAddMember(u._id)}>Add</Button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </motion.div>
  )
}
