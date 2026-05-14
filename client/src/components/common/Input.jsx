import { forwardRef } from 'react'
import { cn } from '../../utils/helpers'

const Input = forwardRef(({ label, error, className, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
        {label}
      </label>
    )}
    <input ref={ref} className={cn('input-field', error && 'border-red-500 focus:ring-red-500/20', className)} {...props} />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
))

Input.displayName = 'Input'
export default Input
