'use client'

import { BarakahAnalytics as BarakahAnalyticsType } from '../types'

interface BarakahAnalyticsProps {
  data: BarakahAnalyticsType
  timeRange: 'week' | 'month' | 'year'
}

export default function BarakahAnalytics({ data, timeRange }: BarakahAnalyticsProps) {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Barakah Analytics</h2>
        
        {/* Overview Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Overall Barakah Score</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{data.overallScore}%</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Highest Category</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.scoreByCategory[0]?.category.charAt(0).toUpperCase() + data.scoreByCategory[0]?.category.slice(1) || 'N/A'}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Highest Score</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.scoreByCategory[0]?.score || 0}%
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Top Activity</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data.topContributors[0]?.activity || 'N/A'}
            </dd>
          </div>
        </div>

        {/* Scores by Category */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Scores by Category</h3>
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
                          Score
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.scoreByCategory.map((category) => (
                        <tr key={category.category}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.score}%</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {Number(category.trend) > 0 ? '↑' : Number(category.trend) < 0 ? '↓' : '→'} {Math.abs(Number(category.trend))}%
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

        {/* Daily Scores */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Daily Scores</h3>
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
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.dailyScores.map((day) => (
                        <tr key={day.date}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {new Date(day.date).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{day.score}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Top Activities</h3>
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
                          Activity
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Barakah Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.topContributors.map((contributor) => (
                        <tr key={`${contributor.category}-${contributor.activity}`}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {contributor.category.charAt(0).toUpperCase() + contributor.category.slice(1)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contributor.activity}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {contributor.barakahScore}%
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

        {/* Recommendations */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900">Recommendations</h3>
          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {data.recommendations.map((recommendation, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{recommendation.category}</p>
                      <p className="text-sm text-gray-500">{recommendation.suggestion}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Impact: {recommendation.potentialImpact}%
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 