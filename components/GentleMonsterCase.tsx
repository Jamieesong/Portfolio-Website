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
    title: 'Separate the two lines',
    body: 'Each line gets its own background and layout, but both share the same grid and fonts.',
  },
  {
    title: 'Show the product clearly',
    body: 'Every model photo sits next to a product shot, the model name, and the price.',
  },
  {
    title: 'Keep the scroll interesting',
    body: 'Big campaign photos and small product shots take turns so the long page never feels repetitive.',
  },
]

const COLORS = [
  { name: 'Deep', hex: '#232323' },
  { name: 'Charcoal', hex: '#313131' },
  { name: 'Sand', hex: '#C4BAA9' },
  { name: 'Fog', hex: '#F3F4F6' },
]

const SECTIONS: {
  n: string
  title: string
  note: string
  src: string
  bg: string
  dark: boolean
  flip: boolean
}[] = [
  {
    n: '01',
    title: 'Campaign intro',
    note: 'The page opens with the logo and one big campaign photo. A round portrait and a short headline then introduce the new collection.',
    src: `${ASSET}/section-1.webp`,
    bg: '#232323',
    dark: true,
    flip: false,
  },
  {
    n: '02',
    title: 'Void KC6 world',
    note: 'A dark section for Void KC6. Each model has a campaign photo, a product shot, a short description, and the price.',
    src: `${ASSET}/section-2.webp`,
    bg: '#313131',
    dark: true,
    flip: true,
  },
  {
    n: '03',
    title: 'Gentle Jelly world',
    note: 'The background turns light for the Gentle Jelly line. The fonts and grid stay the same, so it still feels like one page.',
    src: `${ASSET}/section-3.webp`,
    bg: '#F3F4F6',
    dark: false,
    flip: false,
  },
  {
    n: '04',
    title: 'Lineup and close',
    note: 'An oval portrait leads into the full Gentle Jelly lineup with prices. The page ends with a single Discover More button.',
    src: `${ASSET}/section-4.webp`,
    bg: '#232323',
    dark: true,
    flip: true,
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
}: {
  src: string
  alt: string
  dark: boolean
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
              Two lines,
              <br />
              one page
            </h2>
          </div>
          <p className="md:col-span-8 font-sans text-ink/75 text-base md:text-lg leading-[1.8]">
            I designed this campaign page on my own for Gentle Monster&apos;s 2024 collection. The
            collection has two lines that look nothing alike. Void KC6 is dark and sharp, and Gentle
            Jelly is bright and playful. I wanted each line to have its own look while the whole page
            still felt like one brand.
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
              </Reveal>
            </div>
            <div className={`lg:col-span-8 ${s.flip ? 'lg:order-1' : ''}`}>
              <Reveal>
                <BrowserFrame
                  src={s.src}
                  alt={`Gentle Monster campaign page, part ${s.n}: ${s.title}`}
                  dark={s.dark}
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
