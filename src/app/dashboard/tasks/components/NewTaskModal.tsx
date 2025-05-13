'use client'

import { useState } from 'react'
import { Task, TaskCategory, TaskPriority } from '../types'

interface NewTaskModalProps {
  isOpen: boolean
  onCloseAction: () => void
  onSaveAction: (task: Omit<Task, 'id'>) => void
}

const categoryDescriptions = {
  ibadah: 'Acts of worship and spiritual development',
  ilm: 'Seeking knowledge and learning',
  khidmah: 'Service to community and others',
  personal: 'Personal development and well-being',
  work: 'Professional and career development',
}

const barakahQuestions = [
  {
    question: 'Does this task align with Islamic values and principles?',
    weight: 0.3,
  },
  {
    question: 'Will this task benefit others or the community?',
    weight: 0.2,
  },
  {
    question: 'Does this task contribute to your spiritual growth?',
    weight: 0.2,
  },
  {
    question: 'Is this task performed with the right intention?',
    weight: 0.2,
  },
  {
    question: 'Does this task avoid harm or negative consequences?',
    weight: 0.1,
  },
]

export default function NewTaskModal({ isOpen, onCloseAction, onSaveAction }: NewTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work' as TaskCategory,
    priority: 'medium' as TaskPriority,
    dueDate: '',
    niyyah: '',
    dua: '',
  })

  const [barakahAnswers, setBarakahAnswers] = useState<Record<number, number>>({})

  const calculateBarakahScore = () => {
    const totalWeight = barakahQuestions.reduce((sum, q) => sum + q.weight, 0)
    const weightedSum = barakahQuestions.reduce((sum, q, index) => {
      return sum + (barakahAnswers[index] || 0) * q.weight
    }, 0)
    return Math.round((weightedSum / totalWeight) * 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const barakahScore = calculateBarakahScore()
    onSaveAction({
      ...formData,
      status: 'pending',
      barakahScore,
    })
    onCloseAction()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Task</h3>
              <p className="mt-1 text-sm text-gray-500">
                Set your intention and let AI help prioritize your tasks based on barakah.
              </p>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskCategory })}
              >
                {Object.entries(categoryDescriptions).map(([value, description]) => (
                  <option key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)} - {description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="niyyah" className="block text-sm font-medium text-gray-700">
                Niyyah (Intention)
              </label>
              <textarea
                id="niyyah"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Set your intention for this task..."
                value={formData.niyyah}
                onChange={(e) => setFormData({ ...formData, niyyah: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="dua" className="block text-sm font-medium text-gray-700">
                Du'a (Optional)
              </label>
              <textarea
                id="dua"
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Add a relevant du'a for this task..."
                value={formData.dua}
                onChange={(e) => setFormData({ ...formData, dua: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Barakah Assessment</h4>
              {barakahQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm text-gray-700">{question.question}</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={barakahAnswers[index] || 0}
                      onChange={(e) =>
                        setBarakahAnswers({ ...barakahAnswers, [index]: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{barakahAnswers[index] || 0}/10</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 text-right">
                <span className="text-sm font-medium text-gray-700">
                  Barakah Score: {calculateBarakahScore()}%
                </span>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
              >
                Create Task
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                onClick={onCloseAction}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 