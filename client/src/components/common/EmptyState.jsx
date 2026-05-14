import { motion } from 'framer-motion'
import { fadeIn } from '../../animations/variants'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div className="flex flex-col items-center justify-center py-16 px-4 text-center" {...fadeIn}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
          <Icon size={28} className="text-primary-500" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm mb-4">{description}</p>
      )}
      {action}
    </motion.div>
  )
}
