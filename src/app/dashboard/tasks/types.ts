export type TaskPriority = 'high' | 'medium' | 'low'
export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type TaskCategory = 'ibadah' | 'ilm' | 'khidmah' | 'personal' | 'work'

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  category: TaskCategory
  dueDate: string
  barakahScore: number
  niyyah?: string
  dua?: string
} 