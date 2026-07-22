'use client'

import { useEffect, useRef, useState } from 'react'
import { useIssPosition } from '@/components/useIssPosition'

const label = {
  fontSize: 10.5,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
}

export default function IssJourney() {
  const { position, signalLost, loading, lastUpdated } = useIssPosition()
  const [distanceKm, setDistanceKm] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const latestRef = useRef({ position, signalLost })
  latestRef.current = { position, signalLost }

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(Date.now())
      const { position: p, signalLost: lost } = latestRef.current
      // Freeze accumulation while signal is lost - p is stale (last-known)
      // once a poll fails, so its velocity is no longer trustworthy.
      setDistanceKm((prev) => (p && !lost ? prev + p.velocity / 3600 : prev))
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  const statusActive = !loading && !signalLost
  const statusLabel = loading ? 'Connecting' : signalLost ? 'Signal lost' : 'Tracking'
  const secondsAgo = lastUpdated ? Math.max(0, Math.round((now - lastUpdated) / 1000)) : null

  return (
    <div style={{ fontFamily: 'var(--font-mono), monospace', minWidth: 220 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: 'var(--ink)',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        International Space Station
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 16,
          color: statusActive ? 'var(--orange-text)' : 'var(--muted)',
          ...label,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: statusActive ? 'var(--orange-graphic)' : 'var(--muted)',
            display: 'inline-block',
          }}
        />
        {statusLabel}
      </div>

      {position ? (
        <>
          <div style={{ ...label, color: 'var(--muted)', marginBottom: 4 }}>Currently over</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 10,
              lineHeight: 1.2,
            }}
          >
            {position.region}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              fontVariantNumeric: 'tabular-nums',
              paddingBottom: 14,
              marginBottom: 14,
              borderBottom: '1px solid var(--divider)',
            }}
          >
            {distanceKm.toLocaleString('en-US', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{' '}
            km traveled this session
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              columnGap: 10,
              rowGap: 4,
              color: 'var(--muted)',
              ...label,
            }}
          >
            <span>Lat</span>
            <span style={{ color: 'var(--ink)' }}>{position.latitude.toFixed(2)}</span>
            <span>Lon</span>
            <span style={{ color: 'var(--ink)' }}>{position.longitude.toFixed(2)}</span>
            <span>Alt</span>
            <span style={{ color: 'var(--ink)' }}>{Math.round(position.altitude)} km</span>
            <span>Vel</span>
            <span style={{ color: 'var(--ink)' }}>
              {Math.round(position.velocity).toLocaleString('en-US')} km/h
            </span>
          </div>
        </>
      ) : (
        <div style={{ ...label, color: 'var(--muted)' }}>{loading ? 'Connecting…' : 'No data'}</div>
      )}

      {secondsAgo !== null && (
        <div style={{ ...label, color: 'var(--muted)', marginTop: 12 }}>
          Updated {secondsAgo}s ago
        </div>
      )}
    </div>
  )
}
