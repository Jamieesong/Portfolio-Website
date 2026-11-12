'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Cormorant_Garamond } from 'next/font/google'

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], display: 'swap' })

const ASSET = '/etmon-case'

const C = {
  butter: '#FEFFBF',
  cream: '#FFFDEC',
  sage: '#6B6F66',
  sageDeep: '#5C635B',
  blue: '#DBE7FF',
  ivory: '#F1EEE9',
  ink: '#3B3C37',
}

const META = [
  { label: 'Project type', value: 'Personal Project' },
  { label: 'Tools', value: 'Photoshop, Figma' },
  { label: 'Year', value: '2025' },
  { label: 'Role', value: 'Visual Design' },
]

const KEYWORDS = ['Me time', 'Film mood', 'Soft romance']

const COLORS = [
  { name: 'Butter', hex: '#FEFFBF' },
  { name: 'Sage', hex: '#6B6F66' },
  { name: 'Periwinkle', hex: '#DBE7FF' },
  { name: 'Ivory', hex: '#F1EEE9' },
  { name: 'Ink', hex: '#3B3C37' },
]

const SECTIONS = [
  {
    n: '01',
    scroll: true,
    title: 'Me time Afternoon',
    note: 'The page opens on an oval portrait and a script title, like the first page of a diary. Three best items follow right away, so the mood leads straight into shopping.',
    src: `${ASSET}/section-1.webp`,
    bg: C.sage,
    dark: true,
    flip: false,
    doodle: 'ribbon',
  },
  {
    n: '02',
    scroll: true,
    title: 'Lookbook',
    note: 'Soft blue pages with staggered photos and tiny handwritten notes. Product names sit next to each look, but the layout still reads like a personal photo album.',
    src: `${ASSET}/section-2.webp`,
    bg: C.blue,
    dark: false,
    flip: true,
    doodle: 'heart',
  },
  {
    n: '03',
    scroll: true,
    title: 'A day in July',
    note: 'A deeper sage chapter for the jacket, then a film-strip story that introduces Etmon in its own words: a brand for women with a clear world of their own.',
    src: `${ASSET}/section-3.webp`,
    bg: C.ivory,
    dark: false,
    flip: false,
    doodle: 'film',
  },
  {
    n: '04',
    scroll: false,
    title: 'Special event',
    note: 'A summer sale with a coupon you want to tear off, two product picks next to the look, and a teaser for part two of the collection to close the page.',
    src: `${ASSET}/section-4.webp`,
    bg: C.cream,
    dark: false,
    flip: true,
    doodle: 'ticket',
  },
] as const

/* ---------- illustration pieces ---------- */

function Sparkle({ size = 18, color = C.ink, className = '', style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path
        d="M12 0.5 C12.5 6.4 17.6 11.5 23.5 12 C17.6 12.5 12.5 17.6 12 23.5 C11.5 17.6 6.4 12.5 0.5 12 C6.4 11.5 11.5 6.4 12 0.5 Z"
        fill={color}
      />
    </svg>
  )
}

function Heart({ size = 26, color = C.ink, className = '', style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} style={style}>
      <path
        d="M12 20.4 C7.1 16.7 2.7 13.3 3.2 8.5 C3.6 5 7.5 3.6 10 5.9 C10.9 6.8 11.5 7.8 11.9 8.8 C12.5 7.5 13.4 6.3 14.7 5.6 C17.6 4 21.3 5.7 21 9.4 C20.7 13.7 16.3 16.8 12.4 20.1 L11.6 20.8"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Ribbon({ width = 120, fill = C.butter, stroke = C.ink, className = '', style }: { width?: number; fill?: string; stroke?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg width={width} height={(width * 92) / 120} viewBox="0 0 120 92" aria-hidden="true" className={className} style={style}>
      <g fill={fill} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* tails */}
        <path d="M56 46 C52 60 45 72 35 85 L43.5 83 L45.5 91 C54 77 58 62 59 48 Z" />
        <path d="M64 46 C68 60 75 72 85 85 L76.5 83 L74.5 91 C66 77 62 62 61 48 Z" />
        {/* loops */}
        <path d="M60 39 C48 22 22 13 15 25.5 C9 37 29 49 60 43 Z" />
        <path d="M60 39 C72 22 98 13 105 25.5 C111 37 91 49 60 43 Z" />
      </g>
      {/* folds */}
      <g fill="none" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" opacity="0.7">
        <path d="M57 40 C46 31 31 26 23 28.5" />
        <path d="M63 40 C74 31 89 26 97 28.5" />
        <path d="M54 52 C50 63 46 70 41 78" />
        <path d="M66 52 C70 63 74 70 79 78" />
      </g>
      <ellipse cx="60" cy="41" rx="7" ry="8.2" fill={fill} stroke={stroke} strokeWidth="1.4" />
      <path d="M57.2 37.5 C58.6 39.5 58.6 42.5 57.2 44.5" fill="none" stroke={stroke} strokeWidth="0.9" opacity="0.7" />
    </svg>
  )
}

function Ticket({ width = 150, className = '', style }: { width?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={width} height={(width * 70) / 150} viewBox="0 0 150 70" aria-hidden="true" className={className} style={style}>
      <path
        d="M8 4 H142 A4 4 0 0 1 146 8 V27 A8 8 0 0 0 146 43 V62 A4 4 0 0 1 142 66 H8 A4 4 0 0 1 4 62 V43 A8 8 0 0 0 4 27 V8 A4 4 0 0 1 8 4 Z"
        fill={C.butter}
        stroke={C.ink}
        strokeWidth="1.3"
      />
      <line x1="108" y1="10" x2="108" y2="60" stroke={C.ink} strokeWidth="1" strokeDasharray="3 3" />
      <text x="56" y="32" textAnchor="middle" fontSize="11" fill={C.ink} fontFamily="Georgia, serif" fontStyle="italic">The first and last</text>
      <text x="56" y="48" textAnchor="middle" fontSize="8" fill={C.ink} letterSpacing="2">SUMMER SALE</text>
      <text x="127" y="39" textAnchor="middle" fontSize="11" fill={C.ink} fontFamily="Georgia, serif">20%</text>
    </svg>
  )
}

function FilmIcon({ width = 120, className = '' }: { width?: number; className?: string }) {
  return (
    <svg width={width} height={(width * 56) / 120} viewBox="0 0 120 56" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="116" height="52" rx="3" fill={C.ink} />
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i} fill={C.ivory}>
          <rect x={8 + i * 12.5} y="6" width="6" height="4" rx="1" />
          <rect x={8 + i * 12.5} y="46" width="6" height="4" rx="1" />
        </g>
      ))}
      <rect x="10" y="14" width="30" height="28" rx="1" fill="#C9C2B3" />
      <rect x="45" y="14" width="30" height="28" rx="1" fill="#A9B0A4" />
      <rect x="80" y="14" width="30" height="28" rx="1" fill="#DBE7FF" />
      <text x="114" y="12" textAnchor="end" fontSize="5" fill={C.butter} letterSpacing="0.8">KODAK 400</text>
    </svg>
  )
}

function Tape({ className = '', style, color = 'rgba(254,255,191,0.82)' }: { className?: string; style?: CSSProperties; color?: string }) {
  const teeth = 6
  const left = Array.from({ length: teeth * 2 + 1 }, (_, i) => `${i % 2 ? 4 : 0}% ${(i / (teeth * 2)) * 100}%`)
  const right = Array.from({ length: teeth * 2 + 1 }, (_, i) => `${i % 2 ? 96 : 100}% ${100 - (i / (teeth * 2)) * 100}%`)
  return (
    <span
      aria-hidden="true"
      className={`absolute block h-7 w-24 shadow-[0_2px_6px_rgba(59,60,55,0.12)] ${className}`}
      style={{ background: color, clipPath: `polygon(${[...left, ...right].join(',')})`, ...style }}
    />
  )
}

function scallopPath(r: number, amp: number, bumps: number) {
  const pts: string[] = []
  const steps = bumps * 12
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const rr = r + amp * Math.cos(bumps * t)
    pts.push(`${(50 + rr * Math.cos(t)).toFixed(2)},${(50 + rr * Math.sin(t)).toFixed(2)}`)
  }
  return `M${pts.join(' L')} Z`
}
const SCALLOP = scallopPath(44, 3.2, 14)

function Scallop({ color, children }: { color: string; children?: ReactNode }) {
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={SCALLOP} fill={color} stroke={C.ink} strokeWidth="0.8" />
      </svg>
      <div className="relative flex h-full items-center justify-center">{children}</div>
    </div>
  )
}

function Pill({ children, filled = false, className = '' }: { children: ReactNode; filled?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 font-data text-[9px] uppercase tracking-[0.2em] ${
        filled ? 'border-[#3B3C37] bg-[#FEFFBF] text-[#3B3C37]' : 'border-current'
      } ${className}`}
    >
      {children}
    </span>
  )
}

function Doodle({ kind, dark }: { kind: string; dark: boolean }) {
  const ink = dark ? C.butter : C.ink
  if (kind === 'ribbon') return <Ribbon width={92} fill={C.butter} stroke={C.ink} />
  if (kind === 'heart')
    return (
      <div className="flex items-end gap-1">
        <Heart size={30} color={ink} />
        <Heart size={18} color={ink} style={{ transform: 'rotate(14deg)' }} />
      </div>
    )
  if (kind === 'film') return <FilmIcon width={120} />
  return <Ticket width={150} />
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

function BrowserFrame({ src, alt, dark, scroll }: { src: string; alt: string; dark: boolean; scroll: boolean }) {
  return (
    <div className="relative">
      <Tape className="-top-3 -left-6 -rotate-[24deg]" />
      <Tape className="-top-3 -right-6 rotate-[22deg]" color="rgba(219,231,255,0.85)" />
      <div className={`overflow-hidden rounded-xl border ${dark ? 'border-white/15 bg-[#4f544c]' : 'border-black/10 bg-white'} shadow-[0_40px_80px_-40px_rgba(40,40,35,0.5)]`}>
        <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${dark ? 'border-white/10' : 'border-black/5'}`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${dark ? 'bg-white/25' : 'bg-black/15'}`} />
          ))}
          <span className={`ml-3 font-data text-[9px] tracking-widest ${dark ? 'text-white/40' : 'text-black/30'}`}>etmon.co.kr/24-summer</span>
        </div>
        <div className={scroll ? `etmon-scroll max-h-[76vh] overflow-y-auto overscroll-contain ${dark ? 'etmon-scroll-dark' : ''}` : ''}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="block w-full" loading="lazy" />
        </div>
      </div>
      {scroll && (
        <p className={`mt-3 text-right font-data text-[9px] uppercase tracking-[0.25em] ${dark ? 'text-white/45' : 'text-ink/40'}`}>Scroll inside the page ↓</p>
      )}
    </div>
  )
}

function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-t-[18px] border border-white/15 bg-[#151513] p-[1.6%] pb-[2.2%]">
        <div className="relative overflow-hidden rounded-[6px] aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#3a3a37] to-[#1c1c1a]">
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

function SectionTitle({ eyebrow, children, light = false }: { eyebrow: string; children: ReactNode; light?: boolean }) {
  return (
    <div>
      <p className={`font-data text-[10px] uppercase tracking-[0.3em] ${light ? 'text-white/50' : 'text-ink/45'}`}>( {eyebrow} )</p>
      <h2 className={`${serif.className} mt-3 text-[40px] md:text-[56px] leading-[1] font-light ${light ? 'text-[#FEFFBF]' : 'text-[#3B3C37]'}`}>
        {children}
      </h2>
    </div>
  )
}

const SCROLL_CSS = `
.etmon-scroll { scrollbar-width: thin; scrollbar-color: rgba(59,60,55,0.35) transparent; }
.etmon-scroll-dark { scrollbar-color: rgba(254,255,191,0.45) transparent; }
.etmon-scroll::-webkit-scrollbar { width: 6px; }
.etmon-scroll::-webkit-scrollbar-thumb { background: rgba(59,60,55,0.35); border-radius: 6px; }
.etmon-scroll-dark::-webkit-scrollbar-thumb { background: rgba(254,255,191,0.45); }
@media print { .etmon-scroll { max-height: none; overflow: visible; } }
`

export default function EtmonCase({ number, tag, title, description }: { number: string; tag: string; title: string; description: string }) {
  return (
    <div>
      <style>{SCROLL_CSS}</style>
      {/* Header */}
      <header className="relative pt-32 pb-14 px-8 md:px-16 max-w-4xl mx-auto text-center">
        <Sparkle size={14} className="absolute left-[12%] top-40 hidden md:block" />
        <Sparkle size={10} className="absolute right-[14%] top-56 hidden md:block" />
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
      <section className="relative overflow-hidden px-6 md:px-16 pt-20 pb-24" style={{ background: C.sage }}>
        <svg viewBox="0 0 800 160" className="mx-auto block w-full max-w-3xl" aria-hidden="true">
          <defs>
            <path id="etmon-arc" d="M40 150 Q400 -20 760 150" />
          </defs>
          <text fill={C.butter} fontSize="22" letterSpacing="3" fontFamily="Georgia, serif" fontStyle="italic">
            <textPath href="#etmon-arc" startOffset="50%" textAnchor="middle">
              The pleasure of a day spent alone in a sun-drenched room
            </textPath>
          </text>
        </svg>
        <Sparkle size={22} color={C.butter} className="absolute left-[8%] top-24" />
        <Sparkle size={12} color={C.butter} className="absolute left-[14%] top-44" />
        <Sparkle size={16} color={C.butter} className="absolute right-[10%] top-32" />
        <Sparkle size={10} color={C.butter} className="absolute right-[16%] bottom-28" />
        <Heart size={30} color={C.butter} className="absolute left-[9%] bottom-24 -rotate-12 hidden md:block" />
        <Reveal className="relative mt-6">
          <div className="relative mx-auto max-w-4xl">
            <Ribbon width={128} className="absolute -left-10 -top-14 z-10 -rotate-12 hidden sm:block" />
            <Laptop src={`${ASSET}/screen-cover.webp`} alt="Etmon summer campaign page on a laptop" />
            <span className="absolute -right-3 -bottom-8 rotate-6 hidden sm:inline-flex">
              <Pill filled>2024 Summer · Collection</Pill>
            </span>
          </div>
        </Reveal>
      </section>

      {/* Overview */}
      <section className="relative px-8 md:px-16 py-24 md:py-28" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          <Reveal className="md:col-span-5">
            <SectionTitle eyebrow="Overview">
              <span className="italic">Me time,</span>
              <br />
              Afternoon
            </SectionTitle>
            <div className="mt-8 flex flex-wrap gap-2 text-ink/70">
              <Pill>Etmon</Pill>
              <Pill>Womenswear</Pill>
              <Pill filled>Personal project</Pill>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7">
            <div className="relative rounded-[22px] bg-white/70 p-8 md:p-10 shadow-[0_20px_50px_-35px_rgba(59,60,55,0.5)]">
              <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-dashed border-ink/25" />
              <Tape className="-top-4 left-1/2 -translate-x-1/2 -rotate-3" />
              <Sparkle size={16} className="absolute -top-2 right-10" />
              <Heart size={28} className="absolute -bottom-4 -left-3 rotate-[-14deg]" />
              <p className="relative font-sans text-[15px] md:text-base leading-[1.85] text-ink/80">
                Etmon is a womenswear brand for women with a clear world of their own. For its 2024 summer
                collection, I designed a promotion page around one feeling: a slow afternoon spent alone.
                Film photos, soft light, and small handwritten details carry the page, so a sales page feels
                more like a lookbook you want to keep scrolling.
              </p>
            </div>
          </Reveal>
        </div>

        {/* keywords → goal */}
        <Reveal className="max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {KEYWORDS.map((k) => (
              <div key={k} className="flex justify-center">
                <span className={`${serif.className} inline-flex items-center justify-center rounded-[50%] border border-ink/60 bg-white/70 px-5 md:px-8 py-3 md:py-4 text-[18px] md:text-[26px] italic text-ink`}>
                  {k}
                </span>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 900 110" className="block w-full h-[70px] md:h-[110px]" preserveAspectRatio="none" aria-hidden="true">
            <g fill="none" stroke={C.ink} strokeWidth="1.3" strokeDasharray="2 6" strokeLinecap="round" vectorEffect="non-scaling-stroke">
              <path d="M150 6 C150 60 300 70 446 100" vectorEffect="non-scaling-stroke" />
              <path d="M450 6 L450 98" vectorEffect="non-scaling-stroke" />
              <path d="M750 6 C750 60 600 70 454 100" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          <div className="relative mx-auto max-w-xl rounded-full px-8 py-5 text-center" style={{ background: C.sage }}>
            <Sparkle size={14} color={C.butter} className="absolute left-6 top-1/2 -translate-y-1/2" />
            <Sparkle size={14} color={C.butter} className="absolute right-6 top-1/2 -translate-y-1/2" />
            <p className="font-data text-[9px] uppercase tracking-[0.3em] text-white/60">Goal</p>
            <p className="mt-1 font-sans text-[15px] md:text-[17px] text-[#FEFFBF]">Make a sales page feel like a lookbook you want to keep scrolling.</p>
          </div>
        </Reveal>
      </section>

      {/* Style guide */}
      <section className="px-8 md:px-16 py-24 md:py-28" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-end justify-between gap-6">
            <SectionTitle eyebrow="Style guide">Type &amp; color</SectionTitle>
            <Ribbon width={80} className="hidden md:block rotate-6" />
          </Reveal>

          {/* film strip of type specimens */}
          <Reveal className="mt-12">
            <div className="rounded-[10px] p-4 md:p-5" style={{ background: C.ink }}>
              <div className="flex justify-between font-data text-[9px] tracking-[0.2em] text-[#FEFFBF]/80">
                <span>KODAK 400</span>
                <span>▸ 43</span>
              </div>
              <div className="mt-2 h-3 w-full" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${C.ivory} 0 10px, transparent 10px 26px)`, borderRadius: 2 }} />
              <div className="my-3 grid md:grid-cols-3 gap-3">
                {[
                  { src: 'type-look.webp', role: 'Display script', font: 'Tangier' },
                  { src: 'type-best.webp', role: 'Section titles', font: 'OHHO' },
                  { src: 'type-hero.webp', role: 'Hero lettering', font: 'OHHO + Tangier' },
                ].map((t) => (
                  <figure key={t.src} className="rounded-[4px] overflow-hidden bg-white">
                    <div className="aspect-[16/9] flex items-center justify-center bg-[#FFFDEC]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${ASSET}/${t.src}`} alt={`${t.font} sample`} loading="lazy" className="max-h-full w-full object-contain" />
                    </div>
                    <figcaption className="flex items-baseline justify-between px-3 py-2 font-data text-[9px] uppercase tracking-[0.18em] text-ink/60">
                      <span>{t.role}</span>
                      <span className="text-ink">{t.font}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="h-3 w-full" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${C.ivory} 0 10px, transparent 10px 26px)`, borderRadius: 2 }} />
            </div>
            <p className="mt-3 font-data text-[9px] uppercase tracking-[0.2em] text-ink/45">Body and labels set in Pretendard and Freesentation</p>
          </Reveal>

          {/* scalloped color swatches */}
          <Reveal className="mt-14 grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-10">
            {COLORS.map((c, i) => (
              <div key={c.hex} className="text-center">
                <div className="mx-auto max-w-[150px]" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 6}deg)` }}>
                  <Scallop color={c.hex} />
                </div>
                <p className={`${serif.className} mt-3 text-[20px] italic text-ink`}>{c.name}</p>
                <p className="font-data text-[9px] tracking-widest text-ink/50">{c.hex}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Design sections */}
      {SECTIONS.map((s) => (
        <section key={s.n} className="relative overflow-hidden px-6 md:px-16 py-24 md:py-28" style={{ background: s.bg }}>
          <Sparkle size={14} color={s.dark ? C.butter : C.ink} className={`absolute top-12 ${s.flip ? 'left-[6%]' : 'right-[6%]'} opacity-70`} />
          <Sparkle size={9} color={s.dark ? C.butter : C.ink} className={`absolute top-20 ${s.flip ? 'left-[9%]' : 'right-[9%]'} opacity-70`} />
          <div className={`max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 ${s.scroll ? 'items-center' : 'items-start'}`}>
            <div className={`lg:col-span-4 ${s.scroll ? '' : 'lg:sticky lg:top-28'} ${s.flip ? 'lg:order-2' : ''}`}>
              <Reveal>
                <p className={`${serif.className} italic text-[22px] ${s.dark ? 'text-white/60' : 'text-ink/50'}`}>No. {s.n}</p>
                <h2 className={`${serif.className} mt-1 text-[38px] md:text-[48px] leading-[1.02] font-light ${s.dark ? 'text-[#FEFFBF]' : 'text-ink'}`}>{s.title}</h2>
                <p className={`mt-5 font-sans text-[15px] leading-[1.8] ${s.dark ? 'text-white/70' : 'text-ink/70'}`}>{s.note}</p>
                <div className="mt-8">
                  <Doodle kind={s.doodle} dark={s.dark} />
                </div>
              </Reveal>
            </div>
            <div className={`lg:col-span-8 ${s.flip ? 'lg:order-1' : ''}`}>
              <Reveal>
                <BrowserFrame src={s.src} alt={`Etmon campaign page, part ${s.n}: ${s.title}`} dark={s.dark} scroll={s.scroll} />
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Closing */}
      <section className="relative px-8 md:px-16 py-28 text-center">
        <Reveal>
          <Ribbon width={110} className="mx-auto" />
          <p className="mt-6 font-data text-[10px] uppercase tracking-[0.3em] text-ink/40">( Etmon · 2024 Summer Collection )</p>
          <p className={`${serif.className} mt-4 text-[44px] md:text-[64px] font-light italic leading-none text-ink`}>Thank you for watching</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Sparkle size={12} />
            <Heart size={20} />
            <Sparkle size={12} />
          </div>
          <div className="mt-14 max-w-3xl mx-auto border-t border-ink/15 pt-8">
            <MetaRow />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
