import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import HlsVideo from './HlsVideo'

export default function CtaFooter() {
  return (
    <section className="relative overflow-hidden">
      {/* HLS Video Background */}
      <HlsVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
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

      {/* CTA Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 py-40">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] mb-6 max-w-3xl">
          <BlurText text="Your next website starts here." delay={100} direction="bottom" splitBy="words" />
        </h2>

        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md mb-10">
          Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
            Book a Call
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body hover:bg-white/90 transition-colors">
            View Pricing
          </button>
        </div>

        {/* Footer Bar */}
        <div className="mt-32 pt-8 border-t border-white/10 w-full max-w-6xl flex items-center justify-between">
          <p className="text-white/40 text-xs font-body">
            © 2026 Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-white/40 text-xs font-body hover:text-white/60 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
