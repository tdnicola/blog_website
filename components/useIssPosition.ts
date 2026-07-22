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

    poll()
    const interval = setInterval(poll, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { position, signalLost, loading, lastUpdated }
}
