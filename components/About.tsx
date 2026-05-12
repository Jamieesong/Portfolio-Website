'use client'

export default function About() {
  return (
    <section
      id="about"
      className="w-full h-screen flex flex-col bg-bone overflow-hidden"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Portrait */}
        <div className="relative w-[150px] h-[150px] md:w-[170px] md:h-[170px] rounded-[20px] overflow-hidden border border-ink/15 shadow-[0_14px_40px_-24px_rgba(45,36,30,0.3)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jamie.jpg"
            alt="Jamie Song"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tagline */}
        <p className="mt-8 font-sans text-ink text-[15px] md:text-base text-center">
          Hi, I&apos;m{' '}
          <span className="font-bold underline underline-offset-[5px] decoration-ink decoration-[1.5px]">
            Jamie
          </span>{' '}
          — a UX/UI designer based in New York.
        </p>

        {/* Body copy */}
        <div className="mt-8 max-w-[520px] flex flex-col gap-5 font-sans text-ink/85 text-[13.5px] md:text-[14px] leading-[1.75] text-center">
          <p>
            I&apos;m currently finishing my BFA in{' '}
            <span className="wavy-underline">Interactive Media Arts</span>{' '}
            at NYU Tisch, where I&apos;ve been exploring how thoughtful
            digital experiences can make everyday interactions feel simpler
            and more intuitive.
          </p>

          <p>
            I&apos;m currently working as a UI/UX intern at{' '}
            <span className="wavy-underline">Next Play Games</span>,
            shaping interfaces and player flows for a small, fast-moving
            team — translating playful ideas into screens that feel clear
            the first time you touch them.
          </p>

          <p>
            When I&apos;m not designing, you&apos;ll probably find me deep
            in a <span className="wavy-underline">true crime podcast</span>.
          </p>
        </div>

        {/* Closing line */}
        <p className="mt-9 font-sans text-ink/55 text-[12.5px] text-center">
          Always open to new opportunities.
        </p>

        {/* CTA — small uniform pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 font-sans text-[10.5px]">
          <a
            href="mailto:jamiecwsong@gmail.com"
            className="px-3 py-1.5 rounded-full border border-ink/40 text-ink/80 font-bold uppercase tracking-[0.14em] hover:border-ink hover:text-ink transition-colors duration-300"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/jamie-chaewon-song"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full border border-ink/40 text-ink/80 font-bold uppercase tracking-[0.14em] hover:border-ink hover:text-ink transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full border border-ink/40 text-ink/80 font-bold uppercase tracking-[0.14em] hover:border-ink hover:text-ink transition-colors duration-300"
          >
            Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
