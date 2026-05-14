import { cn } from '../../utils/helpers'

export default function Badge({ children, className }) {
  return <span className={cn('badge', className)}>{children}</span>
}
