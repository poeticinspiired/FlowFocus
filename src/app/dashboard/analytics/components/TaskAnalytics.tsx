'use client'

import { TaskAnalytics as TaskAnalyticsType } from '../types'

interface TaskAnalyticsProps {
  data: TaskAnalyticsType
  timeRange: 'week' | 'month' | 'year'
}

export default function TaskAnalytics({ data, timeRange }: TaskAnalyticsProps) {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Task Analytics</h2>
        
        {/* Overview Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Tasks</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.totalTasks}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Completed Tasks</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.completedTasks}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Completion Rate</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.completionRate}%</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Avg. Barakah Score</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.averageBarakahScore}%</dd>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Tasks by Category</h3>
          <div className="mt-4">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Category
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Count
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Avg. Barakah Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.tasksByCategory.map((category) => (
                        <tr key={category.category}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.count}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {category.averageBarakahScore}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Tasks by Priority</h3>
          <div className="mt-4">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Priority
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Count
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Completion Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.tasksByPriority.map((priority) => (
                        <tr key={priority.priority}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {priority.priority.charAt(0).toUpperCase() + priority.priority.slice(1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{priority.count}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {priority.completionRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Task Completion */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Daily Task Completion</h3>
          <div className="mt-4">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Completed
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Total
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.dailyTaskCompletion.map((day) => (
                        <tr key={day.date}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {new Date(day.date).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{day.completed}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{day.total}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Math.round((day.completed / day.total) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 