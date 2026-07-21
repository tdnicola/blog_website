'use client'

import { useEffect, useRef, useState } from 'react'
import type { IssPosition } from '@/lib/iss'

const SIZE = 240
const CENTER = SIZE / 2
const RINGS = [55, 82, 108]
const TICK_DEG = 30
const CARDINAL_TICKS = [0, 90, 180, 270]
const POLL_MS = 9000

// 0deg = top (north), increasing clockwise like a compass bearing
function toXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  // Round to avoid SSR/client hydration mismatches from last-digit float
  // differences between server and browser Math.sin/Math.cos implementations.
  return {
    x: round(CENTER + radius * Math.cos(rad)),
    y: round(CENTER + radius * Math.sin(rad)),
  }
}

function round(n: number) {
  return Math.round(n * 1000) / 1000
}

function issAngle(longitude: number) {
  return (longitude + 180 + 360) % 360
}

export default function OrbitalDial() {
  const [position, setPosition] = useState<IssPosition | null>(null)
  const [signalLost, setSignalLost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
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

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(tick)
  }, [])

  const node = position ? toXY(issAngle(position.longitude), RINGS[2]) : null
  const secondsAgo = lastUpdated ? Math.max(0, Math.round((now - lastUpdated) / 1000)) : null
  const statusActive = !loading && !signalLost
  const statusLabel = loading ? 'Connecting' : signalLost ? 'Signal lost' : 'Tracking'

  return (
    <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 24 }}>
      <svg
        aria-hidden="true"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ flexShrink: 0 }}
      >
        {RINGS.map((r, i) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke="var(--muted)"
            strokeOpacity={0.4}
            strokeWidth={1}
            strokeDasharray={i === 1 ? '4 5' : undefined}
          />
        ))}

        {Array.from({ length: 12 }).map((_, i) => {
          const deg = i * TICK_DEG
          const inner = toXY(deg, RINGS[2] + 3)
          const outer = toXY(deg, RINGS[2] + 9)
          return (
            <line
              key={deg}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--muted)"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
          )
        })}

        {CARDINAL_TICKS.map((deg) => {
          const pos = toXY(deg, RINGS[2] + 20)
          return (
            <text
              key={deg}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 9,
                fill: 'var(--muted)',
              }}
            >
              {deg}&deg;
            </text>
          )
        })}

        <g className="sp-dial-sweep" style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const deg = i * 4
            const p = toXY(deg, RINGS[2])
            // The group rotates clockwise, so the highest local angle (i = 7) is the
            // leading edge - it should be brightest, fading out behind it toward i = 0,
            // like a radar beam's phosphor afterglow decaying after the beam passes.
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke="var(--orange-graphic)"
                strokeOpacity={Math.max(1 - (7 - i) * 0.13, 0)}
                strokeWidth={1}
              />
            )
          })}
        </g>

        {node && (
          <circle
            cx={node.x}
            cy={node.y}
            r={4}
            fill="var(--orange-graphic)"
            opacity={signalLost ? 0.35 : 1}
          />
        )}
      </svg>

      <div
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          letterSpacing: '0.05em',
          color: 'var(--muted)',
          minWidth: 170,
        }}
      >
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
            marginBottom: 10,
            textTransform: 'uppercase',
            color: statusActive ? 'var(--orange-text)' : 'var(--muted)',
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

        {loading ? (
          <div style={{ textTransform: 'uppercase' }}>Connecting&hellip;</div>
        ) : position ? (
          <div
            style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: 10, rowGap: 4 }}
          >
            <span style={{ textTransform: 'uppercase' }}>Lat</span>
            <span style={{ color: 'var(--ink)' }}>{position.latitude.toFixed(2)}</span>
            <span style={{ textTransform: 'uppercase' }}>Lon</span>
            <span style={{ color: 'var(--ink)' }}>{position.longitude.toFixed(2)}</span>
            <span style={{ textTransform: 'uppercase' }}>Alt</span>
            <span style={{ color: 'var(--ink)' }}>{Math.round(position.altitude)} km</span>
            <span style={{ textTransform: 'uppercase' }}>Vel</span>
            <span style={{ color: 'var(--ink)' }}>
              {Math.round(position.velocity).toLocaleString('en-US')} km/h
            </span>
          </div>
        ) : (
          <div style={{ textTransform: 'uppercase' }}>No data</div>
        )}

        {secondsAgo !== null && (
          <div style={{ marginTop: 10, textTransform: 'uppercase' }}>Updated {secondsAgo}s ago</div>
        )}
      </div>
    </div>
  )
}
