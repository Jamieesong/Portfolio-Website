import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import feature1 from '../assets/feature-1.gif'
import feature2 from '../assets/feature-2.gif'

export default function FeaturesChess() {
  return (
    <section className="py-24 px-6 lg:px-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-6">
          <span className="text-white text-xs font-medium font-body">Capabilities</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
          <BlurText text="Pro features. Zero complexity." delay={100} direction="bottom" splitBy="words" />
        </h2>
      </div>

      {/* Row 1: Content left, Image right */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-24 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-2xl md:text-3xl font-heading italic text-white mb-4 leading-tight">
            Designed to convert. Built to perform.
          </h3>
          <p className="text-white/60 font-body font-light text-sm md:text-base mb-8 max-w-md">
            Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.
          </p>
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
            Learn more
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">
          <div className="liquid-glass rounded-2xl overflow-hidden">
            <img src={feature1} alt="Feature 1" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Row 2: Image left, Content right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-12 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col items-start">
          <h3 className="text-2xl md:text-3xl font-heading italic text-white mb-4 leading-tight">
            It gets smarter. Automatically.
          </h3>
          <p className="text-white/60 font-body font-light text-sm md:text-base mb-8 max-w-md">
            Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.
          </p>
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
            See how it works
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">
          <div className="liquid-glass rounded-2xl overflow-hidden">
            <img src={feature2} alt="Feature 2" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
