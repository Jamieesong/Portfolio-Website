'use client'

const timeline = [
  { year: '2026', label: 'BFA, Interactive Media Arts', place: 'NYU Tisch' },
  { year: '2025', label: 'UX Design Intern', place: 'Next Play Games' },
  { year: '2024', label: 'Freelance Product Design', place: 'New York, NY' },
  { year: '2023', label: 'Visual Designer', place: 'Student Projects' },
]

const toolkit = [
  'Figma',
  'Framer',
  'Principle',
  'After Effects',
  'Cinema 4D',
  'HTML / CSS',
  'React Basics',
  'Notion',
]

export default function About() {
  return (
    <section id="about" className="w-full min-h-screen flex flex-col bg-bone">
      {/* Title */}
      <div className="shrink-0 px-10 md:px-16 pt-24 pb-10 border-b border-ink/20">
        <div className="flex items-end justify-between gap-8">
          <h2
            className="font-display font-bold uppercase text-ink tracking-[-0.02em] leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.8rem)' }}
          >
            About <span className="wavy-underline">me</span>,<br />
            <span className="text-ink/40">in a few lines.</span>
          </h2>
          <p className="hidden md:block font-sans text-ink/50 text-sm max-w-xs leading-relaxed pb-2">
            Designer, student, and occasional illustrator based in New York.
            Currently graduating and looking for full-time roles.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-10 md:px-16 py-14 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14">
        {/* LEFT — long-form bio */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              01 — Practice
            </span>
            <p className="font-sans text-ink/80 text-base md:text-lg leading-relaxed mt-4">
              I&apos;m a product &amp; UX designer who loves solving real
              problems with clean design and clear thinking. My work sits at the
              intersection of interface, brand, and small interactive moments —
              the kind that make a product feel considered.
            </p>
          </div>

          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              02 — Background
            </span>
            <p className="font-sans text-ink/80 text-base md:text-lg leading-relaxed mt-4">
              Currently finishing my BFA in{' '}
              <span className="wavy-underline">Interactive Media Arts</span> at
              NYU Tisch (Jan 2026), while interning as a UX Design Intern at{' '}
              <span className="wavy-underline">Next Play Games</span>. Before
              that, I worked on brand and campaign design for a handful of
              studios in Seoul and New York.
            </p>
          </div>

          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              03 — What I&apos;m looking for
            </span>
            <p className="font-sans text-ink/80 text-base md:text-lg leading-relaxed mt-4">
              Full-time product design roles in NYC where I can contribute to
              end-to-end user experience work — from research and prototyping
              through visual craft and ship. I care a lot about pace, clarity,
              and the details no one notices.
            </p>
          </div>
        </div>

        {/* RIGHT — meta / timeline / toolkit / contact */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {/* Quick facts */}
          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              Details
            </span>
            <dl className="mt-4 divide-y divide-ink/15">
              {[
                ['Location', 'New York City, NY'],
                ['Graduation', 'NYU Tisch — Jan 2026'],
                ['Current', 'UX Intern @ Next Play Games'],
                ['Status', 'Open to full-time roles'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between py-3">
                  <dt className="font-data text-[10px] uppercase tracking-widest text-ink/50">
                    {k}
                  </dt>
                  <dd className="font-sans font-bold text-ink text-sm text-right">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Timeline */}
          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              Timeline
            </span>
            <ul className="mt-4 divide-y divide-ink/15">
              {timeline.map((t) => (
                <li
                  key={t.year + t.label}
                  className="flex items-baseline gap-4 py-3"
                >
                  <span className="font-data text-[10px] text-ink/40 tracking-widest w-12 shrink-0">
                    {t.year}
                  </span>
                  <span className="flex-1 font-sans font-bold text-ink text-sm leading-snug">
                    {t.label}
                  </span>
                  <span className="font-data text-[9px] uppercase tracking-widest text-ink/40 text-right">
                    {t.place}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toolkit */}
          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              Toolkit
            </span>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {toolkit.map((tool, i) => (
                <li
                  key={tool}
                  className="font-data text-[10px] uppercase tracking-widest text-ink/70"
                >
                  {tool}
                  {i < toolkit.length - 1 && (
                    <span className="text-ink/20 ml-2">/</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="border-t border-ink/30 pt-4">
            <span className="font-data text-[10px] uppercase tracking-widest text-ink/40">
              Get in touch
            </span>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans font-bold text-ink text-base">
              <a
                href="mailto:jamiecwsong@gmail.com"
                className="underline underline-offset-4 decoration-ink/20 hover:decoration-terra hover:text-terra transition-all duration-500"
              >
                email
              </a>
              <span className="text-ink/20">·</span>
              <a
                href="https://linkedin.com/in/jamie-chaewon-song"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-ink/20 hover:decoration-terra hover:text-terra transition-all duration-500"
              >
                linkedin
              </a>
              <span className="text-ink/20">·</span>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-ink/20 hover:decoration-terra hover:text-terra transition-all duration-500"
              >
                resume
              </a>
            </div>
            <p className="font-data text-[9px] uppercase tracking-widest text-ink/30 mt-3">
              Reply within 48 hours
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar — mirrors Hero exactly */}
      <div className="shrink-0 border-t-2 border-ink px-10 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-sans font-bold text-ink text-sm tracking-tight">
          UX Design Intern at{' '}
          <span className="wavy-underline">Next Play Games</span>
          &nbsp;·&nbsp; Interactive Media Arts Student at{' '}
          <span className="wavy-underline">NYU Tisch</span>
        </p>
        <p className="font-data text-[9px] uppercase tracking-widest text-ink/30">
          © 2026 Jamie Chaewon Song
        </p>
      </div>
    </section>
  )
}
