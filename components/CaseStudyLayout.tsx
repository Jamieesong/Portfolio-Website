'use client'

import { useEffect, useState } from 'react'
import type { CaseStudySection } from '@/lib/projects'

interface CaseStudyLayoutProps {
  number: string
  tag: string
  title: string
  description: string
  role: string
  timeline: string
  tools: string[]
  outcome: string
  images: string[]
  sections: CaseStudySection[]
}

/**
 * Editorial case-study layout: centred header + Role/Timeline/Tools/Outcome
 * summary grid on top, then a two-column body — a sticky section TOC on
 * the left (desktop only) and narrative sections stacked on the right with
 * alternating backgrounds, a narrow reading column, and full-width imagery.
 */
export default function CaseStudyLayout({
  number,
  tag,
  title,
  description,
  role,
  timeline,
  tools,
  outcome,
  images,
  sections,
}: CaseStudyLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    if (!sections.length) return
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    if (els.length === 0) return

    // Scroll-spy: the section whose top most recently crossed the ~30%
    // marker from the top of the viewport is considered active.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <div className="w-full">
      {/* Header — centred title + description */}
      <header className="pt-32 pb-12 px-8 md:px-16 max-w-3xl mx-auto text-center">
        <p className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6">
          {number} · {tag}
        </p>
        <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink leading-[1.05] mb-6">
          {title}
        </h1>
        <p className="font-sans text-ink/70 text-sm md:text-base leading-[1.7] max-w-xl mx-auto">
          {description}
        </p>
      </header>

      {/* Role / Timeline / Tools / Outcome — 4-cell summary */}
      <div className="max-w-5xl mx-auto px-8 md:px-16 mb-16 md:mb-24">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 md:gap-x-12 border-t border-b border-ink/15 py-8 md:py-10">
          <SummaryCell label="Role" value={role} />
          <SummaryCell label="Timeline" value={timeline} />
          <SummaryCell label="Tools" value={tools.join(', ')} />
          <SummaryCell label="Outcome" value={outcome} />
        </dl>
      </div>

      {/* Case study body — sticky TOC + alternating-bg sections */}
      <div className="max-w-6xl mx-auto flex gap-12 md:gap-16 px-8 md:px-16 pb-16 md:pb-24">
        {/* Sticky section TOC (desktop only) */}
        <aside className="hidden md:block w-40 flex-shrink-0">
          <nav
            aria-label="Case study sections"
            className="sticky top-32 flex flex-col gap-3"
          >
            <p className="font-data text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-2">
              Sections
            </p>
            {sections.map((s) => {
              const active = s.id === activeId
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`font-data text-[10.5px] uppercase tracking-[0.14em] leading-snug transition-colors duration-200 ${
                    active
                      ? 'text-terra'
                      : 'text-ink/40 hover:text-ink'
                  }`}
                >
                  {s.title}
                </a>
              )
            })}
          </nav>
        </aside>

        {/* Content column — sections with alternating bg */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className={`rounded-2xl px-6 md:px-10 py-12 md:py-16 ${
                i % 2 === 1 ? 'bg-ink/[0.035]' : 'bg-white'
              }`}
              style={{ scrollMarginTop: '96px' }}
            >
              <div className="max-w-[620px] mb-8 md:mb-10">
                <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-ink leading-tight mb-4">
                  {s.title}
                </h2>
                <p className="font-sans text-ink/70 text-sm md:text-[15px] leading-[1.75]">
                  {s.intro}
                </p>
              </div>

              {s.imageIndices.length > 0 && (
                <div className="flex flex-col gap-4 md:gap-6">
                  {s.imageIndices.map((idx, j) => {
                    const src = images[idx - 1]
                    if (!src) return null
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt={`${title} — ${s.title}`}
                        className="w-full h-auto rounded-lg border border-ink/10 shadow-[0_20px_60px_-40px_rgba(45,36,30,0.25)]"
                        loading={i === 0 && j < 2 ? 'eager' : 'lazy'}
                      />
                    )
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-data text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-2">
        {label}
      </dt>
      <dd className="font-sans text-ink text-sm md:text-[15px] leading-[1.45]">
        {value}
      </dd>
    </div>
  )
}
