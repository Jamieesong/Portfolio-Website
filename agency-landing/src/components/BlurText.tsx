import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  direction?: 'bottom' | 'top'
  splitBy?: 'words' | 'letters'
}

export default function BlurText({
  text,
  className = '',
  delay = 200,
  direction = 'bottom',
  splitBy = 'words',
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const elements = splitBy === 'words' ? text.split(' ') : text.split('')

  return (
    <span ref={ref} className={`inline ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: splitBy === 'words' ? '0.25em' : '0' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'bottom' ? 50 : -50 }}
          animate={
            inView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: direction === 'bottom' ? 50 : -50 }
          }
          transition={{
            delay: (i * delay) / 1000,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {el}
        </motion.span>
      ))}
    </span>
  )
}
