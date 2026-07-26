'use client'

import { useEffect, useRef, useState } from 'react'
import type { IssPosition } from '@/lib/iss'

const POLL_MS = 9000

export interface IssPositionState {
  position: IssPosition | null
  signalLost: boolean
  loading: boolean
  lastUpdated: number | null
}

export function useIssPosition(): IssPositionState {
  const [position, setPosition] = useState<IssPosition | null>(null)
  const [signalLost, setSignalLost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    let intervalId: ReturnType<typeof setInterval> | null = null

    async function poll() {
      const requestId = ++requestIdRef.current
      try {
        const res = await fetch('/api/iss')
        if (!res.ok) throw new Error('bad response')
        const data: IssPosition = await res.json()
        if (cancelled || requestId !== requestIdRef.current) return
        setPosition(data)
        setSignalLost(false)
        setLastUpdated(Date.now())
      } catch {
        if (cancelled || requestId !== requestIdRef.current) return
        setSignalLost(true)
      } finally {
        if (!cancelled && requestId === requestIdRef.current) setLoading(false)
      }
    }

    function startPolling() {
      if (intervalId) return
      intervalId = setInterval(poll, POLL_MS)
    }

    function stopPolling() {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    // Don't rely on browser timer throttling to be considerate of a
    // backgrounded/hidden tab - that behavior is inconsistent across
    // browsers and platforms. Pause outright when hidden, and poll
    // immediately (rather than waiting out a stale interval) on return.
    function handleVisibilityChange() {
      if (document.hidden) {
        stopPolling()
      } else {
        poll()
        startPolling()
      }
    }

    poll()
    startPolling()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelled = true
      stopPolling()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { position, signalLost, loading, lastUpdated }
}
