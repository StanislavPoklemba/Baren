import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'

export default function Interior() {
  const { t } = useLanguage()
  return (
    <div
      className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
      style={{ height: '36vh', minHeight: '240px', background: '#1C0F00' }}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(197,165,114,0.13) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom vignette for smooth transition to next section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, rgba(28,15,0,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      <FadeIn className="relative z-10">
        <p className="text-[10px] uppercase tracking-wide-5 text-gold/60 mb-8">
          {t.location.eyebrow}
        </p>
        <blockquote className="font-serif italic text-3xl md:text-5xl text-white/90 max-w-2xl leading-relaxed">
          "{t.interior.quote}"
        </blockquote>
        <div className="mx-auto mt-10 h-px w-16 bg-gold/40" />
      </FadeIn>
    </div>
  )
}
