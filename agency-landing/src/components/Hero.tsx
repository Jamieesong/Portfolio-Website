import { motion } from 'motion/react'
import { ArrowUpRight, Play } from 'lucide-react'
import BlurText from './BlurText'

const partners = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma']

export default function Hero() {
  return (
    <section
      className="relative overflow-visible"
      style={{ height: '1000px' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: '20%' }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: '300px',
          background: 'linear-gradient(to bottom, transparent, black)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ paddingTop: '150px' }}
      >
        {/* Badge */}
        <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">
            New
          </span>
          <span className="text-white/80 text-sm font-body pr-2">
            Introducing AI-powered web design.
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl tracking-[-4px] mb-6">
          <BlurText
            text="The Website Your Brand Deserves"
            delay={100}
            direction="bottom"
            splitBy="words"
          />
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-sm md:text-base text-white font-body font-light leading-tight max-w-md mb-8"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Stunning design. Blazing performance. Built by AI, refined by experts.
          This is web design, wildly reimagined.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="text-white font-body text-sm font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Play className="w-4 h-4 fill-white" />
            Watch the Film
          </button>
        </motion.div>

        {/* Partners */}
        <div className="mt-auto pt-16" style={{ marginTop: '80px' }}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="liquid-glass rounded-full px-3.5 py-1">
              <span className="text-white/60 text-xs font-body">
                Trusted by the teams behind
              </span>
            </div>
            <div className="flex items-center gap-12 md:gap-16 flex-wrap justify-center">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="text-2xl md:text-3xl font-heading italic text-white"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
