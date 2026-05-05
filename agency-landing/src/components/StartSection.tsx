import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import HlsVideo from './HlsVideo'

export default function StartSection() {
  return (
    <section className="relative overflow-hidden">
      {/* HLS Video Background */}
      <HlsVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, black, transparent)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center text-center px-6 py-32"
        style={{ minHeight: '500px', justifyContent: 'center' }}
      >
        {/* Badge */}
        <div className="liquid-glass rounded-full px-3.5 py-1 mb-6">
          <span className="text-white text-xs font-medium font-body">How It Works</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6 max-w-2xl">
          <BlurText text="You dream it. We ship it." delay={100} direction="bottom" splitBy="words" />
        </h2>

        {/* Subtext */}
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md mb-8">
          Share your vision. Our AI handles the rest—wireframes, design, code, launch. All in days, not quarters.
        </p>

        {/* CTA */}
        <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
