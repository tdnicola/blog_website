import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function SpaceBackground() {
  const { resolvedTheme } = useTheme()
  const smRef = useRef(null)
  const lgRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        if (smRef.current) smRef.current.style.transform = `translate(${x * 10}px, ${y * 7}px)`
        if (lgRef.current) lgRef.current.style.transform = `translate(${x * 22}px, ${y * 15}px)`
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const isDark = resolvedTheme !== 'light'

  return (
    <>
      {/* Fixed bg — behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'var(--sp-bg)',
          backgroundImage: isDark
            ? 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.05) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.08) 0%, transparent 55%)',
        }}
      />

      {/* Star field + shooting stars — clipped so parallax overflow stays hidden */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div className="sp-stars-sm" ref={smRef} />
        <div className="sp-stars-lg" ref={lgRef} />
        <div className="sp-shoot-a" />
        <div className="sp-shoot-b" />
      </div>

      {/* Atmosphere — cold starlight from above */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center bottom, rgba(147,197,253,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </>
  )
}
