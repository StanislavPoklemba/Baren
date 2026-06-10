import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Interior from '../components/Interior'
import FadeIn from '../components/FadeIn'
import { useLanguage } from '../context/LanguageContext'

const HOTEL_IMG      = 'https://static.wixstatic.com/media/c1734e_34444575e9ff43b2b46016202f23c667~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-hotel.jpg'
const TEAM_IMG       = 'https://www.gaultmillau.ch/fp/2048/1152/1500/1000/sites/default/files/media/field_image/2022-05/v.l._chef_johan_granvik_partnerin_michaela_kuckova_unser_ka_14chenchef_daniel_schiavetta.jpg'
const RESTAURANT_IMG = 'https://static.wixstatic.com/media/c1734e_b2e6acd0215547e5a8e4b981548c66a4~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_90,enc_avif,quality_auto/baeren-restaurant.jpg'

function AboutSection() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="relative bg-pearl py-8 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'radial-gradient(ellipse at bottom left, rgba(197,165,114,0.20), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image block */}
        <FadeIn duration={1.8} y={32} className="relative">
          <div className="relative aspect-[3/2] overflow-hidden" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
            <img
              src={TEAM_IMG}
              alt="Hotel Zum Schwarzen Bären — Andermatt"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </FadeIn>

        {/* Text block */}
        <div className="lg:pl-8">
          <FadeIn delay={0.1}>
            <p className="eyebrow mb-6">{a.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="section-title mb-10">
              {a.titleMain}{' '}
              <span className="italic text-gold-dark">{a.titleItalic}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="gold-divider mx-0 mb-10" />
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-graphite leading-relaxed text-base md:text-lg max-w-xl mb-6">
              {a.p1}
            </p>
          </FadeIn>
          <FadeIn delay={0.52}>
            <p className="text-graphite leading-relaxed text-base md:text-lg max-w-xl">
              {a.p2}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  const { t } = useLanguage()
  const s = t.story

  const paragraphs = s.quote.split('\n\n').filter(Boolean)

  return (
    <section className="relative bg-walnut py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(197,165,114,0.06), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <FadeIn>
          <p className="text-[9px] uppercase tracking-wide-5 text-gold/60 mb-10">{s.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="text-gold/30 text-4xl mb-8" aria-hidden="true">❝</div>
        </FadeIn>
        {paragraphs.map((para, i) => (
          <FadeIn key={i} delay={0.15 + i * 0.08}>
            <p className="font-serif italic text-white/75 text-base md:text-lg leading-relaxed mb-6 last:mb-0">
              {para}
            </p>
          </FadeIn>
        ))}
        <FadeIn delay={0.6}>
          <div className="text-gold/30 text-4xl mt-10" aria-hidden="true">❞</div>
          <p className="mt-6 text-[10px] uppercase tracking-wide-4 text-gold/60">
            {s.signature}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function HotelRestaurantPreview() {
  const { t } = useLanguage()
  const h = t.hotel
  const r = t.restaurant

  return (
    <section className="relative bg-alabaster py-0">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Hotel card */}
        <div className="relative overflow-hidden group" style={{ minHeight: '520px' }}>
          <img
            src={HOTEL_IMG}
            alt="Hotel Zum Schwarzen Bären"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to top, rgba(28,15,0,0.85) 0%, rgba(28,15,0,0.40) 50%, rgba(28,15,0,0.20) 100%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <p className="text-[11px] uppercase tracking-wide-5 text-gold mb-3">{h.eyebrow}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              {h.titleMain}
              <br />
              <span className="italic text-gold-light">{h.titleItalic}</span>
            </h3>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-8 max-w-sm">
              {h.intro}
            </p>
            <Link
              to="/hotel"
              className="group relative inline-block self-start px-8 py-3 border border-gold/60 text-gold text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
            >
              <span className="relative z-10 group-hover/btn:text-walnut transition-colors duration-700">
                {h.cta}
              </span>
              <span
                className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-700 ease-silk"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Restaurant card */}
        <div className="relative overflow-hidden group" style={{ minHeight: '520px' }}>
          <img
            src={RESTAURANT_IMG}
            alt="Restaurant Zum Schwarzen Bären"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: 'linear-gradient(to top, rgba(28,15,0,0.85) 0%, rgba(28,15,0,0.40) 50%, rgba(28,15,0,0.20) 100%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <p className="text-[11px] uppercase tracking-wide-5 text-gold mb-3">{r.eyebrow}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              {r.titleMain}
              <br />
              <span className="italic text-gold-light">{r.titleItalic}</span>
            </h3>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-8 max-w-sm">
              {r.intro}
            </p>
            <Link
              to="/restaurant"
              className="group relative inline-block self-start px-8 py-3 border border-gold/60 text-gold text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
            >
              <span className="relative z-10 group-hover/btn:text-walnut transition-colors duration-700">
                {r.menuCta}
              </span>
              <span
                className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-700 ease-silk"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Interior />
      <AboutSection />
      <StorySection />
      <HotelRestaurantPreview />
    </>
  )
}
