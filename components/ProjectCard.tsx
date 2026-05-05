'use client'

interface ProjectCardProps {
  number: string
  title: string
  subtitle: string
  description: string
  tag: string
  year: string
  role: string
  tools: string[]
  image: string
  imagePosition?: string
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tag,
  year,
  role,
  tools,
  image,
  imagePosition = 'center',
}: ProjectCardProps) {
  return (
    <article className="group cursor-crosshair flex flex-col gap-5 w-full max-w-2xl mx-auto">
      {/* Visual panel — fixed 4:3 ratio (W:H) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px] border border-ink/15 bg-bone">
        {/* The image — covers the panel, cropped via object-fit. Custom focal point per project. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          style={{
            objectPosition: imagePosition,
            filter: 'sepia(0.22) saturate(0.78) brightness(0.97)',
          }}
        />
        {/* Unifying overlay — subtle warm bone wash that fades on hover to reveal the original */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(245,239,224,0.18) 0%, rgba(168,82,56,0.10) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Inverse filter wash — runs alongside the overlay so on hover the picture returns to true colour */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-ink leading-tight transition-colors duration-500 group-hover:text-terra">
          {title}
        </h3>
        <p className="font-sans text-ink/70 text-sm md:text-base leading-relaxed max-w-2xl">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-1">
          {/* Meta — year · role · subtitle · tag */}
          <p className="font-data text-[10px] uppercase tracking-widest text-ink/50 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{year}</span>
            <span className="text-ink/25">·</span>
            <span>{role}</span>
            <span className="text-ink/25">·</span>
            <span>{subtitle}</span>
            <span className="text-ink/25">·</span>
            <span>{tag}</span>
          </p>

          {/* Tools */}
          <ul className="flex flex-wrap gap-1.5">
            {tools.map((tool) => (
              <li
                key={tool}
                className="font-data text-[9px] uppercase tracking-widest text-ink/60 border border-ink/20 rounded-full px-2.5 py-0.5 transition-colors duration-500 hover:text-ink hover:border-ink/50"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
