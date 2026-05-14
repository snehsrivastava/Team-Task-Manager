import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, CheckCircle2, Users, BarChart3,
  ArrowRight, Kanban, Shield, Sparkles, Star,
} from 'lucide-react'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { HiOutlineRocketLaunch } from 'react-icons/hi2'
import FloatingShapes from '../components/ui/FloatingShapes'

const features = [
  { icon: Kanban, title: 'Kanban Board', desc: 'Drag and drop tasks between columns. Visualize your workflow at a glance.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Users, title: 'Team Collaboration', desc: 'Invite team members, assign tasks, and track progress together.', gradient: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, title: 'Dashboard Analytics', desc: 'Real-time stats and charts to monitor your team\'s productivity.', gradient: 'from-amber-500 to-orange-500' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admins manage everything. Members focus on their assigned work.', gradient: 'from-emerald-500 to-teal-500' },
  { icon: CheckCircle2, title: 'Task Management', desc: 'Create, prioritize, and track tasks with comments and due dates.', gradient: 'from-red-500 to-rose-500' },
  { icon: Sparkles, title: 'Beautiful UI', desc: 'Modern design with dark mode, 3D animations, and responsive layout.', gradient: 'from-indigo-500 to-violet-500' },
]

const stats = [
  { num: '10k+', label: 'Active Teams' },
  { num: '500k+', label: 'Tasks Completed' },
  { num: '99.9%', label: 'Uptime' },
  { num: '4.9', label: 'User Rating', icon: Star },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-16 h-16 glass border-b border-surface-200/50 dark:border-surface-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm font-medium">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm">
            <HiOutlineRocketLaunch size={16} /> Get Started
          </Link>
        </div>
      </nav>

      {/* Hero with 3D */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <FloatingShapes />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 mesh-gradient pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-sm font-medium mb-8 border border-primary-200/50 dark:border-primary-800/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={14} className="animate-pulse-slow" /> Built for modern teams
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-surface-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              Organize your team's
              <br />
              <span className="gradient-text bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600 bg-clip-text text-transparent">
                work like a pro
              </span>
            </h1>

            <motion.p
              className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              TaskFlow is a beautiful task management platform that helps teams
              collaborate, track progress, and deliver projects on time.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link to="/register" className="btn-primary text-base px-8 py-3.5 shadow-glow hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-shadow">
                Start for Free <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                Sign In
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4">
                <div className="text-2xl font-bold text-surface-900 dark:text-white flex items-center justify-center gap-1">
                  {stat.num}
                  {stat.icon && <stat.icon size={16} className="text-amber-400 fill-amber-400" />}
                </div>
                <div className="text-xs text-surface-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Everything your team needs
          </motion.h2>
          <p className="text-surface-500 dark:text-surface-400 max-w-lg mx-auto text-lg">
            Powerful features in a clean, modern interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="glass-card-hover p-6 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feat.icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2 text-lg">{feat.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          className="rounded-3xl bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 p-10 sm:p-16 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-primary-200 mb-10 max-w-lg mx-auto text-lg">
              Join thousands of teams using TaskFlow to ship better products.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all hover:scale-105 shadow-xl">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-800 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-surface-500 text-sm">
            <Zap size={14} className="text-primary-500" />
            <span>TaskFlow — Built with ❤️ for teams</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/snehsrivastava?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-surface-400 hover:text-blue-500 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sneh-ranjan-a7143b27a/" target="_blank" rel="noopener noreferrer" className="text-surface-400 hover:text-blue-600 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
