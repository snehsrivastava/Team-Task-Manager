import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '../api/authApi'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'
import { pageTransition } from '../animations/variants'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const { register: reg, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const { data } = await authApi.register(formData)
      setAuth(data.user, data.token)
      toast.success('Account created! Welcome to TaskFlow.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div {...pageTransition}>
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <Zap size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl gradient-text">TaskFlow</span>
      </div>

      <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
        Create your account
      </h1>
      <p className="text-surface-500 dark:text-surface-400 mb-8">
        Start managing your team's tasks today
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              className="input-field pl-9"
              placeholder="John Doe"
              {...reg('name', { required: 'Name is required', maxLength: { value: 50, message: 'Max 50 chars' } })}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="email"
              className="input-field pl-9"
              placeholder="you@example.com"
              {...reg('email', { required: 'Email is required' })}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type={showPass ? 'text' : 'password'}
              className="input-field pl-9 pr-10"
              placeholder="Min 6 characters"
              {...reg('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">Role</label>
          <select className="input-field" {...reg('role')}>
            <option value="member">Team Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
