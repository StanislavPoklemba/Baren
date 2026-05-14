import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'
import winesData from '../data/wines.json'

const TABS = [
  { key: 'glass',     en: 'By the Glass', de: 'Offene Weine' },
  { key: 'sparkling', en: 'Sparkling',    de: 'Schaumweine'  },
  { key: 'white',     en: 'White',        de: 'Weiss'        },
  { key: 'rose',      en: 'Rosé',         de: 'Rosé'         },
  { key: 'red',       en: 'Red',          de: 'Rot'          },
  { key: 'sweet',     en: 'Sweet',        de: 'Süssweine'    },
]

function WineRow({ wine, isLast }) {
  const meta = [wine.vintage, wine.vol].filter(Boolean).join(' · ')
  const sub  = [wine.grape, wine.producer].filter(Boolean).join(' · ')
  return (
    <>
      <div className="flex items-start justify-between gap-6 py-4">
        <div className="flex-1 min-w-0">
          {wine.region && (
            <p className="text-[10px] uppercase tracking-wide-3 mb-0.5 text-gold-dark opacity-70">
              {wine.region}{meta ? ` · ${meta}` : ''}
            </p>
          )}
          {!wine.region && wine.type && (
            <p className="text-[10px] uppercase tracking-wide-3 mb-0.5 text-gold-dark opacity-70">
              {wine.type}{meta ? ` · ${meta}` : ''}
            </p>
          )}
          {!wine.region && !wine.type && meta && (
            <p className="text-[10px] uppercase tracking-wide-3 mb-0.5 text-gold-dark opacity-70">{meta}</p>
          )}
          <p className="font-serif text-[1.05rem] leading-snug text-charcoal">{wine.name}</p>
          {sub && <p className="text-[11px] mt-0.5 text-graphite">{sub}</p>}
        </div>
        <div className="flex-shrink-0 text-right pt-[1px]">
          <span className="font-serif text-[0.7rem] tracking-wide-2 mr-1 text-gold">CHF</span>
          <span className="font-serif text-lg text-charcoal">{wine.price}</span>
        </div>
      </div>
      {!isLast && <div className="h-px bg-line" />}
    </>
  )
}

export default function Wines() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState('glass')
  const w = t.wines

  const items = winesData[active === 'glass' ? 'byGlass' : active] || []

  return (
    <section id="wines" className="bg-pearl py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">

        <FadeIn>
          <p className="eyebrow mb-5">{w.eyebrow}</p>
          <h2 className="section-title mb-3">
            {w.titleMain}{' '}
            <span className="italic text-gold-dark">{w.titleItalic}</span>
          </h2>
          <div className="gold-divider mx-0 mb-12" />
        </FadeIn>

        {/* Category tabs */}
        <FadeIn>
          <div className="flex gap-6 overflow-x-auto pb-0 mb-10 border-b border-line">
            {TABS.map((tab) => {
              const isActive = active === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className="relative flex-shrink-0 pb-4 text-[11px] uppercase tracking-wide-3 transition-colors duration-500"
                  style={{ color: isActive ? '#A8895A' : '#706B65' }}
                >
                  {lang === 'de' ? tab.de : tab.en}
                  <span
                    className="absolute bottom-0 left-0 h-px bg-gold transition-all duration-700"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Wine list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((wine, i) => (
              <WineRow key={wine.id} wine={wine} isLast={i === items.length - 1} />
            ))}
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.2} className="mt-10 pt-8 border-t border-line">
          <p className="text-[10px] uppercase tracking-wide-3 text-graphite text-center">
            Alle Preise in CHF · inkl. MwSt
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
