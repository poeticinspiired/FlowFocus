'use client'

import { Task } from '../../tasks/types'

interface TaskSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (task: Task) => void
  tasks: Task[]
}

export default function TaskSelectorModal({ isOpen, onClose, onSelect, tasks }: TaskSelectorModalProps) {
  if (!isOpen) return null

  const pendingTasks = tasks.filter(task => task.status === 'pending')

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Select a Task</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a task to focus on during your session.
            </p>
          </div>

          <div className="mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {pendingTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <button
                      onClick={() => {
                        onSelect(task)
                        onClose()
                      }}
                      className="w-full text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="truncate text-sm text-gray-500">{task.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Barakah: {task.barakahScore}%</p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 