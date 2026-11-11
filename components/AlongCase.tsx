'use client'

import { useState, type ReactNode } from 'react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' })

const A = '/along'

const STATS = [
  { n: 0, label: 'say the walk takes too long', note: "Time isn't the problem. Sameness is.", q: 'What felt boring', bars: [['Same way', 5], ['Crowds', 4], ['Noise', 2]] },
  { n: 8, label: 'made an unplanned stop recently', note: 'People still want surprises.', q: 'What makes them stop', bars: [['Shop or sale', 8], ['Pop-up', 6], ['Park or view', 5]] },
  { n: 9, label: 'find out about things too late', note: 'Finds live in feeds, not on routes.', q: 'Where they hear about it', bars: [['Instagram', 8], ['Friends', 5], ['Map apps', 0]] },
  { n: 10, label: 'would detour 3 min for a sample sale', note: 'A clear detour is an easy yes.', q: 'What they want to know', bars: [["What's there", 7], ['Minutes added', 6], ['Hours', 4]] },
] as const

const APPS = [
  { name: 'Google Maps', tag: 'Baseline', good: 'Fast, trusted directions', gap: 'Says little about the walk' },
  { name: 'Pleasant Routes', tag: 'Closest', good: 'Nicer routes with reasons', gap: 'No pop-ups or daily changes' },
  { name: 'ShadePath', tag: 'Comfort', good: 'Personal comfort score', gap: 'Shade, not what to enjoy' },
  { name: 'Corner', tag: 'Discovery', good: 'Picks from real people', gap: 'Places with no route' },
  { name: '8it', tag: 'Pop-ups', good: 'Clear pop-up schedules', gap: 'Food only, links out' },
]

const GAPS = [
  ['Walking and navigation', 'Routes stop at the fastest path'],
  ['Local discovery and events', 'Local finds stay off the route'],
  ['Memories', 'Walks leave little behind'],
]

const MOMENTS = [
  { t: 'First open', d: 'Three steps, no step counts, no streaks.', img: 'how-it-works', rot: -3, y: 'md:translate-y-0' },
  { t: 'At the stop', d: 'Save a photo and a quick note.', img: 'capture', rot: 2, y: 'md:translate-y-10' },
  { t: 'Last leg', d: 'The route picks back up and gets you home.', img: 'walking-home', rot: -2, y: 'md:translate-y-3' },
  { t: 'Later', d: 'Every walk, sorted by neighborhood.', img: 'collection-walks', rot: 3, y: 'md:translate-y-12' },
]

const TRAITS = [['Leaf', 'parks'], ['Beret', 'galleries'], ['Round glasses', 'vintage'], ['Coffee cup', 'cafés'], ['Headphones', 'live music'], ['Backpack', 'new areas']]

const THEMES = [
  { t: 'Sameness', title: 'Sameness, not time, is the problem', rule: 'Keep the route people already take. Make it feel new.', img: 'check-in', p: 'Daily check-in, route with optional sidequests' },
  { t: 'Accidental finds', title: 'Discovery still happens, by accident', rule: 'Suggest the kinds of places people already stop for.', img: 'experience', p: "Vibe categories, Lolo's pick on Explore" },
  { t: 'Feeds vs. maps', title: 'Finds live in feeds, routes live in maps', rule: "Put what's on today right on the route.", img: 'sidequests', p: '3 sidequests along the way, shown as map pins' },
  { t: 'Cost of a detour', title: 'A detour needs a reason and a cost', rule: 'Show what it is and the minutes it adds, every time.', img: 'route', p: '"Café · +5 min" on every stop' },
  { t: 'Timing', title: 'Timing decides if a nudge helps or annoys', rule: 'Ask first, cap it at a few, and make skipping one tap.', img: 'route-preview', p: 'Time budget, add or skip each stop' },
  { t: 'Nothing left', title: 'Walks leave little behind', rule: 'Keep each walk as a memory, and let Lolo show what it added up to.', img: 'walk-memory', p: 'Walk memories, Lolo grows with each walk' },
]

const STEPS = [
  { t: 'Check in', d: "Pick today's vibe and how much extra time you have.", img: 'check-in' },
  { t: 'Pick sidequests', d: 'Add or skip up to three stops. Each shows what it is and the minutes it adds.', img: 'sidequests' },
  { t: 'Walk', d: 'Turn-by-turn directions, with the next sidequest always in view.', img: 'walking' },
  { t: 'Lolo grows', d: 'Every stop gives Lolo a small trait, like round glasses from a vintage shop.', img: 'sidequest-done' },
  { t: 'Keep the memory', d: 'Your photo, places, and note are saved as a walk you can come back to.', img: 'walk-complete' },
]

const CHANGES = [
  { t: 'Collectibles → Lolo', d: 'During the event: a new character for every sidequest pushed people to chase rewards. We moved to one companion who grows from the walk itself.', before: 'before-sidekicks', after: 'collection-lolo' },
  { t: 'Check-in', d: 'Real photos of New York spots, and a timely tip from Lolo instead of a vague one.', before: 'before-check-in', after: 'check-in' },
  { t: 'Sidequests', d: 'Readable trait chips and a clear added state, so the list is easy to scan.', before: 'before-sidequests', after: 'sidequests' },
  { t: 'Lolo grows', d: 'We removed the level meter so the moment is about the find, not the grind.', before: 'before-lolo-grew', after: 'sidequest-done' },
  { t: 'Memory', d: 'One word across the app: every trip is now a "walk".', before: 'before-memory', after: 'walk-complete' },
]

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A867E]">{children}</p>
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-[22px] md:text-[26px] font-medium tracking-tight text-[#1F1F1F] leading-snug">{children}</h2>
}

function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-[13px] text-[#1F1F1F] underline underline-offset-4 decoration-[#1F1F1F]/30 hover:decoration-[#1F1F1F]">
      {children} ↗
    </a>
  )
}

function Screen({ src, className = '' }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${A}/${src}.webp`} alt="" className={`w-full rounded-[22px] border-[5px] border-[#1F1F1F] bg-[#1F1F1F] ${className}`} />
  )
}

function Dots({ n }: { n: number }) {
  return (
    <div className="mt-3 flex gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={`h-[7px] w-[7px] rounded-full ${i < n ? 'bg-[#F2CE4E]' : 'bg-[#E4E0D6]'}`} />
      ))}
    </div>
  )
}

function Pills({ items, active, onPick }: { items: string[]; active: number; onPick: (i: number) => void }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {items.map((t, i) => (
        <button
          key={t}
          onClick={() => onPick(i)}
          className={`rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
            active === i ? 'bg-[#1F1F1F] text-white' : 'bg-white/70 border border-[#E4E0D6] text-[#4A4740] hover:border-[#1F1F1F]/40'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default function AlongCase() {
  const [theme, setTheme] = useState(0)
  const [step, setStep] = useState(0)
  const [lolo, setLolo] = useState(0)
  const [change, setChange] = useState(0)

  return (
    <div className={`${manrope.className} bg-[#FAF7F0] text-[#1F1F1F]`}>
      <div className="mx-auto max-w-[880px] px-6 pt-32 pb-24">
        {/* Title */}
        <div className="grid md:grid-cols-2 gap-6 items-end">
          <div>
            <h1 className="text-[40px] font-semibold tracking-tight leading-none">Along</h1>
            <p className="mt-3 text-[13px] text-[#8A867E] underline underline-offset-4 decoration-[#8A867E]/40">
              UX research, Competitive analysis, Interaction design
            </p>
          </div>
          <p className="text-[18px] leading-snug">
            A New York walking app that adds small sidequests to the route you already take.
          </p>
        </div>

        {/* Cover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/hero.webp`} alt="Along splash screen with Lolo" className="mt-10 w-full rounded-[24px]" />

        {/* Meta */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[13px]">
          <div>
            <p className="text-[#8A867E]">When</p>
            <p className="mt-1">November 2026</p>
          </div>
          <div>
            <p className="text-[#8A867E]">For</p>
            <p className="mt-1">UXC NYU Design-a-thon, team of 3</p>
          </div>
          <p className="col-span-2 leading-relaxed text-[#4A4740]">
            Map apps get you there fast. Along gives you a reason to slow down: a few sidequests on your
            way, and a companion, Lolo, who grows with every walk. This is the revised version we made
            after the event.
          </p>
        </div>

        {/* Problem */}
        <section className="mt-28">
          <Label>The problem</Label>
          <Title>Map apps get you there fast. None care what happens on the way.</Title>
          <div className="mt-8 grid md:grid-cols-[2fr_3fr] gap-4">
            <div className="rounded-[20px] bg-[#F6DB72] p-6">
              <p className="text-[44px] font-semibold tracking-tight leading-none">37.6%</p>
              <p className="mt-3 text-[13px]">of NYC trips were on foot in 2024</p>
              <p className="mt-4 text-[11px] text-[#1F1F1F]/60">NYC DOT, 2024 Citywide Mobility Survey</p>
            </div>
            <div className="rounded-[20px] bg-[#1F1F1F] p-6 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/50">How might we</p>
              <p className="mt-2 text-[20px] md:text-[22px] leading-snug text-[#F6DB72]">
                help people value the journey of an everyday walk, not just the destination?
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="mt-28">
          <Label>Research · 5 apps, 10 walkers</Label>
          <Title>People don&apos;t mind long walks. They mind the same walk.</Title>
          <div className="mt-8 grid md:grid-cols-2 gap-3 text-[13px]">
            <div className="rounded-[16px] bg-white/60 border border-[#E4E0D6] p-4">
              <p className="text-[#8A867E]">Competitive analysis</p>
              <p className="mt-1">5 apps, same trip from Brooklyn to Lower Manhattan, screen by screen</p>
            </div>
            <div className="rounded-[16px] bg-white/60 border border-[#E4E0D6] p-4">
              <p className="text-[#8A867E]">Survey</p>
              <p className="mt-1">10 walkers, ages 18 to 29: 7 on routine routes, 3 who recently moved</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-[16px] border border-[#E4E0D6] bg-white/60 p-4 flex flex-col">
                <p className="text-[32px] font-medium leading-none">
                  {s.n}
                  <span className="text-[14px] text-[#8A867E]">/10</span>
                </p>
                <Dots n={s.n} />
                <p className="mt-3 text-[12px] text-[#8A867E] leading-snug">{s.label}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-[#8A867E]">{s.q}</p>
                <ul className="mt-2 space-y-1.5">
                  {s.bars.map(([l, v]) => (
                    <li key={l} className="grid grid-cols-[1fr_auto] gap-x-2 text-[11px] text-[#4A4740]">
                      <span>{l}</span>
                      <span>{v}</span>
                      <span className="col-span-2 h-1 rounded-full bg-[#E4E0D6]">
                        <span className="block h-full rounded-full bg-[#F2CE4E]" style={{ width: `${Number(v) * 10}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 text-[13px] leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
          <More href={`${A}/research.webp`}>See the full research board</More>
        </section>

        {/* Competitive analysis */}
        <section className="mt-28">
          <Label>Competitive analysis · 5 apps</Label>
          <Title>Apps get you there or show you where to go. None value the way there.</Title>
          <div className="mt-8 grid md:grid-cols-[1.1fr_1fr] gap-4 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/positioning.webp`} alt="Positioning map of five apps by walking and navigation against local discovery" loading="lazy" className="w-full rounded-[20px] border border-[#E4E0D6]" />
            <div className="rounded-[20px] border border-[#E4E0D6] bg-white/60 divide-y divide-[#E4E0D6]">
              {APPS.map((a) => (
                <div key={a.name} className="px-4 py-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-medium">{a.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#8A867E]">{a.tag}</p>
                  </div>
                  <p className="mt-1 text-[12px] text-[#4A4740]"><span className="text-[#B08A00]">+</span> {a.good}</p>
                  <p className="text-[12px] text-[#4A4740]"><span className="text-[#5B3FE0]">−</span> {a.gap}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 grid md:grid-cols-3 gap-3">
            {GAPS.map(([area, gap]) => (
              <div key={area} className="rounded-[16px] bg-[#ECE8FD] p-4">
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#5B3FE0]">{area}</p>
                <p className="mt-1 text-[14px] font-medium text-[#3A27A8]">{gap}</p>
              </div>
            ))}
          </div>
          <More href={`${A}/competitive.webp`}>See the full competitive analysis</More>
        </section>

        {/* Synthesis */}
        <section className="mt-28">
          <Label>Synthesis</Label>
          <Title>Six themes, six design rules.</Title>
          <Pills items={THEMES.map((t, i) => `0${i + 1} ${t.t}`)} active={theme} onPick={setTheme} />
          <div className="mt-4 rounded-[24px] bg-[#F3ECD9] p-6 md:p-10 grid grid-cols-[1fr_130px] md:grid-cols-[1fr_210px] gap-6 md:gap-10 items-center">
            <div>
              <p className="text-[20px] md:text-[24px] font-medium leading-snug">{THEMES[theme].title}</p>
              <p className="mt-3 text-[14px] text-[#4A4740] leading-relaxed">{THEMES[theme].rule}</p>
              <p className="mt-5 inline-block rounded-full bg-white/70 px-3 py-1 text-[11px] text-[#4A4740]">In the prototype: {THEMES[theme].p}</p>
            </div>
            <Screen src={THEMES[theme].img} />
          </div>
          <p className="mt-3 text-[12px] text-[#8A867E]">Tap a theme to see the screen it turned into.</p>
          <a href={`${A}/affinity.webp`} target="_blank" rel="noopener noreferrer" className="mt-8 block overflow-hidden rounded-[20px] border border-[#E4E0D6] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/affinity.webp`} alt="Affinity map grouping survey answers, app findings and quotes into six themes" loading="lazy" className="w-full" />
          </a>
          <More href={`${A}/affinity.webp`}>Open the affinity map</More>
        </section>

        {/* Flow */}
        <section className="mt-28">
          <Label>Flow</Label>
          <Title>Plan today. Walk. Look back.</Title>
          <a href={`${A}/flow.webp`} target="_blank" rel="noopener noreferrer" className="mt-8 block overflow-hidden rounded-[20px] border border-[#E4E0D6] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/flow.webp`} alt="Flow map from first open through planning, walking and looking back" loading="lazy" className="w-full" />
          </a>
          <More href={`${A}/flow.webp`}>Open the flow map</More>
        </section>

        {/* Design */}
        <section className="mt-28">
          <Label>The design</Label>
          <Title>Keep the route. Add a reason to slow down.</Title>
          <div className="mt-8 rounded-[24px] bg-[#F3ECD9] p-6 md:p-12 grid md:grid-cols-[240px_1fr] gap-8 md:gap-14 items-center">
            <Screen src={STEPS[step].img} className="max-w-[240px] mx-auto" />
            <ol className="space-y-1">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <button
                    onClick={() => setStep(i)}
                    className={`w-full text-left rounded-[12px] px-4 py-3 transition-colors ${step === i ? 'bg-white/80' : 'hover:bg-white/40'}`}
                  >
                    <span className={`text-[14px] ${step === i ? 'text-[#1F1F1F]' : 'text-[#8A867E]'}`}>
                      <span className="mr-3 text-[12px] text-[#8A867E]">{i + 1}</span>
                      {s.t}
                    </span>
                    {step === i && <span className="mt-1 block pl-6 text-[13px] text-[#4A4740] leading-relaxed">{s.d}</span>}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-16">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A867E]">More of the walk</p>
            <div className="relative mt-6 md:pb-12">
              <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[11px] border-t-[3px] border-dotted border-[#5B3FE0]/60" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
                {MOMENTS.map((m, i) => (
                  <figure key={m.img} className="flex flex-col items-center text-center">
                    <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${i === 3 ? 'bg-[#F6DB72] text-[#1F1F1F]' : 'bg-[#5B3FE0] text-white'} ring-4 ring-[#FAF7F0]`}>
                      {i + 1}
                    </span>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-[#5B3FE0]">{m.t}</p>
                    <div className={`mt-6 w-full max-w-[190px] transition-transform duration-500 hover:rotate-0 hover:-translate-y-2 ${m.y}`} style={{ transform: `rotate(${m.rot}deg)` }}>
                      <Screen src={m.img} className="shadow-[0_24px_40px_-24px_rgba(31,31,31,0.55)]" />
                    </div>
                    <figcaption className={`mt-5 text-[13px] text-[#4A4740] ${m.y}`}>{m.d}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lolo */}
        <section className="mt-28">
          <Label>Lolo</Label>
          <Title>A companion who grows with every walk.</Title>
          <div className="mt-8 grid md:grid-cols-[240px_1fr] gap-8 md:gap-14 items-center">
            <Screen src={lolo === 0 ? 'meet-lolo' : 'collection-lolo'} className="max-w-[240px] mx-auto" />
            <div>
              <div className="inline-flex rounded-full border border-[#E4E0D6] bg-white/70 p-1 text-[13px]">
                {['Day one', 'After a few walks'].map((l, i) => (
                  <button
                    key={l}
                    onClick={() => setLolo(i)}
                    className={`rounded-full px-4 py-1.5 transition-colors ${lolo === i ? 'bg-[#1F1F1F] text-white' : 'text-[#4A4740]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-[22px] md:text-[26px] font-medium leading-snug">
                {lolo === 0 ? 'Small for now. Every place leaves a mark.' : 'Parks give a leaf. Vintage gives round glasses.'}
              </p>
              <p className="mt-3 text-[14px] text-[#4A4740] leading-relaxed">
                One companion that grows with you, instead of a pile of badges. No points, no streaks.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {TRAITS.map(([t, f]) => (
                  <div key={t} className="rounded-[12px] border border-[#E4E0D6] bg-white/60 px-3 py-2">
                    <p className="text-[12px] font-medium">{t}</p>
                    <p className="text-[11px] text-[#8A867E]">from {f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-[20px] border border-[#E4E0D6] bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/logo-directions.webp`} alt="Five logo directions for Along" loading="lazy" className="w-full" />
          </div>
          <p className="mt-3 text-[12px] text-[#8A867E]">We went with B, Lolo the guide, so the logo is the companion.</p>
        </section>

        {/* What changed */}
        <section className="mt-28">
          <Label>Iterations</Label>
          <Title>What we changed.</Title>
          <Pills items={CHANGES.map((c) => c.t)} active={change} onPick={setChange} />
          <div className="mt-4 rounded-[24px] bg-[#F3ECD9] p-6 md:p-10">
            <div className="grid grid-cols-2 gap-5 md:gap-10 max-w-[520px] mx-auto">
              <div>
                <p className="mb-2 text-[12px] text-[#8A867E]">Before</p>
                <Screen src={CHANGES[change].before} className="opacity-80" />
              </div>
              <div>
                <p className="mb-2 text-[12px] text-[#1F1F1F]">After</p>
                <Screen src={CHANGES[change].after} />
              </div>
            </div>
            <p className="mt-6 text-center text-[14px] text-[#4A4740]">{CHANGES[change].d}</p>
          </div>
        </section>

        {/* Video */}
        <section className="mt-28">
          <Label>Prototype</Label>
          <Title>Take the walk.</Title>
          <div className="mt-8 relative w-full overflow-hidden rounded-[24px] bg-black aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1244525246?title=0&byline=0&portrait=0&dnt=1"
              title="Along prototype walkthrough"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>

        {/* Next */}
        <section className="mt-28">
          <Label>Next</Label>
          <Title>Test it on real walks.</Title>
          <p className="mt-4 max-w-[560px] text-[14px] text-[#4A4740] leading-relaxed">
            10 answers are an early signal, not proof.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-[13px]">
            {[
              ['Measure', 'How often people accept a sidequest, and whether they check in again tomorrow'],
              ['Feedback', 'Sound and small animations when you reach a stop'],
              ['Lolo', "More ways for Lolo to reflect each person's walks"],
              ['Access', 'Local discovery for more kinds of city walkers'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[16px] border border-[#E4E0D6] bg-white/60 p-4">
                <p className="text-[#8A867E]">{k}</p>
                <p className="mt-1">{v}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
