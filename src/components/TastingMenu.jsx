import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'

const ROOMS = [
  {
    id: 1,
    name: 'Gipfelzimmer',
    subtitle:   { en: 'The Summit Room',      de: 'Das Gipfelzimmer'     },
    size: '38 m²',
    description: {
      en: 'Our most elevated room commands an uninterrupted panorama of the Gemsstock massif. A heritage fireplace, hand-loomed linens and a king-sized bed make this the natural choice for those who come to Andermatt to feel the full weight of the mountains.',
      de: 'Unser erhabenster Raum bietet ein unverbautes Panorama des Gemsstockmassivs. Ein historischer Kamin, handgewebte Leinentücher und ein Kingsize-Bett — die natürliche Wahl für all jene, die die volle Wucht der Berge spüren möchten.',
    },
    features: {
      en: ['King-size bed', 'Mountain panorama', 'Heritage fireplace', 'Rainfall shower'],
      de: ['Kingsize-Bett', 'Bergpanorama', 'Historischer Kamin', 'Regendusche'],
    },
    image: 'https://static.wixstatic.com/media/c1734e_749fb3370ef84778be104bbfcff169e3~mv2.jpg/v1/fill/w_1400,h_900,al_c,q_90,enc_avif,quality_auto/photo.jpg',
    price: { en: 'from CHF 260 / night', de: 'ab CHF 260 / Nacht' },
  },
  {
    id: 2,
    name: 'Bärensuite',
    subtitle:   { en: 'The Bear Suite',       de: 'Die Bärensuite'       },
    size: '32 m²',
    description: {
      en: 'Named for the black bear that has guarded Andermatt for centuries. Deep walnut panelling, a cast-iron claw-foot bath, hand-stitched wool throws, and a valley view that turns amber at dusk.',
      de: 'Benannt nach dem Schwarzen Bären, der Andermatt seit Jahrhunderten bewacht. Dunkle Walnusspaneele, eine gusseiserne Freistehebadewanne, handgenähte Wolldecken und ein Talblick, der in der Dämmerung golden leuchtet.',
    },
    features: {
      en: ['Queen-size bed', 'Valley view', 'Claw-foot bath', 'Walnut panelling'],
      de: ['Queensize-Bett', 'Talblick', 'Freistehebadewanne', 'Walnusspaneele'],
    },
    image: 'https://static.wixstatic.com/media/c1734e_40805ca08fbc4309ad74128667085f95~mv2.jpg/v1/fill/w_1400,h_900,al_c,q_90,enc_avif,quality_auto/photo.jpg',
    price: { en: 'from CHF 220 / night', de: 'ab CHF 220 / Nacht' },
  },
  {
    id: 3,
    name: 'Alpenrose',
    subtitle:   { en: 'The Alpine Rose Room', de: 'Das Alpenrose-Zimmer' },
    size: '26 m²',
    description: {
      en: 'Named for the rhododendron that carpets the slopes above 1800 m each June. A private terrace opens onto the garden; soft rose-toned linen and open shutters let the mountain air do the rest.',
      de: 'Benannt nach dem Rhododendron, der jeden Juni die Hänge über 1800 m bedeckt. Eine private Terrasse öffnet sich zum Garten; zartes Rosenleinen und offene Fensterläden lassen die Bergluft den Rest tun.',
    },
    features: {
      en: ['Double bed', 'Private garden terrace', 'Walk-in shower', 'Mountain views'],
      de: ['Doppelbett', 'Private Gartenterrasse', 'Begehbare Dusche', 'Bergblick'],
    },
    image: 'https://static.wixstatic.com/media/c1734e_b35e0969b7dc4b2f86b05782e412e081~mv2.jpg/v1/fill/w_1400,h_900,al_c,q_90,enc_avif,quality_auto/photo.jpg',
    price: { en: 'from CHF 195 / night', de: 'ab CHF 195 / Nacht' },
  },
  {
    id: 4,
    name: 'Gotthardstube',
    subtitle:   { en: 'The Gotthard Room',    de: 'Die Gotthardstube'    },
    size: '24 m²',
    description: {
      en: 'Named for the great pass that has connected north and south since the Middle Ages. Exposed timber beams, a writing desk, and a window that frames the evening light as it moves slowly across the valley floor.',
      de: 'Benannt nach dem großen Pass, der Norden und Süden seit dem Mittelalter verbindet. Freiliegende Holzbalken, ein Schreibtisch und ein Fenster, das das Abendlicht einfängt, wenn es langsam über den Talboden zieht.',
    },
    features: {
      en: ['Double bed', 'Valley window', 'Exposed beams', 'Writing desk'],
      de: ['Doppelbett', 'Talfenster', 'Freiliegende Balken', 'Schreibtisch'],
    },
    image: 'https://static.wixstatic.com/media/c1734e_a2fbf34a94f847dabb557f5fa05ff74a~mv2.jpg/v1/fill/w_1400,h_900,al_c,q_90,enc_avif,quality_auto/photo.jpg',
    price: { en: 'from CHF 175 / night', de: 'ab CHF 175 / Nacht' },
  },
  {
    id: 5,
    name: 'Urner Kammer',
    subtitle:   { en: 'The Uri Chamber',      de: 'Die Urner Kammer'     },
    size: '20 m²',
    description: {
      en: 'Our most intimate room — a quiet cell at the heart of the house. Low ceilings, a carved wooden bed, and a small window onto the inner courtyard. For those who come to the mountains to think.',
      de: 'Unser intimstes Zimmer — eine stille Kammer im Herzen des Hauses. Niedrige Decken, ein geschnitztes Holzbett und ein kleines Fenster mit Blick auf den Innenhof. Für all jene, die in die Berge kommen, um nachzudenken.',
    },
    features: {
      en: ['Single or double', 'Courtyard view', 'Carved wooden bed', 'Ensuite shower'],
      de: ['Einzel oder Doppel', 'Innenhofblick', 'Geschnitztes Holzbett', 'Eigenes Bad'],
    },
    image: 'https://static.wixstatic.com/media/c1734e_2cf07e541d20461d8844c3a59867735a~mv2.jpg/v1/fill/w_1400,h_900,al_c,q_90,enc_avif,quality_auto/photo.jpg',
    price: { en: 'from CHF 150 / night', de: 'ab CHF 150 / Nacht' },
  },
]

function Rooms() {
  const { lang, t } = useLanguage()
  const r = t.rooms

  return (
    <section
      id="rooms"
      className="relative bg-charcoal py-28 md:py-40 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-wide-5 text-gold/70 mb-5">{r.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title text-white">
            {r.titleMain}{' '}
            <span className="italic text-gold-light">{r.titleItalic}</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="gold-divider mt-10" />
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-8 text-white/50 max-w-xl mx-auto leading-relaxed text-sm font-light">
            {r.intro}
          </p>
        </FadeIn>
      </div>

      {/* Room cards — alternating layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-4">
        {ROOMS.map((room, i) => {
          const isReversed = i % 2 === 1
          return (
            <FadeIn key={room.id} delay={0.1 * i} y={20} duration={1.4}>
              <div
                className={[
                  'grid grid-cols-1 lg:grid-cols-2 group overflow-hidden',
                ].join(' ')}
              >
                {/* Image */}
                <div
                  className={[
                    'relative overflow-hidden',
                    isReversed ? 'lg:order-2' : '',
                  ].join(' ')}
                  style={{ height: '420px' }}
                >
                  <img
                    src={room.image}
                    alt={`${room.name} — ${room.subtitle[lang]}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Size badge */}
                  <div className="absolute top-6 left-6 bg-gold/90 px-3 py-1">
                    <p className="text-walnut text-[9px] tracking-wide-3 uppercase">{room.size}</p>
                  </div>
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: 'rgba(28,15,0,1)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div
                  className={[
                    'flex flex-col justify-center px-10 lg:px-16 py-12 lg:py-0',
                    'bg-stone-900',
                    isReversed ? 'lg:order-1' : '',
                  ].join(' ')}
                >
                  <p className="text-[9px] uppercase tracking-wide-4 text-gold/60 mb-2">
                    {room.subtitle[lang]}
                  </p>
                  <h3 className="font-serif text-3xl text-white mb-6">{room.name}</h3>

                  <div className="gold-divider mx-0 mb-6" style={{ opacity: 0.4 }} />

                  <p className="text-white/50 leading-relaxed text-sm font-light mb-8">
                    {room.description[lang]}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {room.features[lang].map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="block w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                        <span className="text-white/40 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="font-serif text-gold text-lg">{room.price[lang]}</p>
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="text-[9px] uppercase tracking-wide-4 px-8 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-walnut transition-colors duration-500"
                    >
                      {r.bookLabel}
                    </motion.a>
                  </div>
                </div>
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}

export default Rooms
