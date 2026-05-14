import { useState } from 'react'
import {
  DndContext, closestCorners, PointerSensor,
  useSensor, useSensors, DragOverlay,
} from '@dnd-kit/core'
import KanbanColumn from './KanbanColumn'
import TaskCard from './TaskCard'
import { KANBAN_COLUMNS } from '../../utils/constants'

export default function KanbanBoard({ columns, onStatusChange, onTaskClick, onEdit, onDelete, isAdmin }) {
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragStart = (event) => {
    const task = Object.values(columns).flat().find(t => t._id === event.active.id)
    setActiveTask(task)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return

    const taskId = active.id
    const newStatus = over.id

    if (KANBAN_COLUMNS.includes(newStatus)) {
      const task = Object.values(columns).flat().find(t => t._id === taskId)
      if (task && task.status !== newStatus) {
        onStatusChange(taskId, newStatus)
      }
    }
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const overId = over.id
    if (!KANBAN_COLUMNS.includes(overId)) {
      for (const [status, tasks] of Object.entries(columns)) {
        if (tasks.find(t => t._id === overId)) {
          const task = Object.values(columns).flat().find(t => t._id === active.id)
          if (task && task.status !== status) {
            onStatusChange(active.id, status)
          }
          break
        }
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-h-[60vh]">
        {KANBAN_COLUMNS.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={columns[status] || []}
            onTaskClick={onTaskClick}
            onEdit={onEdit}
            onDelete={onDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}
