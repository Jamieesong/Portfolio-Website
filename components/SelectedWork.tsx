'use client'

import ProjectCard from './ProjectCard'

const projects = [
  {
    number: '01',
    title: 'Pawlog',
    subtitle: 'UX/UI Mobile App',
    description:
      "An end-to-end mobile app for pet owners to track their dog's daily activities — from feeding and walks to vet records — designed around quick logging and gentle reminders that respect a busy life.",
    tag: 'Application',
    year: '2025',
    role: 'Product designer',
    tools: ['Figma', 'Principle', 'Notion'],
    image: '/projects/pawlog.png',
    imagePosition: 'center',
  },
  {
    number: '02',
    title: 'Gentle Monster',
    subtitle: 'Web Promotion',
    description:
      "A campaign site for Gentle Monster's 2024 New Collection — Gentle Jelly & Void KC6 — built around two distinct visual worlds with shared structural typography.",
    tag: 'Promotion',
    year: '2024',
    role: 'Visual designer',
    tools: ['Figma', 'After Effects', 'Cinema 4D'],
    image: '/projects/gentle-monster.avif',
    imagePosition: 'center 30%',
  },
  {
    number: '03',
    title: 'Santa Maria Novella',
    subtitle: 'Website Redesign',
    description:
      "A luxury brand visual system renewal for the world's oldest pharmacy — a unified grid, redesigned key pages, and a softer typographic voice that honours the brand's heritage.",
    tag: 'Website',
    year: '2024',
    role: 'UI / Brand',
    tools: ['Figma', 'Webflow', 'Illustrator'],
    image: '/projects/santa-maria-novella.png',
    imagePosition: 'center 35%',
  },
  {
    number: '04',
    title: 'ParkSound AI',
    subtitle: 'AI UX Mobile App',
    description:
      "An AI-powered iOS concept connecting NYC residents with free live park performances — recommendations tuned to weather, mood, and proximity, surfaced through a quiet conversational interface.",
    tag: 'AI Project',
    year: '2025',
    role: 'UX designer',
    tools: ['Figma', 'Framer', 'OpenAI API'],
    image: '/projects/parksound.png',
    imagePosition: 'center',
  },
  {
    number: '05',
    title: 'ETMON',
    subtitle: 'Seasonal Promotion',
    description:
      'Multi-format digital assets for seasonal campaigns and lifestyle storytelling — a flexible system spanning landing pages, social cuts, and editorial layouts.',
    tag: 'Promotion',
    year: '2023',
    role: 'Visual designer',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    image: '/projects/etmon.webp',
    imagePosition: 'center',
  },
]

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="w-full flex flex-col border-b-2 border-ink bg-bone"
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
          <ProjectCard key={p.number} {...p} />
        ))}

        {/* Coming soon — minimal closing tile */}
        <article className="group cursor-crosshair flex flex-col gap-5 w-full max-w-2xl mx-auto">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px] border border-ink/20 flex items-center justify-center transition-colors duration-700 group-hover:border-terra/60">
            <div className="flex flex-col items-center gap-3">
              <span className="text-ink/30 text-2xl group-hover:text-terra transition-colors duration-700">
                ✦
              </span>
              <span className="font-data text-[10px] uppercase tracking-widest text-ink/30 group-hover:text-terra transition-colors duration-700">
                More soon
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-ink/40 leading-tight">
              In the studio
            </h3>
            <p className="font-sans text-ink/40 text-sm leading-relaxed">
              New work in progress for 2026 — product, brand, and a few
              experiments in between.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
