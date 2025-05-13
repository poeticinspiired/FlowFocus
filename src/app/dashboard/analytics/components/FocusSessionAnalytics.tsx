'use client'

import { FocusSessionAnalytics as FocusSessionAnalyticsType } from '../types'

interface FocusSessionAnalyticsProps {
  data: FocusSessionAnalyticsType
  timeRange: 'week' | 'month' | 'year'
}

export default function FocusSessionAnalytics({ data, timeRange }: FocusSessionAnalyticsProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatTimeOfDay = (hour: number) => {
    if (hour < 12) return `${hour}:00 AM`
    if (hour === 12) return '12:00 PM'
    return `${hour - 12}:00 PM`
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Focus Session Analytics</h2>
        
        {/* Overview Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Sessions</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.totalSessions}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Total Focus Time</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {formatDuration(data.totalFocusTime)}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Avg. Session Length</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {formatDuration(data.averageSessionLength)}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Most Productive Time</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {formatTimeOfDay(data.sessionsByTimeOfDay[0]?.hour || 0)}
            </dd>
          </div>
        </div>

        {/* Sessions by Time of Day */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Sessions by Time of Day</h3>
          <div className="mt-4">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Time of Day
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Sessions
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Avg. Barakah Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.sessionsByTimeOfDay.map((timeSlot) => (
                        <tr key={timeSlot.hour}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {formatTimeOfDay(timeSlot.hour)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{timeSlot.count}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {timeSlot.averageBarakahScore}%
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

        {/* Daily Focus Time */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Daily Focus Time</h3>
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
                          Minutes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.dailyFocusTime.map((day) => (
                        <tr key={day.date}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {new Date(day.date).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDuration(day.minutes)}
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

        {/* Focus Time by Category */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Focus Time by Category</h3>
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
                          Minutes
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Avg. Barakah Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.focusTimeByCategory.map((category) => (
                        <tr key={category.category}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDuration(category.minutes)}
                          </td>
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
      </div>
    </div>
  )
} 