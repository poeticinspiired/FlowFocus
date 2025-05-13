'use client'

import { useState } from 'react'
import TaskAnalytics from './components/TaskAnalytics'
import FocusSessionAnalytics from './components/FocusSessionAnalytics'
import BarakahAnalytics from './components/BarakahAnalytics'
import { AnalyticsData } from './types'

const initialData: AnalyticsData = {
  tasks: {
    totalTasks: 150,
    completedTasks: 120,
    completionRate: 80,
    averageBarakahScore: 85,
    tasksByCategory: [
      { category: 'work', count: 50, averageBarakahScore: 90 },
      { category: 'study', count: 40, averageBarakahScore: 85 },
      { category: 'personal', count: 30, averageBarakahScore: 80 },
      { category: 'spiritual', count: 30, averageBarakahScore: 95 }
    ],
    tasksByPriority: [
      { priority: 'high', count: 40, completionRate: 90 },
      { priority: 'medium', count: 70, completionRate: 85 },
      { priority: 'low', count: 40, completionRate: 75 }
    ],
    dailyTaskCompletion: [
      { date: '2024-03-01', completed: 8, total: 10 },
      { date: '2024-03-02', completed: 7, total: 8 },
      { date: '2024-03-03', completed: 9, total: 10 },
      { date: '2024-03-04', completed: 6, total: 8 },
      { date: '2024-03-05', completed: 8, total: 10 }
    ]
  },
  focusSessions: {
    totalSessions: 45,
    totalFocusTime: 1800,
    averageSessionLength: 40,
    sessionsByTimeOfDay: [
      { hour: 9, count: 15, averageBarakahScore: 90 },
      { hour: 14, count: 12, averageBarakahScore: 85 },
      { hour: 20, count: 18, averageBarakahScore: 95 }
    ],
    dailyFocusTime: [
      { date: '2024-03-01', minutes: 120 },
      { date: '2024-03-02', minutes: 90 },
      { date: '2024-03-03', minutes: 150 },
      { date: '2024-03-04', minutes: 100 },
      { date: '2024-03-05', minutes: 130 }
    ],
    focusTimeByCategory: [
      { category: 'work', minutes: 900, averageBarakahScore: 85 },
      { category: 'study', minutes: 600, averageBarakahScore: 90 },
      { category: 'personal', minutes: 300, averageBarakahScore: 80 }
    ]
  },
  barakah: {
    overallScore: 88,
    scoreByCategory: [
      { category: 'spiritual', score: 95, trend: 5 },
      { category: 'work', score: 90, trend: 3 },
      { category: 'study', score: 85, trend: -2 },
      { category: 'personal', score: 80, trend: 0 }
    ],
    dailyScores: [
      { date: '2024-03-01', score: 90 },
      { date: '2024-03-02', score: 85 },
      { date: '2024-03-03', score: 95 },
      { date: '2024-03-04', score: 80 },
      { date: '2024-03-05', score: 90 }
    ],
    topContributors: [
      { category: 'spiritual', activity: 'Morning Prayer', barakahScore: 95 },
      { category: 'work', activity: 'Project Planning', barakahScore: 90 },
      { category: 'study', activity: 'Quran Study', barakahScore: 95 },
      { category: 'personal', activity: 'Family Time', barakahScore: 85 }
    ],
    recommendations: [
      {
        category: 'Spiritual Growth',
        suggestion: 'Increase morning prayer consistency',
        potentialImpact: 15
      },
      {
        category: 'Work Productivity',
        suggestion: 'Schedule deep work sessions during peak hours',
        potentialImpact: 10
      },
      {
        category: 'Study Habits',
        suggestion: 'Add Quran study to daily routine',
        potentialImpact: 20
      }
    ]
  },
  lastUpdated: new Date().toISOString()
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <TaskAnalytics data={initialData.tasks} timeRange={timeRange} />
        <FocusSessionAnalytics data={initialData.focusSessions} timeRange={timeRange} />
        <BarakahAnalytics data={initialData.barakah} timeRange={timeRange} />
      </div>

      <div className="text-sm text-gray-500">
        Last updated: {new Date(initialData.lastUpdated).toLocaleString()}
      </div>
    </div>
  )
} 