'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

const ASSET = '/gentle-monster-case'

const META = [
  { label: 'Project type', value: 'Personal Project' },
  { label: 'Tools', value: 'Figma, Photoshop, Illustrator' },
  { label: 'Year', value: '2024' },
  { label: 'Role', value: 'Visual Design' },
]

const GOALS = [
  {
    title: 'Two worlds, one page',
    body: 'Give each collection its own background and pacing, tied together by one grid and one type system.',
  },
  {
    title: 'Product first',
    body: 'Pair every campaign shot with a clean product cut, model name, and price so the eyewear stays the hero.',
  },
  {
    title: 'Editorial rhythm',
    body: 'Mix large campaign imagery with small detail shots so a long scroll never feels repetitive.',
  },
]

const COLORS = [
  { name: 'Deep', hex: '#232323' },
  { name: 'Charcoal', hex: '#313131' },
  { name: 'Sand', hex: '#C4BAA9' },
  { name: 'Fog', hex: '#F3F4F6' },
]

type Callout = { x: number; y: number; label: string }

const SECTIONS: {
  n: string
  title: string
  note: string
  details: string[]
  src: string
  bg: string
  dark: boolean
  flip: boolean
  callouts: Callout[]
}[] = [
  {
    n: '01',
    title: 'Campaign intro',
    note: 'The page opens on the full wordmark and a single striking campaign image, then slows down with a framed portrait and a quiet serif headline.',
    details: ['Wordmark hero', 'Framed portrait', 'Serif headline'],
    src: `${ASSET}/section-1.webp`,
    bg: '#232323',
    dark: true,
    flip: false,
    callouts: [
      { x: 68, y: 30, label: 'Campaign hero' },
      { x: 18, y: 50, label: 'Framed portrait' },
      { x: 76, y: 64.5, label: 'Serif headline + copy' },
    ],
  },
  {
    n: '02',
    title: 'Void KC6 world',
    note: 'A dark, sculptural chapter. Each model gets a campaign shot, a clean product cut, and a short description, laid out on an asymmetric grid.',
    details: ['Charcoal palette', 'Asymmetric grid', 'Product + model pairs'],
    src: `${ASSET}/section-2.webp`,
    bg: '#313131',
    dark: true,
    flip: true,
    callouts: [
      { x: 72, y: 3.5, label: 'Model name + price' },
      { x: 50, y: 21, label: 'Campaign shot' },
      { x: 19, y: 38, label: 'Circular crop' },
    ],
  },
  {
    n: '03',
    title: 'Gentle Jelly world',
    note: 'The page flips to a light, glossy mood for the playful jelly line, keeping the same type system so the brand still reads as one.',
    details: ['Light palette', 'Product spotlight', 'Detail grid'],
    src: `${ASSET}/section-3.webp`,
    bg: '#F3F4F6',
    dark: false,
    flip: false,
    callouts: [
      { x: 16, y: 12, label: 'Campaign collage' },
      { x: 27, y: 44, label: 'Product spotlight' },
      { x: 22, y: 84, label: 'Detail shots' },
    ],
  },
  {
    n: '04',
    title: 'Lineup and close',
    note: 'A bold oval portrait leads into the full jelly lineup with prices, and the page ends on a single call to action.',
    details: ['Oval portrait', 'Product lineup', 'Closing CTA'],
    src: `${ASSET}/section-4.webp`,
    bg: '#232323',
    dark: true,
    flip: true,
    callouts: [
      { x: 49, y: 21, label: 'Oval portrait' },
      { x: 50, y: 48.5, label: 'Product lineup' },
      { x: 50, y: 95, label: 'Closing CTA' },
    ],
  },
]

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 print:opacity-100 print:translate-y-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Label({ children, dark }: { children: ReactNode; dark: boolean }) {
  return (
    <p
      className={`font-data text-[10px] uppercase tracking-[0.3em] ${
        dark ? 'text-white/45' : 'text-ink/45'
      }`}
    >
      {children}
    </p>
  )
}

function BrowserFrame({
  src,
  alt,
  dark,
  callouts = [],
}: {
  src: string
  alt: string
  dark: boolean
  callouts?: Callout[]
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border ${
        dark ? 'border-white/10 bg-[#1a1a1a]' : 'border-black/10 bg-white'
      } shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]`}
    >
      <div
        className={`flex items-center gap-1.5 px-4 py-3 border-b ${
          dark ? 'border-white/10' : 'border-black/5'
        }`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-black/15'}`}
          />
        ))}
        <span
          className={`ml-3 font-data text-[9px] tracking-widest ${
            dark ? 'text-white/30' : 'text-black/30'
          }`}
        >
          gentlemonster.com/2024-collection
        </span>
      </div>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full" loading="lazy" />
        {callouts.map((c) => (
          <span
            key={c.label}
            className="absolute hidden md:flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 font-data text-[9px] uppercase tracking-widest text-[#232323] shadow-sm backdrop-blur-sm"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#232323]" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-t-[18px] border border-white/15 bg-[#0e0e0e] p-[1.6%] pb-[2.2%]">
        <div className="relative overflow-hidden rounded-[6px] aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#3a3a3a] to-[#1c1c1c]">
        <div className="absolute left-1/2 top-0 h-[5px] w-[14%] -translate-x-1/2 rounded-b-md bg-[#111]" />
      </div>
    </div>
  )
}

function MetaRow({ dark = false }: { dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-left">
      {META.map((m) => (
        <div key={m.label}>
          <dt
            className={`font-data text-[9px] uppercase tracking-[0.25em] mb-1.5 ${
              dark ? 'text-white/40' : 'text-ink/40'
            }`}
          >
            {m.label}
          </dt>
          <dd className={`font-sans text-sm ${dark ? 'text-white/85' : 'text-ink/85'}`}>
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function GentleMonsterCase({
  number,
  tag,
  title,
  description,
}: {
  number: string
  tag: string
  title: string
  description: string
}) {
  return (
    <div>
      {/* Header */}
      <header className="pt-32 pb-14 px-8 md:px-16 max-w-4xl mx-auto text-center">
        <p className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6">
          {number} · {tag}
        </p>
        <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink leading-[1.05] mb-6">
          {title}
        </h1>
        <p className="font-sans text-ink/70 text-sm md:text-base leading-[1.7] max-w-xl mx-auto mb-12">
          {description}
        </p>
        <div className="border-t border-ink/15 pt-8 max-w-3xl mx-auto">
          <MetaRow />
        </div>
      </header>

      {/* Cover mockup */}
      <section className="bg-[#232323] px-6 md:px-16 pt-20 pb-24">
        <Reveal>
          <Laptop src={`${ASSET}/screen-cover.webp`} alt="Gentle Monster campaign page shown on a laptop" />
        </Reveal>
      </section>

      {/* Overview + goals */}
      <section className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
        <Reveal className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <Label dark={false}>Overview</Label>
            <h2 className="mt-4 font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-ink leading-tight">
              One brand,
              <br />
              two moods
            </h2>
          </div>
          <p className="md:col-span-8 font-sans text-ink/75 text-base md:text-lg leading-[1.8]">
            A self-initiated campaign page for Gentle Monster&apos;s 2024 collection. The challenge was
            to hold two very different lines on one page: the dark, sculptural Void KC6 and the glossy,
            playful Gentle Jelly, while still feeling unmistakably like Gentle Monster.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {GOALS.map((g, i) => (
            <Reveal key={g.title}>
              <div className="h-full rounded-2xl border border-ink/15 bg-white/40 p-6">
                <p className="font-data text-[10px] tracking-[0.25em] text-ink/40 mb-6">
                  GOAL 0{i + 1}
                </p>
                <h3 className="font-sans font-semibold text-ink text-base mb-2">{g.title}</h3>
                <p className="font-sans text-ink/65 text-sm leading-[1.7]">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Style guide */}
      <section className="bg-[#313131] px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Label dark>Style guide</Label>
            <h2 className="mt-4 mb-12 font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-white/90">
              Typography and color
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-12 gap-6">
            <Reveal className="lg:col-span-7">
              <div className="h-full rounded-2xl border border-white/10 bg-[#232323] p-6 md:p-8 space-y-8">
                {[
                  { role: 'Display', font: 'Perfect Strangers', src: 'type-display.webp', w: 'w-full' },
                  { role: 'Product names', font: 'Butler', src: 'type-serif.webp', w: 'w-[55%]' },
                  { role: 'Body and labels', font: 'General Sans', src: 'type-sans.webp', w: 'w-[42%]' },
                ].map((t) => (
                  <div key={t.role} className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between font-data text-[9px] uppercase tracking-[0.25em]">
                      <span className="text-white/40">{t.role}</span>
                      <span className="text-white/70">{t.font}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${ASSET}/${t.src}`} alt={`${t.font} sample`} className={`${t.w} rounded-md`} />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-white/10 bg-[#232323] p-6 md:p-8">
                <p className="font-data text-[9px] uppercase tracking-[0.25em] text-white/40 mb-6">
                  Colors
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {COLORS.map((c) => (
                    <div key={c.hex}>
                      <div
                        className="aspect-[4/3] rounded-lg border border-white/10"
                        style={{ background: c.hex }}
                      />
                      <p className="mt-2 font-sans text-xs text-white/80">{c.name}</p>
                      <p className="font-data text-[9px] tracking-widest text-white/40">{c.hex}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Design sections */}
      {SECTIONS.map((s) => (
        <section key={s.n} className="px-6 md:px-16 py-24" style={{ background: s.bg }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className={`lg:col-span-4 lg:sticky lg:top-28 ${s.flip ? 'lg:order-2' : ''}`}>
              <Reveal>
                <p
                  className={`font-display font-bold text-5xl md:text-6xl leading-none ${
                    s.dark ? 'text-white/15' : 'text-black/10'
                  }`}
                >
                  {s.n}
                </p>
                <h2
                  className={`mt-4 font-display font-bold text-lg md:text-xl uppercase tracking-tight ${
                    s.dark ? 'text-white/90' : 'text-ink'
                  }`}
                >
                  {s.title}
                </h2>
                <p
                  className={`mt-4 font-sans text-sm md:text-[15px] leading-[1.8] ${
                    s.dark ? 'text-white/60' : 'text-ink/65'
                  }`}
                >
                  {s.note}
                </p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {s.details.map((d) => (
                    <li
                      key={d}
                      className={`font-data text-[9px] uppercase tracking-widest rounded-full border px-2.5 py-1 ${
                        s.dark ? 'border-white/20 text-white/60' : 'border-ink/20 text-ink/60'
                      }`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className={`lg:col-span-8 ${s.flip ? 'lg:order-1' : ''}`}>
              <Reveal>
                <BrowserFrame
                  src={s.src}
                  alt={`Gentle Monster campaign page, part ${s.n}: ${s.title}`}
                  dark={s.dark}
                  callouts={s.callouts}
                />
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="px-8 md:px-16 py-28 text-center">
        <Reveal>
          <p className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6">
            Gentle Monster · 2024 New Collection
          </p>
          <p className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tight text-ink">
            Thank you for watching
          </p>
          <div className="mt-14 max-w-3xl mx-auto border-t border-ink/15 pt-8">
            <MetaRow />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
