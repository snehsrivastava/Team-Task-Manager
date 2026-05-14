import { getInitials } from '../../utils/helpers'
import { cn } from '../../utils/helpers'

export default function Avatar({ src, name = '', size = 'md', className }) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover ring-2 ring-white dark:ring-surface-800', sizes[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 ring-2 ring-white dark:ring-surface-800',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}
