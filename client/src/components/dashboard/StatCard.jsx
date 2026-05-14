import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cardHover } from '../../animations/variants'

export default function StatCard({ label, value, icon: Icon, bgColor }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (value === 0) { setCount(0); return }
    let current = 0
    const step = Math.max(1, Math.floor(value / 40))
    const timer = setInterval(() => {
      current += step
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 25)
    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      className="glass-card p-5 group hover:shadow-card-hover transition-all duration-300 animate-glow-pulse"
      {...cardHover}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-surface-900 dark:text-white tabular-nums">{count}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon size={24} className="text-current opacity-70" />
        </div>
      </div>
    </motion.div>
  )
}
