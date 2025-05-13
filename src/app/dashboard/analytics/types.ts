export interface TaskAnalytics {
  totalTasks: number
  completedTasks: number
  completionRate: number
  averageBarakahScore: number
  tasksByCategory: {
    category: string
    count: number
    averageBarakahScore: number
  }[]
  tasksByPriority: {
    priority: string
    count: number
    completionRate: number
  }[]
  dailyTaskCompletion: {
    date: string
    completed: number
    total: number
  }[]
}

export interface FocusSessionAnalytics {
  totalSessions: number
  totalFocusTime: number // in minutes
  averageSessionLength: number
  sessionsByTimeOfDay: {
    hour: number
    count: number
    averageBarakahScore: number
  }[]
  dailyFocusTime: {
    date: string
    minutes: number
  }[]
  focusTimeByCategory: {
    category: string
    minutes: number
    averageBarakahScore: number
  }[]
}

export interface BarakahAnalytics {
  overallScore: number
  scoreByCategory: {
    category: string
    score: number
    trend: number
  }[]
  dailyScores: {
    date: string
    score: number
  }[]
  topContributors: {
    category: string
    activity: string
    barakahScore: number
  }[]
  recommendations: {
    category: string
    suggestion: string
    potentialImpact: number
  }[]
}

export interface AnalyticsData {
  tasks: TaskAnalytics
  focusSessions: FocusSessionAnalytics
  barakah: BarakahAnalytics
  lastUpdated: string
} 