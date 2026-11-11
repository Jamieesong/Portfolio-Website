'use client'

import { useState, type ReactNode } from 'react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' })

const A = '/along'
const VIDEO = 'https://player.vimeo.com/video/1244525246?title=0&byline=0&portrait=0&dnt=1'
const PROTOTYPE =
  'https://embed.figma.com/proto/U39kLROUy3Gey688XNkYWa/Designathon---Prototype--Copy-?node-id=241-3909&starting-point-node-id=241%3A3909&page-id=241%3A68&scaling=scale-down&content-scaling=fixed&embed-host=share'
const PROTOTYPE_LINK =
  'https://www.figma.com/proto/U39kLROUy3Gey688XNkYWa/Designathon---Prototype--Copy-?node-id=241-3909&starting-point-node-id=241%3A3909&page-id=241%3A68&scaling=scale-down'

const STATS = [
  { n: 0, label: 'say the walk takes too long', note: 'Sameness is the problem, not time.', q: 'What felt boring', bars: [['Same way', 5], ['Crowds', 4], ['Noise', 2]] },
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

const THEMES = [
  { t: 'Sameness', title: 'Sameness is the problem, not time', rule: 'Keep the route people already take. Make it feel new.', img: 'check-in', p: 'Daily check-in, route with optional sidequests' },
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

const MOMENTS = [
  { t: 'First open', d: 'Three steps. No step counts, no streaks.', img: 'how-it-works', rot: -2.5 },
  { t: 'At the stop', d: 'Save a photo and a quick note.', img: 'capture', rot: 2 },
  { t: 'Last leg', d: 'The route picks back up and gets you home.', img: 'walking-home', rot: -2 },
  { t: 'Later', d: 'Every walk, sorted by neighborhood.', img: 'collection-walks', rot: 2.5 },
]

const TRAITS = [['Leaf', 'parks'], ['Beret', 'galleries'], ['Round glasses', 'vintage'], ['Coffee cup', 'cafés'], ['Headphones', 'live music'], ['Backpack', 'new areas']]

const PALETTE = [
  { name: 'Butter', hex: '#F8DC70', use: 'Brand, selection', dark: false },
  { name: 'Black', hex: '#171717', use: 'Text, main actions', dark: true },
  { name: 'Cream', hex: '#FFFCF3', use: 'App background', dark: false },
  { name: 'Gray', hex: '#EAE7DE', use: 'Cards, dividers', dark: false },
]

const PAIRS = [
  { pair: 'Black on Butter', ratio: '13.2:1', bg: '#F8DC70', fg: '#171717' },
  { pair: 'Black on Cream', ratio: '17.5:1', bg: '#FFFCF3', fg: '#171717' },
  { pair: 'Black on Gray', ratio: '14.5:1', bg: '#EAE7DE', fg: '#171717' },
  { pair: 'Cream on Black', ratio: '17.5:1', bg: '#171717', fg: '#FFFCF3' },
]

const PRINCIPLES = [
  ['Warm, not loud', 'Cream does the work. Butter marks an invitation or a small moment of delight.'],
  ['Useful at a glance', 'Lead with the place, then the next step. Plain words over decoration.'],
  ['Room for a detour', 'Give stories space, and keep navigation predictable.'],
]

const CHANGES = [
  { t: 'Collectibles → Lolo', d: 'During the event: a new character for every sidequest pushed people to chase rewards. We moved to one companion who grows from the walk itself.', before: 'before-sidekicks', after: 'collection-lolo' },
  { t: 'Check-in', d: 'Real photos of New York spots, and a timely tip from Lolo instead of a vague one.', before: 'before-check-in', after: 'check-in' },
  { t: 'Sidequests', d: 'Readable trait chips and a clear added state, so the list is easy to scan.', before: 'before-sidequests', after: 'sidequests' },
  { t: 'Lolo grows', d: 'We removed the level meter so the moment is about the find, not the grind.', before: 'before-lolo-grew', after: 'sidequest-done' },
  { t: 'Memory', d: 'One word across the app: every trip is now a "walk".', before: 'before-memory', after: 'walk-complete' },
]

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#645F55]">{children}</p>
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-[24px] md:text-[32px] font-medium tracking-[-0.02em] text-[#1C1A16] leading-[1.2]">{children}</h2>
}

function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-[14px] text-[#1C1A16] underline underline-offset-4 decoration-[#1C1A16]/30 hover:decoration-[#1C1A16]">
      {children} ↗
    </a>
  )
}

function Screen({ src, className = '' }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${A}/${src}.webp`} alt="" loading="lazy" className={`w-full rounded-[26px] border-[6px] border-[#1C1A16] bg-[#1C1A16] ${className}`} />
  )
}

function Dots({ n }: { n: number }) {
  return (
    <div className="mt-3 flex gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < n ? 'bg-[#F2CE4E]' : 'bg-[#E4E0D6]'}`} />
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
          className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
            active === i ? 'bg-[#1C1A16] text-white' : 'bg-white/70 border border-[#E4E0D6] text-[#4A4740] hover:border-[#1C1A16]/40'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

function Section({ children }: { children: ReactNode }) {
  return <section className="mt-28 md:mt-36">{children}</section>
}

export default function AlongCase() {
  const [theme, setTheme] = useState(0)
  const [step, setStep] = useState(0)
  const [lolo, setLolo] = useState(0)
  const [change, setChange] = useState(0)

  return (
    <div className={`${manrope.className} bg-[#FAF7F0] text-[#1C1A16]`}>
      <div className="mx-auto max-w-[1128px] px-6 pt-32 pb-28">
        {/* Title */}
        <div className="grid md:grid-cols-2 gap-6 items-end">
          <div>
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] leading-none">Along</h1>
            <p className="mt-4 text-[14px] text-[#645F55] underline underline-offset-4 decoration-[#645F55]/40">
              UX research, Competitive analysis, Interaction design
            </p>
          </div>
          <p className="text-[20px] md:text-[24px] leading-snug text-[#1C1A16]/85">
            A New York walking app that adds small sidequests to the route you already take.
          </p>
        </div>

        {/* Cover: walkthrough */}
        <div className="mt-12 rounded-[28px] bg-[#F6DB72] p-3 md:p-5">
          <div className="relative w-full overflow-hidden rounded-[20px] bg-black aspect-video">
            <iframe
              src={VIDEO}
              title="Along walkthrough"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        {/* Meta */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-12 gap-6 text-[14px]">
          <div className="md:col-span-2">
            <p className="text-[#645F55]">When</p>
            <p className="mt-1">November 2026</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[#645F55]">For</p>
            <p className="mt-1">UXC NYU Fall Design-a-thon</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[#645F55]">My role</p>
            <p className="mt-1">UX research, including the competitive analysis. Team of 3 with Violet Hyun and Jiyoon Lee</p>
          </div>
          <p className="col-span-2 md:col-span-4 leading-relaxed text-[#4A4740]">
            Map apps get you there fast. Along gives you a reason to slow down: a few sidequests on the
            way, and a companion, Lolo, who grows with every walk. This page shows the version we
            refined after the event.
          </p>
        </div>

        {/* Problem */}
        <Section>
          <Label>The problem</Label>
          <Title>Map apps get you there fast. None care what happens on the way.</Title>
          <div className="mt-10 grid md:grid-cols-[2fr_3fr] gap-4">
            <div className="rounded-[24px] bg-[#F6DB72] p-8">
              <p className="text-[56px] font-semibold tracking-[-0.03em] leading-none">37.6%</p>
              <p className="mt-4 text-[15px]">of NYC trips were on foot in 2024</p>
              <p className="mt-5 text-[12px] text-[#1C1A16]/60">NYC DOT, 2024 Citywide Mobility Survey</p>
            </div>
            <div className="rounded-[24px] bg-[#1C1A16] p-8 flex flex-col justify-center">
              <p className="text-[12px] uppercase tracking-[0.08em] text-white/50">How might we</p>
              <p className="mt-3 text-[22px] md:text-[28px] leading-snug text-[#F6DB72]">
                help people value the journey of an everyday walk, not just the destination?
              </p>
            </div>
          </div>
        </Section>

        {/* Research */}
        <Section>
          <Label>Research · 5 apps, 10 walkers</Label>
          <Title>People don&apos;t mind long walks. They mind the same walk.</Title>
          <div className="mt-10 grid md:grid-cols-2 gap-4 text-[14px]">
            <div className="rounded-[20px] bg-white/60 border border-[#E4E0D6] p-5">
              <p className="text-[#645F55]">Competitive analysis</p>
              <p className="mt-1">5 apps, the same trip from Brooklyn to Lower Manhattan, screen by screen</p>
            </div>
            <div className="rounded-[20px] bg-white/60 border border-[#E4E0D6] p-5">
              <p className="text-[#645F55]">Survey</p>
              <p className="mt-1">10 walkers, ages 18 to 29: 7 on routine routes, 3 who recently moved</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-[20px] border border-[#E4E0D6] bg-white/60 p-5 flex flex-col">
                <p className="text-[40px] font-medium leading-none tracking-[-0.02em]">
                  {s.n}
                  <span className="text-[16px] text-[#8A867E]">/10</span>
                </p>
                <Dots n={s.n} />
                <p className="mt-3 text-[13px] text-[#645F55] leading-snug">{s.label}</p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.08em] text-[#8A867E]">{s.q}</p>
                <ul className="mt-2 space-y-2">
                  {s.bars.map(([l, v]) => (
                    <li key={l} className="grid grid-cols-[1fr_auto] gap-x-2 text-[12px] text-[#4A4740]">
                      <span>{l}</span>
                      <span>{v}</span>
                      <span className="col-span-2 h-1.5 rounded-full bg-[#E4E0D6]">
                        <span className="block h-full rounded-full bg-[#F2CE4E]" style={{ width: `${Number(v) * 10}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-[14px] font-medium leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-[#8A867E]">10 answers are an early signal, not proof. We used them to choose a direction.</p>
          <More href={`${A}/research.webp`}>See the full research board</More>
        </Section>

        {/* Competitive analysis */}
        <Section>
          <div className="flex items-center gap-3">
            <Label>Competitive analysis · 5 apps</Label>
            <span className="rounded-full bg-[#1C1A16] px-2.5 py-0.5 text-[11px] text-white">My part</span>
          </div>
          <Title>Apps get you there or show you where to go. None value the way there.</Title>
          <div className="mt-10 grid md:grid-cols-[1.15fr_1fr] gap-4 items-stretch">
            <div className="rounded-[24px] border border-[#E4E0D6] bg-[#FFFCF2] overflow-hidden flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/positioning.webp`} alt="Positioning map of five apps by walking and navigation against local discovery" loading="lazy" className="w-full h-full object-contain" />
            </div>
            <div className="rounded-[24px] border border-[#E4E0D6] bg-white/60 divide-y divide-[#E4E0D6]">
              {APPS.map((a) => (
                <div key={a.name} className="px-5 py-4">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[15px] font-medium">{a.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#8A867E]">{a.tag}</p>
                  </div>
                  <p className="mt-1.5 text-[13px] text-[#4A4740]"><span className="text-[#B08A00]">+</span> {a.good}</p>
                  <p className="text-[13px] text-[#4A4740]"><span className="text-[#5B3FE0]">−</span> {a.gap}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[12px] text-[#8A867E]">Sidekick was Along&apos;s working name. Dots show how well each app helps you keep a memory of the walk.</p>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {GAPS.map(([area, gap]) => (
              <div key={area} className="rounded-[20px] bg-[#ECE8FD] p-5">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#5B3FE0]">Gap · {area}</p>
                <p className="mt-1.5 text-[16px] font-medium text-[#3A27A8]">{gap}</p>
              </div>
            ))}
          </div>
          <More href={`${A}/competitive.webp`}>See the full competitive analysis</More>
        </Section>

        {/* Synthesis */}
        <Section>
          <Label>Synthesis</Label>
          <Title>Six themes, six design rules.</Title>
          <Pills items={THEMES.map((t, i) => `0${i + 1} ${t.t}`)} active={theme} onPick={setTheme} />
          <div className="mt-4 rounded-[28px] bg-[#F3ECD9] p-8 md:p-14 grid grid-cols-1 sm:grid-cols-[1fr_220px] md:grid-cols-[1fr_280px] gap-8 md:gap-16 items-center">
            <div>
              <p className="text-[24px] md:text-[32px] font-medium leading-tight tracking-[-0.02em]">{THEMES[theme].title}</p>
              <p className="mt-4 text-[16px] text-[#4A4740] leading-relaxed">{THEMES[theme].rule}</p>
              <p className="mt-6 inline-block rounded-full bg-white/70 px-4 py-1.5 text-[12px] text-[#4A4740]">In the prototype: {THEMES[theme].p}</p>
            </div>
            <Screen src={THEMES[theme].img} className="max-w-[280px] mx-auto" />
          </div>
          <p className="mt-3 text-[13px] text-[#8A867E]">Tap a theme to see the screen it turned into.</p>
          <a href={`${A}/affinity.webp`} target="_blank" rel="noopener noreferrer" className="mt-10 block overflow-hidden rounded-[24px] border border-[#E4E0D6] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/affinity.webp`} alt="Affinity map grouping survey answers, app findings and quotes into six themes" loading="lazy" className="w-full" />
          </a>
          <More href={`${A}/affinity.webp`}>Open the affinity map</More>
        </Section>

        {/* Flow */}
        <Section>
          <Label>Flow</Label>
          <Title>Plan today. Walk. Look back.</Title>
          <a href={`${A}/flow.webp`} target="_blank" rel="noopener noreferrer" className="mt-10 block overflow-hidden rounded-[24px] border border-[#E4E0D6] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/flow.webp`} alt="Flow map from first open through planning, walking and looking back" loading="lazy" className="w-full" />
          </a>
          <More href={`${A}/flow.webp`}>Open the flow map</More>
        </Section>

        {/* Design */}
        <Section>
          <Label>The design</Label>
          <Title>Keep the route. Add a reason to slow down.</Title>
          <div className="mt-10 rounded-[28px] bg-[#F3ECD9] p-8 md:p-16 grid md:grid-cols-[300px_1fr] gap-10 md:gap-20 items-center">
            <Screen src={STEPS[step].img} className="max-w-[300px] mx-auto" />
            <ol className="space-y-1.5">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <button
                    onClick={() => setStep(i)}
                    className={`w-full text-left rounded-[14px] px-5 py-4 transition-colors ${step === i ? 'bg-white/85' : 'hover:bg-white/40'}`}
                  >
                    <span className={`text-[17px] ${step === i ? 'text-[#1C1A16]' : 'text-[#8A867E]'}`}>
                      <span className="mr-4 text-[13px] text-[#8A867E]">{i + 1}</span>
                      {s.t}
                    </span>
                    {step === i && <span className="mt-1.5 block pl-7 text-[14px] text-[#4A4740] leading-relaxed">{s.d}</span>}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#645F55]">More of the walk</p>
            <div className="relative mt-8">
              <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[13px] border-t-[3px] border-dotted border-[#5B3FE0]/60" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14 md:gap-x-12">
                {MOMENTS.map((m, i) => (
                  <figure key={m.img} className="flex flex-col items-center text-center">
                    <span className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-medium ring-4 ring-[#FAF7F0] ${i === 3 ? 'bg-[#F6DB72] text-[#1C1A16]' : 'bg-[#5B3FE0] text-white'}`}>
                      {i + 1}
                    </span>
                    <p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-[#5B3FE0]">{m.t}</p>
                    <div className="mt-6 w-full max-w-[230px] transition-transform duration-500 hover:!rotate-0 hover:-translate-y-2" style={{ transform: `rotate(${m.rot}deg)` }}>
                      <Screen src={m.img} className="shadow-[0_28px_44px_-26px_rgba(28,26,22,0.55)]" />
                    </div>
                    <figcaption className="mt-7 text-[14px] text-[#4A4740] max-w-[220px]">{m.d}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Lolo */}
        <Section>
          <Label>Lolo</Label>
          <Title>A companion who grows with every walk.</Title>
          <div className="mt-10 grid md:grid-cols-[300px_1fr] gap-10 md:gap-20 items-center">
            <Screen src={lolo === 0 ? 'meet-lolo' : 'collection-lolo'} className="max-w-[300px] mx-auto" />
            <div>
              <div className="inline-flex rounded-full border border-[#E4E0D6] bg-white/70 p-1 text-[14px]">
                {['Day one', 'After a few walks'].map((l, i) => (
                  <button
                    key={l}
                    onClick={() => setLolo(i)}
                    className={`rounded-full px-5 py-2 transition-colors ${lolo === i ? 'bg-[#1C1A16] text-white' : 'text-[#4A4740]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="mt-8 text-[26px] md:text-[34px] font-semibold leading-tight tracking-[-0.02em]">
                {lolo === 0 ? 'Small for now. Every place leaves a mark.' : 'Parks give a leaf. Vintage gives round glasses.'}
              </p>
              <p className="mt-4 text-[16px] text-[#4A4740] leading-relaxed">
                One companion that grows with you, instead of a pile of badges. No points, no streaks.
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TRAITS.map(([t, f]) => (
                  <div key={t} className="rounded-[14px] border border-[#E4E0D6] bg-white/60 px-4 py-3">
                    <p className="text-[14px] font-medium">{t}</p>
                    <p className="text-[12px] text-[#8A867E]">from {f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Design system */}
        <Section>
          <Label>Design system</Label>
          <Title>A little out of the ordinary.</Title>
          <p className="mt-4 max-w-[640px] text-[16px] text-[#4A4740] leading-relaxed">
            A warm, simple system: four colors, one typeface, and black for the one clear next step on
            every screen.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {PALETTE.map((c) => (
              <div key={c.hex}>
                <div className="h-28 md:h-36 rounded-[20px] border border-[#E4E0D6] p-4 flex items-end" style={{ background: c.hex }}>
                  <span className={`text-[18px] font-semibold ${c.dark ? 'text-[#F8DC70]' : 'text-[#1C1A16]'}`}>{c.name}</span>
                </div>
                <p className="mt-2 text-[13px]">{c.hex}</p>
                <p className="text-[12px] text-[#8A867E]">{c.use}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid md:grid-cols-[2fr_1fr] gap-4 items-stretch">
            <div className="rounded-[20px] border border-[#E4E0D6] bg-[#FFFCF3] p-6">
              <p className="text-[12px] uppercase tracking-[0.08em] text-[#8A867E]">Type scale · Inter, with IBM Plex Mono for small labels</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/ds-type.webp`} alt="Type scale from Display 56px to Caption 12px, set in Inter" loading="lazy" className="mt-4 w-full" />
            </div>
            <div className="rounded-[20px] border border-[#E4E0D6] bg-white/60 p-6">
              <p className="text-[12px] uppercase tracking-[0.08em] text-[#8A867E]">Accessible pairings · WCAG AAA</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PAIRS.map((p) => (
                  <div key={p.pair} className="rounded-[14px] p-4 border border-[#E4E0D6]" style={{ background: p.bg, color: p.fg }}>
                    <p className="text-[28px] font-semibold leading-none">Aa</p>
                    <p className="mt-3 text-[12px]">{p.pair}</p>
                    <p className="text-[12px] opacity-70">{p.ratio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[20px] border border-[#E4E0D6] bg-[#FFFCF3] p-4 md:p-6 overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/ds-buttons.webp`} alt="Button hierarchy and states: primary, brand accent, secondary, ghost" loading="lazy" className="w-full min-w-[640px]" />
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {PRINCIPLES.map(([t, d]) => (
              <div key={t} className="border-t-2 border-[#1C1A16] pt-4">
                <p className="text-[17px] font-medium">{t}</p>
                <p className="mt-2 text-[14px] text-[#4A4740] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-[1fr_2fr] gap-6 items-center rounded-[20px] border border-[#E4E0D6] bg-[#FFFCF3] p-6">
            <div>
              <p className="text-[12px] uppercase tracking-[0.08em] text-[#8A867E]">Logo</p>
              <p className="mt-2 text-[14px] text-[#4A4740] leading-relaxed">
                Out of five directions, we picked Lolo walking a dotted route, so the logo is the companion.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/logo-b.webp`} alt="Along logo: Lolo on a dotted route, app icon and lockups" loading="lazy" className="w-full" />
          </div>
          <More href={`${A}/logo-directions.webp`}>See all five logo directions</More>
        </Section>

        {/* Iterations */}
        <Section>
          <Label>Iterations</Label>
          <Title>What we changed, and why.</Title>
          <Pills items={CHANGES.map((c) => c.t)} active={change} onPick={setChange} />
          <div className="mt-4 rounded-[28px] bg-[#F3ECD9] p-8 md:p-14">
            <div className="grid grid-cols-2 gap-6 md:gap-16 max-w-[640px] mx-auto">
              <div>
                <p className="mb-3 text-[13px] text-[#8A867E]">Before</p>
                <Screen src={CHANGES[change].before} className="opacity-80" />
              </div>
              <div>
                <p className="mb-3 text-[13px] text-[#1C1A16]">After</p>
                <Screen src={CHANGES[change].after} />
              </div>
            </div>
            <p className="mt-8 mx-auto max-w-[560px] text-center text-[16px] text-[#4A4740] leading-relaxed">{CHANGES[change].d}</p>
          </div>
        </Section>

        {/* Prototype */}
        <Section>
          <Label>Prototype</Label>
          <Title>Try the walk.</Title>
          <div className="mt-10 rounded-[28px] bg-black overflow-hidden">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
              <iframe
                src={PROTOTYPE}
                title="Along clickable prototype"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6">
            <More href={PROTOTYPE_LINK}>Open in Figma</More>
            <More href="https://devpost.com/software/along-mgu15a">Read the Devpost submission</More>
          </div>
        </Section>

        {/* Next */}
        <Section>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Label>What I learned</Label>
              <Title>Reward design shapes the whole experience.</Title>
              <p className="mt-4 text-[16px] text-[#4A4740] leading-relaxed">
                Our first idea gave out a collectible for every stop. User testing suggested people would
                chase rewards instead of enjoying the walk. One companion that grows from the walk kept
                the focus where our research pointed: on the way there.
              </p>
            </div>
            <div>
              <Label>Next</Label>
              <Title>Test it on real walks.</Title>
              <ul className="mt-5 space-y-3 text-[15px] text-[#4A4740]">
                {[
                  'How often people accept a sidequest',
                  'Whether they check in again the next day',
                  'Sound and small animations when you reach a stop',
                  'More ways for Lolo to reflect each person',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B3FE0]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
