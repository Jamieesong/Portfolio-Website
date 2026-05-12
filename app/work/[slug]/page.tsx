import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FloatingNav from '@/components/FloatingNav'
import {
  projects,
  getProject,
  getAdjacentProjects,
} from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

function loadPortfolioImages(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'portfolios', slug)
  try {
    const files = fs.readdirSync(dir)
    return files
      .filter((f) => /\.(png|jpg|jpeg|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/portfolios/${slug}/${f}`)
  } catch {
    return []
  }
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const images = loadPortfolioImages(params.slug)
  const { prev, next } = getAdjacentProjects(params.slug)

  const fullBleed = project.fullBleed

  return (
    <main className="bg-bone min-h-screen w-full border-b border-ink/25">
      <FloatingNav />

      {!fullBleed && (
        <>
          {/* Header — project intro */}
          <header className="pt-32 pb-16 px-8 md:px-16 max-w-3xl mx-auto text-center">
            <p className="font-data text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6">
              {project.number} · {project.tag}
            </p>
            <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink leading-[1.05] mb-6">
              {project.title}
            </h1>
            <p className="font-sans text-ink/70 text-sm md:text-base leading-[1.7] max-w-xl mx-auto mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-data text-[10px] uppercase tracking-widest text-ink/50">
              <span>{project.year}</span>
              <span className="text-ink/20">·</span>
              <span>{project.role}</span>
              <span className="text-ink/20">·</span>
              <span>{project.subtitle}</span>
            </div>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
              {project.tools.map((tool) => (
                <li
                  key={tool}
                  className="font-data text-[9px] uppercase tracking-widest text-ink/60 border border-ink/20 rounded-full px-2.5 py-0.5"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </header>

          {/* Thin divider */}
          <div className="mx-auto w-[80%] max-w-3xl h-px bg-ink/15" />
        </>
      )}

      {/* Portfolio pages — stacked images. Full-bleed projects fill the whole
          width; standard projects sit centered in a max-w-4xl column. */}
      <section
        className={
          fullBleed
            ? 'flex flex-col items-center'
            : 'py-16 px-4 md:px-12 flex flex-col items-center gap-6 md:gap-10'
        }
      >
        {images.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-24 px-8 my-16 border border-dashed border-ink/20 rounded-2xl">
            <p className="font-data text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-3">
              Portfolio pages
            </p>
            <p className="font-sans text-ink/60 text-sm leading-relaxed">
              Drop exported PDF pages (PNG / JPG) into{' '}
              <code className="font-data text-ink/80 bg-ink/5 px-1.5 py-0.5 rounded">
                /public/portfolios/{params.slug}/
              </code>{' '}
              — they&apos;ll appear here automatically, sorted by filename.
            </p>
          </div>
        ) : (
          images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${project.title} — page ${i + 1}`}
              className={
                fullBleed
                  ? 'w-full block'
                  : 'w-full max-w-4xl rounded-lg shadow-[0_20px_60px_-40px_rgba(45,36,30,0.35)]'
              }
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          ))
        )}
      </section>

      {/* Prev / Next nav */}
      <nav className="px-8 md:px-16 py-16 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="font-data text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-terra transition-colors duration-300"
        >
          ← all work
        </Link>

        <div className="flex items-center gap-6">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="text-right group"
            >
              <p className="font-data text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                ← previous
              </p>
              <p className="font-display font-bold text-sm uppercase tracking-tight text-ink group-hover:text-terra transition-colors duration-300">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="text-left group"
            >
              <p className="font-data text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-1">
                next →
              </p>
              <p className="font-display font-bold text-sm uppercase tracking-tight text-ink group-hover:text-terra transition-colors duration-300">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </main>
  )
}
