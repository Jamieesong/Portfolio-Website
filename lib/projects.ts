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
  /** When true, the subpage renders portfolio sections with scroll-triggered
   * fade/slide animations as each image enters the viewport. */
  interactive?: boolean
  /** Optional 1-indexed groups of consecutive section images that should render
   * as one continuous block (no gap between them) inside an interactive subpage.
   * Example: [[7,8,9], [10,11,12]] glues sections 7-9 and 10-12 together. */
  sectionGroups?: number[][]
  /** Optional 1-indexed block indices to exclude from scroll-snap centering.
   * Use this for sections whose image is much taller than one viewport (e.g.
   * full-page mockups) so they scroll freely instead of snapping. */
  noSnapSections?: number[]
  /** Optional URL override for the project card link. When set, the card
   * opens this URL directly (typically a standalone HTML page bundled under
   * /public/) instead of the /work/[slug] Next.js subpage. */
  externalUrl?: string
  /** Renders a custom case-study layout component instead of stacked
   * portfolio images. */
  caseStudy?: 'gentle-monster' | 'along'
}

export const projects: Project[] = [
  {
    slug: 'along',
    number: '01',
    title: 'Along',
    subtitle: 'UX Research · Mobile App',
    description:
      'A New York walking app that adds small sidequests to the route you already take, with a companion named Lolo who grows from every walk.',
    tag: 'UX Research',
    year: '2026',
    role: 'UX researcher',
    tools: ['Figma', 'Claude', 'v0'],
    image: '/projects/along.webp',
    imagePosition: 'center',
    caseStudy: 'along',
  },
  {
    slug: 'ilkwang',
    number: '02',
    title: 'Ilkwang Lighting',
    subtitle: 'Website Redesign',
    description:
      "A full website redesign for Ilkwang Lighting — restructuring information architecture and modernising the visual system to make a heritage lighting brand feel approachable, scrollable, and confident online.",
    tag: 'Website',
    year: '2025',
    role: 'UI / UX designer',
    tools: ['Figma', 'Illustrator', 'Notion'],
    image: '/projects/ilkwang.jpg',
    imagePosition: 'center',
    interactive: true,
    sectionGroups: [
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15, 16],
    ],
  },
  {
    slug: 'pawlog',
    number: '03',
    title: 'Pawlog',
    subtitle: 'UX/UI Mobile App',
    description:
      "An end-to-end mobile app for pet owners to track their dog's daily activities — from feeding and walks to vet records — designed around quick logging and gentle reminders that respect a busy life.",
    tag: 'Application',
    year: '2025',
    role: 'Product designer',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
    image: '/projects/pawlog.png',
    imagePosition: 'center',
    interactive: true,
    // Slides whose illustration or background runs across the slide edge
    // stay joined: 1–2 (walking scene), 6–7 (orange arrow), 13–16 (cloud band).
    sectionGroups: [
      [1, 2],
      [6, 7],
      [13, 14, 15, 16],
    ],
  },
  {
    slug: 'gentle-monster',
    number: '04',
    title: 'Gentle Monster',
    subtitle: 'Web Promotion',
    description:
      "A personal campaign page for Gentle Monster's 2024 collection, designed around its two new lines: Void KC6 and Gentle Jelly.",
    tag: 'Personal Project',
    year: '2024',
    role: 'Visual designer',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    image: '/projects/gentle-monster.avif',
    imagePosition: 'center 30%',
    caseStudy: 'gentle-monster',
  },
  {
    slug: 'santa-maria-novella',
    number: '05',
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
    interactive: true,
    // Sections 6–9 are full-page mockups much taller than one viewport;
    // they scroll freely instead of snapping to centre.
    noSnapSections: [6, 7, 8, 9],
  },
  {
    slug: 'parksound',
    number: '06',
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
    externalUrl: '/parksound-page/index.html',
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
