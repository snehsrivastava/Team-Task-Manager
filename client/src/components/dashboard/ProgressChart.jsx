import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = {
  todo: '#94a3b8',
  in_progress: '#3b82f6',
  in_review: '#a855f7',
  done: '#10b981',
}

const LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

export default function ProgressChart({ data }) {
  if (!data) return null

  const chartData = Object.entries(data)
    .filter(([, val]) => val > 0)
    .map(([key, val]) => ({
      name: LABELS[key],
      value: val,
      color: COLORS[key],
    }))

  const total = chartData.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Task Distribution</h3>
        <div className="flex items-center justify-center h-52 text-surface-400 text-sm">
          No tasks yet
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-4">Task Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px' }}
            formatter={(value) => <span className="text-surface-600 dark:text-surface-400">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
