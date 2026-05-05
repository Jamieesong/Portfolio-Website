'use client'

import { useEffect, useState } from 'react'

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{time}</span>
}

export default function FloatingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 py-5 pointer-events-none">
      <a
        href="#work"
        className="pointer-events-auto font-data text-[11px] uppercase tracking-widest text-ink hover:text-terra transition-colors duration-200 underline underline-offset-4 decoration-ink/30 hover:decoration-terra"
      >
        Work ↓
      </a>
      <span className="font-data text-[9px] text-ink/35 tracking-widest pointer-events-none">
        <LiveClock />
      </span>
      <a
        href="#about"
        className="pointer-events-auto font-data text-[11px] uppercase tracking-widest text-ink hover:text-terra transition-colors duration-200 underline underline-offset-4 decoration-ink/30 hover:decoration-terra"
      >
        About
      </a>
    </nav>
  )
}
