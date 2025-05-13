'use client'

import { useState, useEffect, useCallback } from 'react'
import { Task } from '../tasks/types'
import TaskSelectorModal from './components/TaskSelectorModal'
import PrayerTimesDisplay from './components/PrayerTimesDisplay'

interface FocusSession {
  id: number
  taskId?: number
  startTime: Date
  endTime?: Date
  duration: number
  completed: boolean
  prayerTime?: string
}

const defaultDurations = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
}

export default function FocusPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [timeLeft, setTimeLeft] = useState(defaultDurations.work)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [showTaskSelector, setShowTaskSelector] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [showPrayerNotification, setShowPrayerNotification] = useState(false)
  const [minutesUntilPrayer, setMinutesUntilPrayer] = useState<number | null>(null)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const startSession = useCallback(() => {
    setIsRunning(true)
    const newSession: FocusSession = {
      id: sessions.length + 1,
      taskId: selectedTask?.id,
      startTime: new Date(),
      duration: timeLeft,
      completed: false
    }
    setSessions([...sessions, newSession])
  }, [selectedTask, sessions, timeLeft])

  const pauseSession = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetSession = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(defaultDurations[sessionType])
  }, [sessionType])

  const completeSession = useCallback(() => {
    setIsRunning(false)
    setSessions(sessions.map(session => 
      session.id === sessions.length
        ? { ...session, endTime: new Date(), completed: true }
        : session
    ))
    
    // Switch to break after work session
    if (sessionType === 'work') {
      setSessionType(sessions.length % 4 === 0 ? 'longBreak' : 'shortBreak')
      setTimeLeft(sessions.length % 4 === 0 ? defaultDurations.longBreak : defaultDurations.shortBreak)
    } else {
      setSessionType('work')
      setTimeLeft(defaultDurations.work)
    }
  }, [sessions, sessionType])

  const handlePrayerTimeApproaching = useCallback((minutes: number) => {
    setMinutesUntilPrayer(minutes)
    setShowPrayerNotification(true)
    
    // If a session is running, pause it
    if (isRunning) {
      pauseSession()
    }
  }, [isRunning, pauseSession])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      completeSession()
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft, completeSession])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Focus Session</h1>
        <button
          onClick={() => setShowTaskSelector(true)}
          className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          Select Task
        </button>
      </div>

      {/* Prayer Times Display */}
      <PrayerTimesDisplay onPrayerTimeApproaching={handlePrayerTimeApproaching} />

      {/* Prayer Time Notification */}
      {showPrayerNotification && minutesUntilPrayer !== null && (
        <div className="rounded-lg bg-primary-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">Prayer Time Approaching</h3>
              <div className="mt-2 text-sm text-primary-700">
                <p>Next prayer is in {minutesUntilPrayer} minutes. Consider taking a break for prayer.</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    className="rounded-md bg-primary-50 px-2 py-1.5 text-sm font-medium text-primary-800 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-primary-50"
                    onClick={() => setShowPrayerNotification(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 shadow">
        <div className="text-6xl font-bold text-primary-600">{formatTime(timeLeft)}</div>
        <div className="text-lg text-gray-600">
          {sessionType === 'work' ? 'Focus Time' : 'Break Time'}
        </div>
        {selectedTask && (
          <div className="text-center">
            <p className="text-sm text-gray-500">Current Task:</p>
            <p className="font-medium text-gray-900">{selectedTask.title}</p>
          </div>
        )}
        <div className="flex space-x-4">
          {!isRunning ? (
            <button
              onClick={startSession}
              className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
            >
              Start Session
            </button>
          ) : (
            <button
              onClick={pauseSession}
              className="inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetSession}
            className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Session History */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Session History</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {sessions.map((session) => (
                  <li key={session.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {session.completed ? 'Completed' : 'In Progress'}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {new Date(session.startTime).toLocaleTimeString()}
                          {session.endTime && ` - ${new Date(session.endTime).toLocaleTimeString()}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {Math.floor(session.duration / 60)} minutes
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Task Selector Modal */}
      <TaskSelectorModal
        isOpen={showTaskSelector}
        onClose={() => setShowTaskSelector(false)}
        onSelect={setSelectedTask}
        tasks={tasks}
      />
    </div>
  )
} 