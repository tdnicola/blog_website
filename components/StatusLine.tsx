'use client'

import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function formatPacificTime(date: Date): string {
  const parts = formatter.formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return `${get('hour')}:${get('minute')}:${get('second')}`
}

export default function StatusLine() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    setTime(formatPacificTime(new Date()))
    const interval = setInterval(() => {
      setTime(formatPacificTime(new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="status-line">
      <span>{time ? `Local time, PT ${time}` : 'Local time, PT --:--:--'}</span>
    </p>
  )
}
