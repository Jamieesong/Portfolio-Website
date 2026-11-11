'use client'

import Link from 'next/link'
import ProjectCard from './ProjectCard'
import { projects, type Project } from '@/lib/projects'

const GROUPS: { key: Project['category']; label: string }[] = [
  { key: 'product', label: 'UI/UX · Product Design' },
  { key: 'graphic', label: 'Graphic · Web Design' },
]

function CardLink({ p }: { p: Project }) {
  return p.externalUrl ? (
    <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
      <ProjectCard {...p} />
    </a>
  ) : (
    <Link href={`/work/${p.slug}`} className="block">
      <ProjectCard {...p} />
    </Link>
  )
}

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="w-full flex flex-col border-b border-ink/25 bg-bone"
    >
      {/* Tiny scroll cue at top center */}
      <div className="flex items-center justify-center pt-24 pb-6">
        <span className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40">
          scroll ↓
        </span>
      </div>

      {/* Two groups, two columns each */}
      <div className="px-10 md:px-16 py-12 flex flex-col gap-20 md:gap-28">
        {GROUPS.map((g, gi) => {
          const items = projects.filter((p) => p.category === g.key)
          return (
            <div key={g.key} className={gi > 0 ? 'pt-16 md:pt-20 border-t border-ink/10' : ''}>
              <div className="mb-10 md:mb-12 flex items-baseline justify-between gap-4">
                <h2 className="font-data text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/55">
                  {g.label}
                </h2>
                <span className="font-data text-[9px] uppercase tracking-[0.25em] text-ink/30">
                  {String(items.length).padStart(2, '0')} projects
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-20">
                {items.map((p) => (
                  <CardLink key={p.slug} p={p} />
                ))}
              </div>
            </div>
          )
        })}

        {/* Coming soon — small de-emphasized closing note */}
        <article className="group flex flex-col items-center gap-3 w-full max-w-xs mx-auto pt-4 pb-2 opacity-70">
          <div className="relative w-full max-w-[200px] aspect-[4/3] overflow-hidden rounded-[14px] border border-dashed border-ink/20 flex items-center justify-center transition-colors duration-700 group-hover:border-terra/50">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-ink/30 text-sm group-hover:text-terra transition-colors duration-700">
                ✦
              </span>
              <span className="font-data text-[8.5px] uppercase tracking-[0.18em] text-ink/30 group-hover:text-terra transition-colors duration-700">
                More soon
              </span>
            </div>
          </div>
          <p className="font-data text-[9px] uppercase tracking-[0.2em] text-ink/35 text-center">
            In the studio · 2026
          </p>
        </article>
      </div>
    </section>
  )
}
