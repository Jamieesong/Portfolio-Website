'use client'

import { useEffect, useRef } from 'react'

interface InteractiveSectionsProps {
  images: string[]
  title: string
  /** 1-indexed groups of consecutive sections that should render as one
   * continuous block (no gap between the images inside the group). */
  groups?: number[][]
  /** 1-indexed block indices that should NOT participate in scroll-snap
   * centring — typically multi-screen tall sections that need to scroll
   * freely. Multi-image groups are auto-excluded regardless. */
  noSnapSections?: number[]
}

function buildBlocks(images: string[], groups?: number[][]): string[][] {
  if (!groups || groups.length === 0) return images.map((src) => [src])

  const startMap = new Map<number, number[]>()
  const inGroup = new Set<number>()
  for (const g of groups) {
    const sorted = [...g].sort((a, b) => a - b)
    sorted.forEach((idx) => inGroup.add(idx))
    if (sorted.length > 0) startMap.set(sorted[0], sorted)
  }

  const result: string[][] = []
  for (let i = 0; i < images.length; i++) {
    const oneIndexed = i + 1
    if (startMap.has(oneIndexed)) {
      const ids = startMap.get(oneIndexed)!
      result.push(
        ids.map((idx) => images[idx - 1]).filter((src): src is string => !!src)
      )
    } else if (!inGroup.has(oneIndexed)) {
      result.push([images[i]])
    }
  }
  return result
}

/**
 * Renders portfolio images as scroll-reveal sections sitting over a fixed,
 * crossfading backdrop. Each section's blurred image is stacked in the
 * fixed layer with opacity driven by how much of that section currently
 * overlaps the viewport — so adjacent sections hand off their background
 * colors as a smooth gradient instead of cutting at the boundary.
 */
export default function InteractiveSections({
  images,
  title,
  groups,
  noSnapSections,
}: InteractiveSectionsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const blocks = buildBlocks(images, groups)
  const skipSnap = new Set(noSnapSections ?? [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const items = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal]')
    )
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>('[data-section]')
    )
    const backdrops = Array.from(
      root.querySelectorAll<HTMLImageElement>('[data-backdrop]')
    )

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      items.forEach((el) => el.classList.add('is-visible'))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              io.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.05,
        }
      )
      items.forEach((el) => io.observe(el))
    }

    let ticking = false
    function update() {
      ticking = false
      const vh = window.innerHeight
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect()
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(vh, rect.bottom)
        const overlap = Math.max(0, visibleBottom - visibleTop)
        const opacity = Math.min(1, overlap / vh)
        const bg = backdrops[i]
        if (bg) bg.style.opacity = String(opacity)
      })
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    // Enable y-axis scroll-snap while this interactive page is mounted, so
    // single-frame sections snap to viewport centre. Restored on unmount so
    // other pages keep their normal free-scroll behaviour.
    const html = document.documentElement
    const prevSnap = html.style.scrollSnapType
    html.style.scrollSnapType = 'y proximity'

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      html.style.scrollSnapType = prevSnap
    }
    // Effect runs once on mount; DOM nodes are stable for the lifetime of the
    // component (blocks are derived from immutable props).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      {/* Fixed crossfading backdrop layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {blocks.map((block, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={block[0]}
            data-backdrop
            src={block[0]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-[80px] scale-110"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Sections — each fills one viewport so only one section's bg is
          ever fully active at a time; transitions are handled by the
          backdrop crossfade above. */}
      {blocks.map((block, i) => {
        const snap = block.length === 1 && !skipSnap.has(i + 1)
        return (
        <div
          key={block[0]}
          data-reveal
          data-section
          style={{
            transitionDelay: `${Math.min(i, 4) * 60}ms`,
            scrollSnapAlign: snap ? 'center' : 'none',
          }}
          className="reveal-item relative z-10 w-full min-h-screen flex items-center justify-center py-12 md:py-16"
        >
          <figure className="relative w-[96%] md:w-[80%] max-w-[1200px] mx-auto overflow-hidden rounded-[14px] shadow-[0_40px_100px_-40px_rgba(45,36,30,0.4)] border border-ink/10">
            {block.map((src, j) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${title} — section ${i + 1}${
                  block.length > 1 ? `.${j + 1}` : ''
                }`}
                className="block w-full h-auto"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ))}
          </figure>
        </div>
        )
      })}

      <style jsx>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .reveal-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
