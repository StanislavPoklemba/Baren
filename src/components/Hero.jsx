import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const ease = [0.22, 1, 0.36, 1]
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image */}
      <img
        src="https://static.wixstatic.com/media/c1734e_8452e37f39654d0d8fcf61646259e369~mv2.jpg/v1/fill/w_2400,h_1400,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-hero.jpg"
        alt="Zum Schwarzen Bären — Andermatt"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ animation: 'subtleZoom 22s ease-in-out infinite alternate' }}
        loading="eager"
        fetchpriority="high"
      />

      {/* Layered overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(28,15,0,0.45) 0%, rgba(28,15,0,0.25) 45%, rgba(28,15,0,0.70) 75%, #1C0F00 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(28,15,0,0.25) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          className="text-gold/80 text-[10px] md:text-[11px] uppercase tracking-wide-5 mb-10"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease, delay: 0.6 }}
          className="font-serif text-mega text-white leading-none"
        >
          ZUM SCHWARZEN
          <br />
          <span className="italic text-gold-light">BÄREN</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.2 }}
          className="font-serif italic text-lg md:text-xl text-white/60 mt-5 tracking-wide"
        >
          Boutique Hotel &amp; Ristorante · Andermatt
        </motion.p>

        {/* Gold line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, ease, delay: 1.6 }}
          className="mx-auto mt-12 h-px w-24 bg-gold origin-center"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 1.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/hotel"
            className="group relative inline-flex items-center justify-center w-44 py-4 border border-gold text-gold text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
          >
            <span className="relative z-10 group-hover:text-walnut transition-colors duration-700">
              {t.hero.cta}
            </span>
            <span
              className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
              aria-hidden="true"
            />
          </a>

          <a
            href="/restaurant"
            className="group relative inline-flex items-center justify-center w-44 py-4 border border-gold text-gold text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
          >
            <span className="relative z-10 group-hover:text-walnut transition-colors duration-700">
              {t.hero.ctaAlt}
            </span>
            <span
              className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 2.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-gold/60" />
      </motion.div>

      <style>{`
        @keyframes subtleZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
      `}</style>
    </section>
  )
}

export default Hero
