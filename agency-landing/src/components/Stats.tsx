import BlurText from './BlurText'
import HlsVideo from './HlsVideo'

const stats = [
  { value: '200+', label: 'Sites launched' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '5 days', label: 'Average delivery' },
]

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* HLS Video Background (desaturated) */}
      <HlsVideo
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0)' }}
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
      <div className="relative z-20 px-6 lg:px-16 flex items-center justify-center min-h-[400px]">
        <div className="liquid-glass rounded-3xl p-12 md:p-16 w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.value} className="flex flex-col items-center gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">
                  {stat.value}
                </span>
                <span className="text-white/60 font-body font-light text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
