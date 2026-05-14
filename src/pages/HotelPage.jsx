import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import { useLanguage } from '../context/LanguageContext'

const HOTEL_HERO = 'https://static.wixstatic.com/media/c1734e_34444575e9ff43b2b46016202f23c667~mv2.jpg/v1/fill/w_2000,h_1200,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-hotel.jpg'
const HOTEL_ROOM = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/62851017.jpg?k=6707ac003eab1e84eca92ecb287133633d0e99ed290a43022ec7ad32a9ca67d8&o='

const FEATURES = [
  { en: '5 carefully renovated rooms',          de: '5 sorgfältig renovierte Zimmer',           fr: '5 chambres soigneusement rénovées',          it: '5 camere accuratamente ristrutturate' },
  { en: 'Hearty & rustic breakfast included',   de: 'Herzhaftes & rustikales Frühstück inbegriffen', fr: 'Petit-déjeuner copieux & rustique inclus',  it: 'Colazione abbondante & rustica inclusa' },
  { en: 'Walking distance to Gemsstock cable car', de: 'Fußläufig zur Gemsstock-Seilbahn',      fr: 'À pied du téléphérique du Gemsstock',        it: 'A piedi dalla funivia del Gemsstock' },
  { en: '2 min walk to town center',            de: '2 Minuten Fußweg ins Zentrum',              fr: '2 min à pied du centre-ville',               it: '2 min a piedi dal centro' },
  { en: 'Ski bus stop at the cable car station',de: 'Skibus-Haltestelle an der Seilbahn',        fr: 'Arrêt de bus de ski à la station du téléphérique', it: 'Fermata ski bus alla stazione della funivia' },
]

export default function HotelPage() {
  const { lang, t } = useLanguage()
  const h = t.hotel

  return (
    <div className="min-h-screen bg-alabaster">

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={HOTEL_HERO}
          alt="Hotel Zum Schwarzen Bären — Andermatt"
          className="w-full h-full object-cover"
          style={{ animation: 'subtleZoom 22s ease-in-out infinite alternate', transform: 'scale(1.05)' }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(28,15,0,0.30) 0%, rgba(28,15,0,0.65) 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="text-gold/80 text-[10px] uppercase tracking-wide-5 mb-6"
          >
            {t.location.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl text-white leading-none"
          >
            {h.titleMain}
            <br />
            <span className="italic text-gold-light">{h.titleItalic}</span>
          </motion.h1>
        </div>
        <style>{`@keyframes subtleZoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }`}</style>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <FadeIn>
              <p className="eyebrow mb-6">{h.eyebrow}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
                {h.titleMain}
                <br />
                <span className="italic text-gold-dark">{h.titleItalic}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="gold-divider mx-0 mb-8" />
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-graphite leading-relaxed text-base md:text-lg mb-10">
                {h.intro}
              </p>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col gap-3 mb-12">
                {FEATURES.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="block w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-graphite text-sm">
                      {feat[lang] ?? feat.en}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Link
                to="/rooms"
                className="group relative inline-block px-12 py-4 border border-gold text-gold-dark text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
              >
                <span className="relative z-10 group-hover:text-alabaster transition-colors duration-700">
                  {h.cta}
                </span>
                <span
                  className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>
          </div>

          {/* Image */}
          <FadeIn delay={0.2} y={32}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={HOTEL_ROOM}
                alt="Hotel Zum Schwarzen Bären — interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
