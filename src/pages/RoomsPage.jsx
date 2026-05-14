import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import { useLanguage } from '../context/LanguageContext'
import ROOMS from '../data/rooms.json'

const ui = {
  en: { eyebrow: 'Accommodations', titleMain: 'Five Rooms,', titleItalic: 'One Alpine Soul', reserveBtn: 'Reservation' },
  de: { eyebrow: 'Unterkunft',     titleMain: 'Fünf Zimmer,', titleItalic: 'Eine Alpine Seele', reserveBtn: 'Reservierung' },
  fr: { eyebrow: 'Hébergement',    titleMain: 'Cinq Chambres,', titleItalic: 'Une Âme Alpine', reserveBtn: 'Réservation' },
  it: { eyebrow: 'Sistemazioni',   titleMain: 'Cinque Camere,', titleItalic: "Un'Anima Alpina", reserveBtn: 'Prenotazione' },
}

export default function RoomsPage() {
  const { lang } = useLanguage()
  const l = ui[lang] ?? ui.en

  return (
    <div className="min-h-screen bg-charcoal pt-28">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-wide-5 text-gold/70 mb-5">
            {l.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="section-title text-white">
            {l.titleMain}{' '}
            <span className="italic text-gold-light">{l.titleItalic}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="gold-divider mt-10" />
        </FadeIn>
      </div>

      {/* Room cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-4">
        {ROOMS.map((room, i) => {
          const isReversed = i % 2 === 1
          const name     = room[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ?? room.nameEn
          const beds     = room.beds[lang]  ?? room.beds.en
          const note     = room.note ? (room.note[lang] ?? room.note.en) : null
          const desc     = room[`desc${lang.charAt(0).toUpperCase() + lang.slice(1)}`] ?? room.descEn
          const features = room.features[lang] ?? room.features.en

          return (
            <FadeIn key={room.id} delay={0.1 * i} y={20} duration={1.4}>
              <div className="grid grid-cols-1 lg:grid-cols-2 group overflow-hidden">

                {/* Image */}
                <div
                  className={['relative overflow-hidden', isReversed ? 'lg:order-2' : ''].join(' ')}
                  style={{ height: '420px' }}
                >
                  <img
                    src={room.image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  {room.size && (
                    <div className="absolute top-6 left-6 bg-gold/90 px-3 py-1">
                      <p className="text-walnut text-[9px] tracking-wide-3 uppercase">{room.size} m²</p>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: 'rgba(28,15,0,1)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div
                  className={[
                    'flex flex-col justify-center px-10 lg:px-16 py-12 lg:py-0 bg-stone-900',
                    isReversed ? 'lg:order-1' : '',
                  ].join(' ')}
                >
                  {note && (
                    <p className="text-[9px] uppercase tracking-wide-4 text-gold/60 mb-2">{note}</p>
                  )}
                  <h3 className="font-serif text-3xl text-white mb-2">{name}</h3>
                  <p className="text-white/40 text-xs mb-6">{beds}</p>
                  <div className="gold-divider mx-0 mb-6" style={{ opacity: 0.4 }} />
                  <p className="text-white/50 leading-relaxed text-sm font-light mb-8">{desc}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="block w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                        <span className="text-white/40 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>

      {/* Reservation CTA */}
      <FadeIn delay={0.2}>
        <div className="flex justify-center py-20">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Link
              to="/reservation"
              className="text-[9px] uppercase tracking-wide-4 px-12 py-4 border border-gold/50 text-gold hover:bg-gold hover:text-walnut transition-colors duration-500 inline-block"
            >
              {l.reserveBtn}
            </Link>
          </motion.div>
        </div>
      </FadeIn>

    </div>
  )
}
