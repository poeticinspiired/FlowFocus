'use client'

import { useState } from 'react'
import Link from 'next/link'

const stats = [
  { name: 'Tasks Completed', value: '12', change: '+2', changeType: 'positive' },
  { name: 'Focus Hours', value: '8.5', change: '+1.2', changeType: 'positive' },
  { name: 'Prayer Streak', value: '7 days', change: '+1', changeType: 'positive' },
  { name: 'Community Points', value: '450', change: '+50', changeType: 'positive' },
]

const recentTasks = [
  { id: 1, title: 'Complete project proposal', status: 'completed', priority: 'high' },
  { id: 2, title: 'Review weekly goals', status: 'in-progress', priority: 'medium' },
  { id: 3, title: 'Prepare for team meeting', status: 'pending', priority: 'high' },
]

const upcomingPrayers = [
  { name: 'Fajr', time: '05:30 AM', remaining: '2h 15m' },
  { name: 'Dhuhr', time: '01:15 PM', remaining: '7h 45m' },
  { name: 'Asr', time: '04:45 PM', remaining: '11h 15m' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            New Task
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Start Focus Session
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary-500 p-3">
                <span className="text-white">📊</span>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Recent Tasks</h2>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {recentTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="truncate text-sm text-gray-500">
                          Priority: {task.priority} • Status: {task.status}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/dashboard/tasks"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View all tasks
              </Link>
            </div>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Upcoming Prayers</h2>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {upcomingPrayers.map((prayer) => (
                  <li key={prayer.name} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{prayer.name}</p>
                        <p className="truncate text-sm text-gray-500">
                          {prayer.time} • {prayer.remaining} remaining
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          Set Reminder
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/dashboard/prayer"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View prayer schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 