import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Mail, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { userApi } from '../api/userApi'
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import { pageTransition } from '../animations/variants'

export default function Profile() {
  const { user, updateUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await userApi.updateProfile(data)
      updateUser(res.data)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div className="max-w-2xl mx-auto space-y-6" {...pageTransition}>
      <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Profile Settings</h1>

      {/* Profile card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-5">
        <Avatar src={user?.avatar} name={user?.name} size="xl" />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white">{user?.name}</h2>
          <p className="text-sm text-surface-500 flex items-center gap-1 justify-center sm:justify-start mt-1">
            <Mail size={14} /> {user?.email}
          </p>
          <Badge className={user?.role === 'admin'
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mt-2'
            : 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400 mt-2'
          }>
            <Shield size={12} className="mr-1" />
            {user?.role === 'admin' ? 'Admin' : 'Member'}
          </Badge>
        </div>
      </div>

      {/* Edit form */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Edit Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                className="input-field pl-9"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="email"
                className="input-field pl-9"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <Button type="submit" loading={loading}>Save Changes</Button>
        </form>
      </div>
    </motion.div>
  )
}
