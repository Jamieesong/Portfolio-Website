import Hero from '@/components/Hero'
import SelectedWork from '@/components/SelectedWork'
import About from '@/components/About'
import FloatingNav from '@/components/FloatingNav'

export default function Home() {
  return (
    <main className="bg-bone min-h-screen w-full border-b-2 border-ink">
      <FloatingNav />
      <Hero />
      <SelectedWork />
      <About />
    </main>
  )
}
