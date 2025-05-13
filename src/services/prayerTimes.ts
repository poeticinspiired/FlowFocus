export interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

interface PrayerTimesResponse {
  code: number
  status: string
  data: {
    timings: PrayerTimes
    date: {
      readable: string
      timestamp: string
      hijri: {
        date: string
        month: {
          number: number
          en: string
          ar: string
        }
        year: string
      }
      gregorian: {
        date: string
        month: {
          number: number
          en: string
        }
        year: string
      }
    }
  }
}

export async function getPrayerTimes(latitude: number, longitude: number): Promise<PrayerTimes> {
  const response = await fetch(
    `http://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${latitude}&longitude=${longitude}&method=2`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch prayer times')
  }

  const data: PrayerTimesResponse = await response.json()
  return data.data.timings
}

export function getNextPrayerTime(prayerTimes: PrayerTimes): { name: string; time: string } {
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false })

  const prayers = Object.entries(prayerTimes).map(([name, time]) => ({
    name,
    time: time.split(' ')[0] // Remove AM/PM
  }))

  const nextPrayer = prayers.find(prayer => prayer.time > currentTime)
  return nextPrayer || { name: 'Fajr', time: prayerTimes.Fajr.split(' ')[0] }
}

export function getTimeUntilNextPrayer(prayerTimes: PrayerTimes): number {
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false })
  const { time: nextPrayerTime } = getNextPrayerTime(prayerTimes)

  const [currentHours, currentMinutes] = currentTime.split(':').map(Number)
  const [prayerHours, prayerMinutes] = nextPrayerTime.split(':').map(Number)

  let minutesUntilPrayer = (prayerHours - currentHours) * 60 + (prayerMinutes - currentMinutes)
  if (minutesUntilPrayer < 0) {
    minutesUntilPrayer += 24 * 60 // Add 24 hours if the next prayer is tomorrow
  }

  return minutesUntilPrayer
} 