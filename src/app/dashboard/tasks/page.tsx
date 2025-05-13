'use client'

import { useState } from 'react'
import Link from 'next/link'
import NewTaskModal from './components/NewTaskModal'
import { Task, TaskCategory, TaskPriority, TaskStatus } from './types'

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Complete Qur\'an reflection',
    description: 'Reflect on Surah Al-Mulk verses 1-10',
    priority: 'high',
    status: 'pending',
    category: 'ibadah',
    dueDate: '2024-03-20',
    barakahScore: 95,
    niyyah: 'Seeking knowledge and closeness to Allah',
    dua: 'رَّبِّ زِدْنِي عِلْمًا'
  },
  {
    id: 2,
    title: 'Prepare community workshop',
    description: 'Create materials for youth halaqah',
    priority: 'medium',
    status: 'in-progress',
    category: 'khidmah',
    dueDate: '2024-03-25',
    barakahScore: 85
  },
  {
    id: 3,
    title: 'Research paper on Islamic finance',
    description: 'Complete literature review section',
    priority: 'high',
    status: 'pending',
    category: 'ilm',
    dueDate: '2024-03-22',
    barakahScore: 80
  }
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'barakah' | 'priority' | 'dueDate'>('barakah')

  const filteredTasks = tasks
    .filter(task => selectedCategory === 'all' || task.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'barakah') return b.barakahScore - a.barakahScore
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })

  const handleSaveTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: tasks.length + 1,
    }
    setTasks([...tasks, task])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button
          onClick={() => setShowNewTaskModal(true)}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          New Task
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as TaskCategory | 'all')}
          className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="all">All Categories</option>
          <option value="ibadah">Ibadah</option>
          <option value="ilm">Ilm</option>
          <option value="khidmah">Khidmah</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'barakah' | 'priority' | 'dueDate')}
          className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="barakah">Sort by Barakah</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>

      {/* Task List */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="truncate text-sm font-medium text-primary-600">{task.title}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="text-sm text-gray-500">Barakah: {task.barakahScore}%</p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {task.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Due {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {task.niyyah && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Niyyah:</span> {task.niyyah}
                    </p>
                  </div>
                )}
                {task.dua && (
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Du'a:</span> {task.dua}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <NewTaskModal
        isOpen={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onSave={handleSaveTask}
      />
    </div>
  )
} 