import { ArrowUpRight } from 'lucide-react'

const navLinks = ['Home', 'Services', 'Work', 'Process', 'Pricing']

function LogoMark() {
  return (
    <span className="font-heading italic text-white text-2xl tracking-tight select-none">
      Studio.
    </span>
  )
}

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <LogoMark />
      </div>

      {/* Center Nav */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1 gap-1">
        {navLinks.slice(0, -1).map((link) => (
          <a
            key={link}
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body hover:bg-white/90 transition-colors"
        >
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden">
        <a
          href="#"
          className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body"
        >
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  )
}
