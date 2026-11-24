'use client'

import { useEffect, useRef, useState } from 'react'
import { useIssPosition } from '@/components/useIssPosition'

const label = {
  fontSize: 12,
  letterSpacing: 0,
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

  const secondsAgo = lastUpdated ? Math.max(0, Math.round((now - lastUpdated) / 1000)) : null

  return (
    <aside className="iss-panel" aria-label="Live International Space Station position">
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 600,
          color: 'var(--ink)',
          marginBottom: 10,
        }}
      >
        International Space Station
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

          <dl className="iss-data">
            <dt>Lat</dt>
            <dd>{position.latitude.toFixed(2)}</dd>
            <dt>Lon</dt>
            <dd>{position.longitude.toFixed(2)}</dd>
            <dt>Alt</dt>
            <dd>{Math.round(position.altitude)} km</dd>
            <dt>Vel</dt>
            <dd>{Math.round(position.velocity).toLocaleString('en-US')} km/h</dd>
          </dl>
        </>
      ) : (
        <div style={{ ...label, color: 'var(--muted)' }}>{loading ? 'Connecting…' : 'No data'}</div>
      )}

      {secondsAgo !== null && (
        <div style={{ ...label, color: 'var(--muted)', marginTop: 12 }}>
          Updated {secondsAgo}s ago
        </div>
      )}
    </aside>
  )
}
