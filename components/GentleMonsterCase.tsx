'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Cormorant_Garamond } from 'next/font/google'

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], display: 'swap' })

const ASSET = '/gentle-monster-case'

const META = [
  { label: 'Project type', value: 'Personal Project' },
  { label: 'Tools', value: 'Figma, Photoshop, Illustrator' },
  { label: 'Year', value: '2024' },
  { label: 'Role', value: 'Visual Design' },
]

const GOALS = [
  { title: 'Separate the two lines', body: 'Each line gets its own background and layout, but both share the same grid and fonts.' },
  { title: 'Show the product clearly', body: 'Every model photo sits next to a product shot, the model name, and the price.' },
  { title: 'Keep the scroll interesting', body: 'Big campaign photos and small product shots take turns so the long page never feels repetitive.' },
]

const COLORS = [
  { name: 'Deep', hex: '#232323' },
  { name: 'Charcoal', hex: '#313131' },
  { name: 'Sand', hex: '#C4BAA9' },
  { name: 'Fog', hex: '#F3F4F6' },
  { name: 'Jelly', hex: '#F2B8CF' },
]

const SECTIONS = [
  {
    n: '01',
    scroll: false,
    title: 'Campaign intro',
    note: 'The page opens with the logo and one big campaign photo. A round portrait and a short headline then introduce the new collection.',
    src: `${ASSET}/section-1.webp`,
    bg: '#232323',
    dark: true,
    flip: false,
    doodle: 'star',
  },
  {
    n: '02',
    scroll: true,
    title: 'Void KC6 world',
    note: 'A dark section for Void KC6. Each model has a campaign photo, a product shot, a short description, and the price.',
    src: `${ASSET}/section-2.webp`,
    bg: '#313131',
    dark: true,
    flip: true,
    doodle: 'glasses',
  },
  {
    n: '03',
    scroll: true,
    title: 'Gentle Jelly world',
    note: 'The background turns light for the Gentle Jelly line. The fonts and grid stay the same, so it still feels like one page.',
    src: `${ASSET}/section-3.webp`,
    bg: '#F3F4F6',
    dark: false,
    flip: false,
    doodle: 'none',
  },
  {
    n: '04',
    scroll: false,
    title: 'Lineup and close',
    note: 'An oval portrait leads into the full Gentle Jelly lineup with prices. The page ends with a single Discover More button.',
    src: `${ASSET}/section-4.webp`,
    bg: '#232323',
    dark: true,
    flip: true,
    doodle: 'lineup',
  },
] as const

const SCROLL_CSS = `
.gm-scroll { scrollbar-width: thin; scrollbar-color: rgba(35,35,35,0.35) transparent; }
.gm-scroll-dark { scrollbar-color: rgba(255,255,255,0.35) transparent; }
.gm-scroll::-webkit-scrollbar { width: 6px; }
.gm-scroll::-webkit-scrollbar-thumb { background: rgba(35,35,35,0.35); border-radius: 6px; }
.gm-scroll-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35); }
@keyframes gm-spin { to { transform: rotate(360deg); } }
@keyframes gm-twinkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.88); } }
.gm-twinkle { animation: gm-twinkle 4.5s ease-in-out infinite; transform-origin: center; }
@media (prefers-reduced-motion: reduce) { .gm-twinkle { animation: none; } }
@media print { .gm-scroll { max-height: none; overflow: visible; } }
`

/* ---------- illustration pieces ---------- */

function ChromeStar({ size = 80, className = '', style }: { size?: number; className?: string; style?: CSSProperties }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <defs>
        <linearGradient id={`c${id}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.28" stopColor="#c5c9cf" />
          <stop offset="0.5" stopColor="#f4f5f7" />
          <stop offset="0.72" stopColor="#8e939b" />
          <stop offset="1" stopColor="#e9ebee" />
        </linearGradient>
        <radialGradient id={`g${id}`}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="22" fill={`url(#g${id})`} />
      <path d="M50 0 C51.6 36 64 48.4 100 50 C64 51.6 51.6 64 50 100 C48.4 64 36 51.6 0 50 C36 48.4 48.4 36 50 0 Z" fill={`url(#c${id})`} />
      <path d="M50 8 C51 38 58 46 50 50 C49.4 40 49.6 24 50 8 Z" fill="#ffffff" opacity="0.7" />
    </svg>
  )
}

function Crosshair({ size = 22, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <g fill="none" stroke={color} strokeWidth="0.8">
        <circle cx="12" cy="12" r="5.5" />
        <path d="M12 0 V24 M0 12 H24" />
      </g>
    </svg>
  )
}

function Orbit({ className = '', style, color = 'currentColor' }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true" className={className} style={style}>
      <ellipse cx="200" cy="80" rx="196" ry="76" fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function EllipseLabel({ children, className = '', color = 'currentColor' }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center px-5 py-1.5 ${className}`}>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-3">
        <ellipse cx="50" cy="20" rx="48" ry="18" fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}

const LENS = 'M8 22 C10 8 40 3 62 7 C84 11 112 9 114 24 C116 41 104 62 76 64 C50 66 29 62 17 52 C9 45 6 34 8 22 Z'

function Lens({ color, width = 110, stroke = 'rgba(0,0,0,0.25)' }: { color: string; width?: number; stroke?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg width={width} height={(width * 70) / 122} viewBox="0 0 122 70" aria-hidden="true">
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={LENS} fill={color} stroke={stroke} strokeWidth="1" />
      <path d={LENS} fill={`url(#l${id})`} />
      <path d="M26 16 C40 11 54 11 64 13" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

function GlassesLine({ width = 160, color = 'currentColor' }: { width?: number; color?: string }) {
  return (
    <svg width={width} height={(width * 60) / 200} viewBox="0 0 200 60" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 14 C6 9 9 7 14 7 H78 C84 7 87 10 87 15 V30 C87 44 76 52 60 52 H34 C17 52 6 43 6 28 Z" />
        <path d="M113 15 C113 10 116 7 122 7 H186 C191 7 194 9 194 14 V28 C194 43 183 52 166 52 H140 C124 52 113 44 113 30 Z" />
        <path d="M87 17 C94 12 106 12 113 17" />
        <path d="M6 13 L0 11 M194 13 L200 11" />
      </g>
      <g fill="none" stroke={color} strokeWidth="0.8" opacity="0.6">
        <path d="M16 18 L30 14" />
        <path d="M123 18 L137 14" />
      </g>
    </svg>
  )
}

function Doodle({ kind, dark }: { kind: string; dark: boolean }) {
  if (kind === 'star') return <ChromeStar size={86} className="gm-twinkle" />
  if (kind === 'glasses') return <GlassesLine width={170} color={dark ? 'rgba(255,255,255,0.7)' : '#232323'} />
  if (kind === 'none') return null
  return (
    <div className="flex gap-2">
      {['#F4E9B8', '#D9DADB', '#2B2B2B', '#F2B8CF'].map((c) => (
        <Lens key={c} color={c} width={46} stroke="rgba(255,255,255,0.35)" />
      ))}
    </div>
  )
}

/* ---------- layout pieces ---------- */

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
      { threshold: 0.1 }
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

function CornerMarks({ color }: { color: string }) {
  const c = 'absolute h-5 w-5'
  return (
    <>
      <span aria-hidden="true" className={`${c} -left-4 -top-4 border-l border-t`} style={{ borderColor: color }} />
      <span aria-hidden="true" className={`${c} -right-4 -top-4 border-r border-t`} style={{ borderColor: color }} />
      <span aria-hidden="true" className={`${c} -left-4 -bottom-4 border-l border-b`} style={{ borderColor: color }} />
      <span aria-hidden="true" className={`${c} -right-4 -bottom-4 border-r border-b`} style={{ borderColor: color }} />
    </>
  )
}

function BrowserFrame({ src, alt, dark, scroll }: { src: string; alt: string; dark: boolean; scroll: boolean }) {
  return (
    <div>
      <div className="relative">
        <CornerMarks color={dark ? 'rgba(255,255,255,0.35)' : 'rgba(35,35,35,0.35)'} />
        <div className={`overflow-hidden rounded-xl border ${dark ? 'border-white/10 bg-[#1a1a1a]' : 'border-black/10 bg-white'} shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]`}>
          <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${dark ? 'border-white/10' : 'border-black/5'}`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${dark ? 'bg-white/20' : 'bg-black/15'}`} />
            ))}
            <span className={`ml-3 font-data text-[9px] tracking-widest ${dark ? 'text-white/30' : 'text-black/30'}`}>gentlemonster.com/2024-collection</span>
          </div>
          <div className={scroll ? `gm-scroll ${dark ? 'gm-scroll-dark' : ''} max-h-[76vh] overflow-y-auto overscroll-contain` : ''}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="block w-full" loading="lazy" />
          </div>
        </div>
      </div>
      {scroll && (
        <p className={`mt-6 text-right font-data text-[9px] uppercase tracking-[0.25em] ${dark ? 'text-white/40' : 'text-black/35'}`}>Scroll inside the page ↓</p>
      )}
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

function MetaRow() {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-left">
      {META.map((m) => (
        <div key={m.label}>
          <dt className="font-data text-[9px] uppercase tracking-[0.25em] mb-1.5 text-ink/40">{m.label}</dt>
          <dd className="font-sans text-sm text-ink/85">{m.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Eyebrow({ children, dark }: { children: ReactNode; dark: boolean }) {
  return <p className={`font-data text-[10px] uppercase tracking-[0.3em] ${dark ? 'text-white/45' : 'text-ink/45'}`}>{children}</p>
}

export default function GentleMonsterCase({ number, tag, title, description }: { number: string; tag: string; title: string; description: string }) {
  return (
    <div>
      <style>{SCROLL_CSS}</style>

      {/* Header */}
      <header className="relative pt-32 pb-14 px-8 md:px-16 max-w-4xl mx-auto text-center">
        <ChromeStar size={34} className="absolute right-[10%] top-36 hidden md:block gm-twinkle" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))' }} />
        <p className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6">
          {number} · {tag}
        </p>
        <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink leading-[1.05] mb-6">{title}</h1>
        <p className="font-sans text-ink/70 text-sm md:text-base leading-[1.7] max-w-xl mx-auto mb-12">{description}</p>
        <div className="border-t border-ink/15 pt-8 max-w-3xl mx-auto">
          <MetaRow />
        </div>
      </header>

      {/* Cover */}
      <section className="relative overflow-hidden bg-[#232323] px-6 md:px-16 pt-24 pb-28 text-white">
        <Orbit className="absolute left-1/2 top-1/2 h-[78%] w-[110%] -translate-x-1/2 -translate-y-1/2 -rotate-6 text-white/15" />
        <Crosshair className="absolute left-8 top-8 text-white/30" />
        <Crosshair className="absolute right-8 top-8 text-white/30" />
        <Crosshair className="absolute left-8 bottom-8 text-white/30" />
        <Crosshair className="absolute right-8 bottom-8 text-white/30" />
        <p className={`${serif.className} absolute left-6 md:left-12 top-1/2 hidden md:block -translate-y-1/2 -rotate-90 origin-center text-[13px] italic tracking-[0.4em] text-white/40`}>
          New Collection
        </p>
        <p className="absolute right-6 md:right-12 top-1/2 hidden md:block -translate-y-1/2 rotate-90 font-data text-[9px] tracking-[0.4em] text-white/30">Gentle Monster · 2024</p>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-center gap-4 text-white/70">
            <span className={`${serif.className} text-[22px] italic`}>Collection</span>
            <EllipseLabel className={`${serif.className} text-[18px]`}>2024</EllipseLabel>
            <span className={`${serif.className} text-[22px] italic`}>Campaign</span>
          </div>
          <Reveal className="relative">
            <ChromeStar size={120} className="absolute -right-8 -top-14 z-10 gm-twinkle" />
            <ChromeStar size={44} className="absolute -left-6 bottom-10 z-10 hidden md:block" />
            <Laptop src={`${ASSET}/screen-cover.webp`} alt="Gentle Monster campaign page shown on a laptop" />
          </Reveal>
        </div>
      </section>

      {/* Overview + goals */}
      <section className="relative px-8 md:px-16 py-24 md:py-28 bg-[#F3F4F6]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <Eyebrow dark={false}>Overview</Eyebrow>
              <h2 className={`${serif.className} mt-4 text-[44px] md:text-[60px] leading-[1] font-light text-ink`}>
                Two lines,
                <br />
                <EllipseLabel className="-ml-4 italic" color="#232323">one page</EllipseLabel>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-4">
              <p className="font-sans text-ink/75 text-base md:text-lg leading-[1.8]">
                I designed this campaign page on my own for Gentle Monster&apos;s 2024 collection. The
                collection has two lines that look nothing alike. Void KC6 is dark and sharp, and Gentle
                Jelly is bright and playful. I wanted each line to have its own look while the whole page
                still felt like one brand.
              </p>
              <div className="mt-8 flex items-center gap-6 text-ink/70">
                <div className="flex items-center gap-3">
                  <Lens color="#2B2B2B" width={54} />
                  <span className="font-data text-[9px] uppercase tracking-[0.25em]">Void KC6</span>
                </div>
                <span className="h-px w-10 bg-ink/30" />
                <div className="flex items-center gap-3">
                  <Lens color="#F2B8CF" width={54} />
                  <span className="font-data text-[9px] uppercase tracking-[0.25em]">Gentle Jelly</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {GOALS.map((g, i) => (
              <Reveal key={g.title}>
                <div className="relative h-full border border-ink/15 bg-white/60 p-7">
                  <Crosshair size={16} className="absolute -right-2 -top-2 text-ink/40" />
                  <p className={`${serif.className} text-[34px] italic font-light leading-none text-ink/40`}>0{i + 1}</p>
                  <h3 className="mt-5 font-sans font-semibold text-ink text-base mb-2">{g.title}</h3>
                  <p className="font-sans text-ink/65 text-sm leading-[1.7]">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Style guide */}
      <section className="relative overflow-hidden bg-[#313131] px-8 md:px-16 py-24 md:py-28">
        <Orbit className="absolute -right-40 top-10 h-[320px] w-[640px] rotate-12 text-white/10" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="flex items-end justify-between">
            <div>
              <Eyebrow dark>Style guide</Eyebrow>
              <h2 className={`${serif.className} mt-4 text-[44px] md:text-[60px] leading-[1] font-light text-white/90`}>Type &amp; color</h2>
            </div>
            <ChromeStar size={64} className="hidden md:block gm-twinkle" />
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-12 gap-8">
            <Reveal className="lg:col-span-7">
              <div className="relative h-full border border-white/10 bg-[#232323] p-6 md:p-8 space-y-8">
                <CornerMarks color="rgba(255,255,255,0.3)" />
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
                    <img src={`${ASSET}/${t.src}`} alt={`${t.font} sample`} className={`${t.w} rounded-sm`} />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5">
              <div className="relative h-full border border-white/10 bg-[#232323] p-6 md:p-8">
                <CornerMarks color="rgba(255,255,255,0.3)" />
                <p className="font-data text-[9px] uppercase tracking-[0.25em] text-white/40 mb-6">Colors, as lenses</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {COLORS.map((c) => (
                    <div key={c.hex} className="flex items-center gap-3">
                      <Lens color={c.hex} width={70} stroke="rgba(255,255,255,0.3)" />
                      <div>
                        <p className={`${serif.className} text-[18px] italic text-white/85`}>{c.name}</p>
                        <p className="font-data text-[9px] tracking-widest text-white/40">{c.hex}</p>
                      </div>
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
        <section key={s.n} className="relative overflow-hidden px-6 md:px-16 py-24 md:py-28" style={{ background: s.bg }}>
          <Orbit
            className={`absolute top-1/2 h-[60%] w-[70%] -translate-y-1/2 ${s.flip ? '-left-[30%] rotate-12' : '-right-[30%] -rotate-12'} ${s.dark ? 'text-white/10' : 'text-black/10'}`}
          />
          <div className={`relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 ${s.scroll ? 'items-center' : 'items-start'}`}>
            <div className={`lg:col-span-4 ${s.scroll ? '' : 'lg:sticky lg:top-28'} ${s.flip ? 'lg:order-2' : ''}`}>
              <Reveal>
                <div className={`flex items-center gap-3 ${s.dark ? 'text-white/50' : 'text-ink/50'}`}>
                  <EllipseLabel className={`${serif.className} text-[18px] italic`}>No. {s.n}</EllipseLabel>
                  <span className={`h-px flex-1 ${s.dark ? 'bg-white/15' : 'bg-black/15'}`} />
                </div>
                <h2 className={`${serif.className} mt-5 text-[38px] md:text-[48px] leading-[1.02] font-light ${s.dark ? 'text-white/90' : 'text-ink'}`}>{s.title}</h2>
                <p className={`mt-5 font-sans text-[15px] leading-[1.8] ${s.dark ? 'text-white/60' : 'text-ink/65'}`}>{s.note}</p>
                <div className="mt-10">
                  <Doodle kind={s.doodle} dark={s.dark} />
                </div>
              </Reveal>
            </div>
            <div className={`lg:col-span-8 ${s.flip ? 'lg:order-1' : ''}`}>
              <Reveal>
                <BrowserFrame src={s.src} alt={`Gentle Monster campaign page, part ${s.n}: ${s.title}`} dark={s.dark} scroll={s.scroll} />
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="relative px-8 md:px-16 py-28 text-center">
        <Reveal>
          <ChromeStar size={70} className="mx-auto gm-twinkle" style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }} />
          <p className="mt-6 font-data text-[10px] uppercase tracking-[0.3em] text-ink/40">Gentle Monster · 2024 New Collection</p>
          <p className={`${serif.className} mt-4 text-[44px] md:text-[64px] font-light italic leading-none text-ink`}>Thank you for watching</p>
          <div className="mt-14 max-w-3xl mx-auto border-t border-ink/15 pt-8">
            <MetaRow />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
