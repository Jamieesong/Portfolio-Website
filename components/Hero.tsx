'use client'

import { useEffect, useRef, useState } from 'react'

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time}</span>
}

function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const cur = useRef({ x: -100, y: -100 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    let raf: number
    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1
      cur.current.y += (pos.current.y - cur.current.y) * 0.1
      if (ref.current)
        ref.current.style.transform = `translate(${cur.current.x - 5}px, ${cur.current.y - 5}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-terra pointer-events-none z-50 opacity-40"
      style={{ willChange: 'transform' }}
    />
  )
}

function StarOutline() {
  const [hovered, setHovered] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })

  useEffect(() => {
    // Geometry: 5-point artistic illustrated star — large, asymmetric, sweeping arms.
    // Each arm has its own length + slight angle drift so it feels hand-drawn, not geometric.
    const N = 5
    const cx = 50
    const cy = 50
    const tipRs = [44, 47, 39, 46, 41]   // uneven arm lengths
    const valRs = [19, 17, 21, 18, 16]   // tighter valleys = more pointy + illustrative
    const tipOffsets = [0, 0.07, -0.05, 0.04, -0.08] // wonky angular placement
    const valOffsets = [0.03, -0.04, 0.05, -0.06, 0.02]

    const keyPoints: { angle: number; r: number }[] = []
    for (let i = 0; i < N; i++) {
      const tipAngle = (i / N) * Math.PI * 2 - Math.PI / 2 + tipOffsets[i]
      const valAngle = ((i + 0.5) / N) * Math.PI * 2 - Math.PI / 2 + valOffsets[i]
      keyPoints.push({ angle: tipAngle, r: tipRs[i] })
      keyPoints.push({ angle: valAngle, r: valRs[i] })
    }
    const tipR = Math.max(...tipRs) // used for proximity check below

    // Densify between key points so the line has many samples → per-sample wrinkles
    // produce an irregular hand-drawn feel rather than a clean mathematical curve.
    const SUBDIV = 7
    const base: { angle: number; r: number }[] = []
    for (let i = 0; i < keyPoints.length; i++) {
      const a = keyPoints[i]
      const b = keyPoints[(i + 1) % keyPoints.length]
      let da = b.angle - a.angle
      if (da < -Math.PI) da += Math.PI * 2
      if (da > Math.PI) da -= Math.PI * 2
      for (let s = 0; s < SUBDIV; s++) {
        const u = s / SUBDIV
        base.push({ angle: a.angle + da * u, r: a.r + (b.r - a.r) * u })
      }
    }

    // Catmull-Rom → cubic Bezier for smooth closed curve through points.
    const buildPath = (pts: { x: number; y: number }[]) => {
      const n = pts.length
      let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `
      for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n]
        const p1 = pts[i]
        const p2 = pts[(i + 1) % n]
        const p3 = pts[(i + 2) % n]
        const c1x = p1.x + (p2.x - p0.x) / 6
        const c1y = p1.y + (p2.y - p0.y) / 6
        const c2x = p2.x - (p3.x - p1.x) / 6
        const c2y = p2.y - (p3.y - p1.y) / 6
        d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `
      }
      return d + 'Z'
    }

    let raf = 0
    let t = 0
    const mouseSmooth = { x: 50, y: 50, active: 0 }
    const PROXIMITY = tipR + 8 // mouse must be near the star for any deformation

    const loop = () => {
      t += 0.0025 // slow, underwater-paced drift

      // Is the cursor actually near the star right now?
      const dxm = mouseRef.current.x - cx
      const dym = mouseRef.current.y - cy
      const mouseDist = Math.sqrt(dxm * dxm + dym * dym)
      const near = mouseRef.current.active && mouseDist < PROXIMITY

      if (near) {
        // Slow, viscous tracking — like moving through water.
        mouseSmooth.x += (mouseRef.current.x - mouseSmooth.x) * 0.05
        mouseSmooth.y += (mouseRef.current.y - mouseSmooth.y) * 0.05
        mouseSmooth.active += (1 - mouseSmooth.active) * 0.05
      } else {
        // Snap back to resting state immediately when mouse leaves the star.
        mouseSmooth.active = 0
      }

      const pts = base.map((bp, i) => {
        // Layered low-frequency drift + higher-frequency irregular wrinkles
        // so the line looks hand-drawn and slightly crumpled, not perfectly smooth.
        const wr =
          bp.r +
          Math.sin(t * 0.8 + i * 0.25) * 0.9 +   // slow macro drift
          Math.sin(t * 1.6 + i * 1.9) * 0.45 +   // mid wrinkle
          Math.sin(t * 2.7 + i * 4.1) * 0.25     // fine wrinkle
        const wa =
          bp.angle +
          Math.sin(t * 0.6 + i * 0.4) * 0.012 +
          Math.sin(t * 1.3 + i * 2.2) * 0.006

        let x = cx + Math.cos(wa) * wr
        let y = cy + Math.sin(wa) * wr

        if (mouseSmooth.active > 0.01) {
          const dx = x - mouseSmooth.x
          const dy = y - mouseSmooth.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001
          const RADIUS = 20
          const influence = Math.max(0, 1 - dist / RADIUS) * mouseSmooth.active
          if (influence > 0) {
            const soft = influence * influence * (3 - 2 * influence)
            const push = soft * 5
            x += (dx / dist) * push
            y += (dy / dist) * push
          }
        }
        return { x, y }
      })

      const d = buildPath(pts)
      if (pathRef.current) pathRef.current.setAttribute('d', d)
      if (glowRef.current) glowRef.current.setAttribute('d', d)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const pt = svgRef.current.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const ctm = svgRef.current.getScreenCTM()
      if (!ctm) return
      const p = pt.matrixTransform(ctm.inverse())
      mouseRef.current = { x: p.x, y: p.y, active: true }
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <defs>
        <filter id="star-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      {/* Soft blurred halo — gives the subtle gradient feel around the line */}
      <path
        ref={glowRef}
        fill="transparent"
        stroke={hovered ? '#a85238' : '#2d241e'}
        strokeWidth={hovered ? '1.4' : '1.0'}
        strokeOpacity={hovered ? 0.14 : 0.07}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#star-glow)"
        style={{
          transition:
            'stroke 1.6s cubic-bezier(0.23,1,0.32,1), stroke-width 1.6s cubic-bezier(0.23,1,0.32,1), stroke-opacity 1.6s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: 'none',
        }}
      />
      {/* Crisp thin line on top */}
      <path
        ref={pathRef}
        fill="transparent"
        stroke={hovered ? '#a85238' : '#2d241e'}
        strokeWidth={hovered ? '0.22' : '0.18'}
        strokeOpacity={hovered ? 0.35 : 0.22}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transition:
            'stroke 1.6s cubic-bezier(0.23,1,0.32,1), stroke-width 1.6s cubic-bezier(0.23,1,0.32,1), stroke-opacity 1.6s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: 'all',
        }}
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <>
      <CursorFollower />
      <section className="w-full h-screen relative overflow-hidden border-b-2 border-ink bg-bone">

        {/* Full-screen organic star outline — interactive */}
        <StarOutline />

        {/* CENTER — name + bio */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-8 pointer-events-none">
          <h1
            className="font-display font-bold uppercase text-ink tracking-[-0.02em] leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
          >
            Jamie Song.
          </h1>
          <p className="font-sans text-ink/60 text-sm mt-3 max-w-xs leading-relaxed">
            Product &amp; UX designer based in New York City.
          </p>
          <span className="mt-4 font-data text-ink/30 text-xs">↓</span>
        </div>

        {/* BOTTOM — current role */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-10 py-5 z-10 border-t-2 border-ink pointer-events-none">
          <p className="font-sans font-bold text-ink text-sm tracking-tight">
            UX Design Intern at{' '}
            <span
              style={{
                textDecoration: 'underline wavy',
                textDecorationColor: '#cc5d33',
                textDecorationThickness: '1px',
                textUnderlineOffset: '5px',
              }}
            >
              Next Play Games
            </span>
            &nbsp;·&nbsp; Interactive Media Arts Student at{' '}
            <span
              style={{
                textDecoration: 'underline wavy',
                textDecorationColor: '#cc5d33',
                textDecorationThickness: '1px',
                textUnderlineOffset: '5px',
              }}
            >
              NYU Tisch
            </span>
          </p>
        </div>

      </section>
    </>
  )
}
