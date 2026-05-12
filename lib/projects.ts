export interface Project {
  slug: string
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
  /** When true, the project subpage hides its header/meta block and shows the
   * portfolio image edge-to-edge — used for projects whose PDF already contains
   * the title, description, and credits. */
  fullBleed?: boolean
}

export const projects: Project[] = [
  {
    slug: 'pawlog',
    number: '01',
    title: 'Pawlog',
    subtitle: 'UX/UI Mobile App',
    description:
      "An end-to-end mobile app for pet owners to track their dog's daily activities — from feeding and walks to vet records — designed around quick logging and gentle reminders that respect a busy life.",
    tag: 'Application',
    year: '2025',
    role: 'Product designer',
    tools: ['Figma', 'Principle', 'Notion'],
    image: '/projects/pawlog.png',
    imagePosition: 'center',
    fullBleed: true,
  },
  {
    slug: 'gentle-monster',
    number: '02',
    title: 'Gentle Monster',
    subtitle: 'Web Promotion',
    description:
      "A campaign site for Gentle Monster's 2024 New Collection — Gentle Jelly & Void KC6 — built around two distinct visual worlds with shared structural typography.",
    tag: 'Promotion',
    year: '2024',
    role: 'Visual designer',
    tools: ['Figma', 'After Effects', 'Cinema 4D'],
    image: '/projects/gentle-monster.avif',
    imagePosition: 'center 30%',
  },
  {
    slug: 'santa-maria-novella',
    number: '03',
    title: 'Santa Maria Novella',
    subtitle: 'Website Redesign',
    description:
      "A luxury brand visual system renewal for the world's oldest pharmacy — a unified grid, redesigned key pages, and a softer typographic voice that honours the brand's heritage.",
    tag: 'Website',
    year: '2024',
    role: 'UI / Brand',
    tools: ['Figma', 'Webflow', 'Illustrator'],
    image: '/projects/santa-maria-novella.png',
    imagePosition: 'center 35%',
    fullBleed: true,
  },
  {
    slug: 'parksound',
    number: '04',
    title: 'ParkSound AI',
    subtitle: 'AI UX Mobile App',
    description:
      "An AI-powered iOS concept connecting NYC residents with free live park performances — recommendations tuned to weather, mood, and proximity, surfaced through a quiet conversational interface.",
    tag: 'AI Project',
    year: '2025',
    role: 'UX designer',
    tools: ['Figma', 'Framer', 'OpenAI API'],
    image: '/projects/parksound.png',
    imagePosition: 'center',
    fullBleed: true,
  },
  {
    slug: 'etmon',
    number: '05',
    title: 'ETMON',
    subtitle: 'Seasonal Promotion',
    description:
      'Multi-format digital assets for seasonal campaigns and lifestyle storytelling — a flexible system spanning landing pages, social cuts, and editorial layouts.',
    tag: 'Promotion',
    year: '2023',
    role: 'Visual designer',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    image: '/projects/etmon.webp',
    imagePosition: 'center',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  }
}
