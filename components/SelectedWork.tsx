'use client'

import Link from 'next/link'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/projects'

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

      {/* Vertical stack — one project per scroll */}
      <div className="px-10 md:px-16 py-12 flex flex-col gap-16 md:gap-20">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="block">
            <ProjectCard {...p} />
          </Link>
        ))}

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
