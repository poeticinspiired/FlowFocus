'use client'

import { useState, useEffect } from 'react'
import { getPrayerTimes, getNextPrayerTime, getTimeUntilNextPrayer, PrayerTimes } from '@/services/prayerTimes'

interface PrayerTimesDisplayProps {
  onPrayerTimeApproachingAction: (minutesUntilPrayer: number) => void
}

export default function PrayerTimesDisplay({ onPrayerTimeApproachingAction }: PrayerTimesDisplayProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        // In a real app, you would get these from user preferences or geolocation
        const latitude = 51.5074 // London coordinates as example
        const longitude = -0.1278
        const times = await getPrayerTimes(latitude, longitude)
        setPrayerTimes(times)
        setNextPrayer(getNextPrayerTime(times))
      } catch (err) {
        setError('Failed to fetch prayer times')
      }
    }

    fetchPrayerTimes()
    const interval = setInterval(fetchPrayerTimes, 1000 * 60 * 60) // Update every hour
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (prayerTimes) {
      const minutesUntilPrayer = getTimeUntilNextPrayer(prayerTimes)
      if (minutesUntilPrayer <= 30) { // Notify when prayer is within 30 minutes
        onPrayerTimeApproachingAction(minutesUntilPrayer)
      }
    }
  }, [prayerTimes, onPrayerTimeApproachingAction])

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  if (!prayerTimes || !nextPrayer) {
    return (
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-700">Loading prayer times...</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-medium text-gray-900">Prayer Times</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Object.entries(prayerTimes).map(([name, time]) => (
          <div
            key={name}
            className={`rounded-lg p-3 ${
              name === nextPrayer.name ? 'bg-primary-50' : 'bg-gray-50'
            }`}
          >
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        ))}
      </div>
      {nextPrayer && (
        <div className="mt-4 rounded-lg bg-primary-50 p-3">
          <p className="text-sm font-medium text-primary-900">Next Prayer</p>
          <p className="text-sm text-primary-700">
            {nextPrayer.name} at {nextPrayer.time}
          </p>
        </div>
      )}
    </div>
  )
} 