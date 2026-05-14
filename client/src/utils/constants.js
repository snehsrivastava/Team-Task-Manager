export const TASK_STATUS = {
  todo: { label: 'To Do', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  in_review: { label: 'In Review', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  done: { label: 'Done', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
}

export const TASK_PRIORITY = {
  low: { label: 'Low', color: 'badge-low' },
  medium: { label: 'Medium', color: 'badge-medium' },
  high: { label: 'High', color: 'badge-high' },
  urgent: { label: 'Urgent', color: 'badge-urgent' },
}

export const PROJECT_STATUS = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  archived: { label: 'Archived', color: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400' },
}

export const ACTIVITY_LABELS = {
  created_project: 'created a project',
  updated_project: 'updated a project',
  deleted_project: 'deleted a project',
  added_member: 'added a team member',
  removed_member: 'removed a team member',
  created_task: 'created a task',
  updated_task: 'updated a task',
  deleted_task: 'deleted a task',
  changed_status: 'changed task status',
  added_comment: 'commented on a task',
}

export const KANBAN_COLUMNS = ['todo', 'in_progress', 'in_review', 'done']
