import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'

const WIX = (id, w = 900, h = 700) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/photo.jpg`

const MOMENTS = [
  {
    id: 1,
    category:   'Hotel · Zimmer',
    categoryDe: 'Hotel · Zimmer',
    name:        'Unsere Zimmer',
    description: 'Five cozy rooms in our lovingly renovated historic wooden house. Each one carefully appointed — spaces that ask nothing of you but to rest.',
    descriptionDe: 'Fünf gemütliche Zimmer in unserem gefühlvoll renovierten Holzhaus. Jedes sorgfältig eingerichtet — Räume, die nichts verlangen außer zu ruhen.',
    price:       null,
    image:       WIX('c1734e_66ebe278179647f49604291cc1f12012~mv2.jpg'),
  },
  {
    id: 2,
    category:   'Restaurant · Interior',
    categoryDe: 'Restaurant · Interieur',
    name:        'La Cucina',
    description: 'We take you on a culinary journey to Italy. Visit us for an aperitif, a light meal, or a fine coffee. Wednesday through Sunday from 15:00.',
    descriptionDe: 'Wir nehmen Sie mit auf eine kulinarische Reise nach Italien. Besuchen Sie uns für einen Apero, eine Kleinigkeit oder einen feinen Kaffee. Mi–So ab 15:00.',
    price:       null,
    image:       WIX('c1734e_a8b9b1534c2746f096e096f75817ae94~mv2.jpg'),
  },
  {
    id: 3,
    category:   'Hotel · Rooms',
    categoryDe: 'Hotel · Zimmer',
    name:        'Five Rooms to Stay & Fall in Love',
    description: 'In our carefully renovated wooden house you will find five cozy rooms to stay and fall in love with. A warm welcome awaits.',
    descriptionDe: 'In unserem gefühlvoll renovierten Holzhaus befinden sich fünf gemütliche Zimmer zum Verweilen und Verlieben.',
    price:       null,
    image:       WIX('c1734e_8f2c2660548040f08989e749c7aaf776~mv2.jpg'),
  },
  {
    id: 4,
    category:   'Restaurant · Atmosphere',
    categoryDe: 'Restaurant · Atmosphäre',
    name:        'The Dining Room',
    description: 'Our restaurant is open Wednesday through Sunday from 15:00. The kitchen serves from 18:00 to 21:00. We warmly recommend a reservation.',
    descriptionDe: 'Unser Restaurant ist Mittwoch bis Sonntag ab 15:00 geöffnet. Die Küche serviert von 18:00 bis 21:00. Wir empfehlen eine Reservierung.',
    price:       null,
    image:       WIX('c1734e_b607134630c2495bb220db3b6023e577~mv2.jpg'),
  },
  {
    id: 5,
    category:   'Hotel · Comfort',
    categoryDe: 'Hotel · Komfort',
    name:        'A Home in the Alps',
    description: 'Andermatt sits at 1444 m — where four great Alpine passes meet. Our renovated timber house has welcomed guests for many generations.',
    descriptionDe: 'Andermatt liegt auf 1444 m — wo vier große Alpenpässe zusammentreffen. Unser renoviertes Holzhaus empfängt seit vielen Generationen Gäste.',
    price:       null,
    image:       WIX('c1734e_f9f15692f0244382b67fb9233028af88~mv2.jpg'),
  },
  {
    id: 6,
    category:   'Restaurant · Italian Soul',
    categoryDe: 'Restaurant · Italienische Seele',
    name:        'Una Cucina Italiana',
    description: 'A culinary journey to Italy — right in the heart of the Swiss Alps. Crafted with care, served with warmth.',
    descriptionDe: 'Eine kulinarische Reise nach Italien — mitten im Herzen der Schweizer Alpen. Mit Sorgfalt zubereitet, mit Herzlichkeit serviert.',
    price:       null,
    image:       WIX('c1734e_a408470c3acc43c2974d7b8b8e9931e4~mv2.jpg'),
  },
  {
    id: 7,
    category:   'Andermatt · Switzerland',
    categoryDe: 'Andermatt · Schweiz',
    name:        'Zum Schwarzen Bären',
    description: 'The house has known many hands and many seasons. What remains constant is the warmth of the hearth and the weight of the timber above.',
    descriptionDe: 'Das Haus kennt viele Hände und viele Jahreszeiten. Was konstant bleibt, ist die Wärme des Kamins und das Gewicht des Holzes darüber.',
    price:       null,
    image:       WIX('c1734e_1ff8d6a3eccf45cf834ef987934f7b29~mv2.jpg'),
  },
  {
    id: 8,
    category:   'Hotel · Wooden House',
    categoryDe: 'Hotel · Holzhaus',
    name:        'Historic Timber House',
    description: 'Our historically renovated wooden house stands in the heart of Andermatt — a testament to generations of alpine craftsmanship and hospitality.',
    descriptionDe: 'Unser historisch renoviertes Holzhaus steht im Herzen von Andermatt — Zeugnis von Generationen alpiner Handwerkskunst und Gastfreundschaft.',
    price:       null,
    image:       WIX('c1734e_751c9c7de528419f934004c98997a559~mv2.jpg'),
  },
  {
    id: 9,
    category:   'Restaurant · Team',
    categoryDe: 'Restaurant · Team',
    name:        'Johan Granvik & Team',
    description: 'Under the stewardship of Val Ursera Hospitality AG and Johan Granvik, we carry on the tradition of this house with passion and dedication.',
    descriptionDe: 'Unter der Leitung der Val Ursera Hospitality AG und Johan Granvik führen wir die Tradition dieses Hauses mit Leidenschaft weiter.',
    price:       null,
    image:       WIX('c1734e_78c0fff99b154611a7fbbb82dceb69af~mv2.jpg'),
  },
  {
    id: 10,
    category:   'Hotel · Andermatt',
    categoryDe: 'Hotel · Andermatt',
    name:        'The Heart of the Alps',
    description: 'Where four great passes converge — Gotthard, Furka, Oberalp, Susten. Andermatt at 1444 m, wrapped in mountains on every side.',
    descriptionDe: 'Wo vier große Pässe zusammenlaufen — Gotthard, Furka, Oberalp, Susten. Andermatt auf 1444 m, von Bergen auf allen Seiten umgeben.',
    price:       null,
    image:       WIX('c1734e_e428afcc216e45fe94c850754aaa3a43~mv2.jpg'),
  },
]

const slideVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
}

const imageVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, scale: 1.04 }),
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, scale: 1.04, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
}

function Gallery() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const { lang, t } = useLanguage()
  const g = t.gallery
  const total = MOMENTS.length
  const item  = MOMENTS[index]

  const go = (n) => {
    const next = (n + total) % total
    setDirection(next === (index + 1) % total ? 1 : -1)
    setIndex(next)
  }
  const paginate = (delta) => go(index + delta)

  return (
    <section
      id="gallery"
      className="relative pt-28 pb-14 md:pt-40 md:pb-20 bg-pearl overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at bottom right, rgba(197,165,114,0.08), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <FadeIn className="text-center mb-20">
          <p className="eyebrow mb-6" style={{ color: '#A8895A' }}>{g.eyebrow}</p>
          <h2 className="section-title">
            {g.titleMain}{' '}
            <span className="italic text-gold-dark">{g.titleItalic}</span>
          </h2>
          <div className="gold-divider mt-10" />
          <p className="mt-8 max-w-xl mx-auto leading-relaxed text-[0.9rem] text-charcoal">
            {g.intro}
          </p>
        </FadeIn>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-0 min-h-[520px]"
          >
            {/* Image */}
            <motion.div
              custom={direction}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative overflow-hidden"
              style={{ height: '520px' }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent 70%, rgba(245,240,232,0.75) 100%)' }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Text */}
            <div className="flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-0 bg-alabaster">
              <p className="text-[10px] uppercase tracking-wide-4 mb-6" style={{ color: '#A8895A' }}>
                {lang === 'de' ? item.categoryDe : item.category}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-6 text-charcoal">
                {item.name}
              </h3>
              <div className="gold-divider mb-8" style={{ opacity: 0.5 }} />
              <p className="leading-relaxed text-sm md:text-base mb-8 text-charcoal">
                {lang === 'de' ? item.descriptionDe : item.description}
              </p>
              {item.price && (
                <p className="font-serif text-lg text-gold">{item.price}</p>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-8 mt-12">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous"
                  className="group flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
                >
                  <svg width="32" height="1" viewBox="0 0 32 1" className="overflow-visible">
                    <line x1="32" y1="0.5" x2="0" y2="0.5" stroke="#A8895A" strokeWidth="0.8" />
                    <polyline points="8,0.5 0,0.5 8,-6.5" fill="none" stroke="#A8895A" strokeWidth="0.8" />
                  </svg>
                  <span className="text-[10px] uppercase tracking-wide-3" style={{ color: '#A8895A' }}>Prev</span>
                </button>

                <div className="flex items-center gap-2">
                  {MOMENTS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Go to item ${i + 1}`}
                      style={{
                        width:      i === index ? '20px' : '6px',
                        height:     '1px',
                        background: i === index ? '#A8895A' : 'rgba(168,137,90,0.3)',
                        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next"
                  className="group flex items-center gap-3 hover:opacity-60 transition-opacity duration-300"
                >
                  <span className="text-[10px] uppercase tracking-wide-3" style={{ color: '#A8895A' }}>Next</span>
                  <svg width="32" height="1" viewBox="0 0 32 1" className="overflow-visible">
                    <line x1="0" y1="0.5" x2="32" y2="0.5" stroke="#A8895A" strokeWidth="0.8" />
                    <polyline points="24,0.5 32,0.5 24,-6.5" fill="none" stroke="#A8895A" strokeWidth="0.8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
