import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Mail, Shield } from 'lucide-react'
import { userApi } from '../api/userApi'
import Avatar from '../components/common/Avatar'
import Skeleton from '../components/common/Skeleton'
import EmptyState from '../components/common/EmptyState'
import Badge from '../components/common/Badge'
import { staggerContainer, staggerItem, pageTransition } from '../animations/variants'

export default function Team() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userApi.getAll()
      .then(res => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div className="space-y-6" {...pageTransition}>
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Team Members</h1>
        <p className="text-sm text-surface-500">{users.length} members</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card p-5 flex flex-col items-center">
              <Skeleton className="w-16 h-16 rounded-full mb-3" />
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState icon={Users} title="No team members" description="Team members will appear here once they join." />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {users.map(user => (
            <motion.div key={user._id} variants={staggerItem}>
              <div className="glass-card-hover p-5 flex flex-col items-center text-center">
                <Avatar src={user.avatar} name={user.name} size="xl" className="mb-3" />
                <h3 className="font-semibold text-surface-800 dark:text-surface-200">{user.name}</h3>
                <p className="text-sm text-surface-500 flex items-center gap-1 mt-1">
                  <Mail size={13} /> {user.email}
                </p>
                <Badge className={user.role === 'admin'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mt-3'
                  : 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 mt-3'
                }>
                  <Shield size={12} className="mr-1" />
                  {user.role === 'admin' ? 'Admin' : 'Member'}
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
