import FadeIn from './FadeIn'
import { useLanguage } from '../context/LanguageContext'

function About() {
  const { t } = useLanguage()
  const a = t.about

  const stats = [
    { number: '5',    label: { en: 'Intimate Rooms',     de: 'Intime Zimmer'    } },
    { number: '19th', label: { en: 'Century Heritage',   de: 'Jahrhundert Erbe' } },
    { number: '1444', label: { en: 'Metres Altitude',    de: 'Meter Höhe'       } },
    { number: '4',    label: { en: 'Alpine Passes Near', de: 'Nahe Alpenpässe'  } },
  ]
  const { lang } = useLanguage()

  return (
    <section
      id="history"
      className="relative bg-pearl py-28 md:py-40 overflow-hidden"
    >
      {/* Subtle gold wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(ellipse at bottom left, rgba(197,165,114,0.20), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image block */}
        <FadeIn duration={1.8} y={32} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/c1734e_34444575e9ff43b2b46016202f23c667~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-hotel.jpg"
              alt="Hotel Zum Schwarzen Bären — Andermatt"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Established badge */}
            <div className="absolute top-6 left-6 bg-gold px-4 py-2">
              <p className="text-walnut text-[9px] tracking-wide-4 uppercase font-medium">
                Est. 19th Century
              </p>
            </div>
          </div>

          {/* Small inset image */}
          <FadeIn delay={0.3} className="hidden lg:block">
            <div
              className="absolute -bottom-10 -right-8 w-48 h-48 overflow-hidden border-4 border-pearl shadow-2xl"
            >
              <img
                src="https://static.wixstatic.com/media/c1734e_0d99439a3ac1456a8bb3c814a50cf486~mv2.jpg/v1/fill/w_400,h_400,al_c,q_90,enc_avif,quality_auto/baeren-inset.jpg"
                alt="Zum Schwarzen Bären — detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
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
            <p className="text-graphite leading-relaxed text-base md:text-lg max-w-xl mb-10">
              {a.p2}
            </p>
          </FadeIn>

          {/* Innkeeper quote */}
          <FadeIn delay={0.65}>
            <div
              className="max-w-xl border-l-2 pl-6 mb-10"
              style={{ borderColor: 'rgba(197,165,114,0.45)' }}
            >
              <p className="font-serif italic text-graphite/70 text-[0.95rem] leading-relaxed">
                {a.innkeeperBio}
              </p>
            </div>
          </FadeIn>

          {/* Stats grid */}
          <FadeIn delay={0.78}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((s) => (
                <div key={s.number} className="border-l-2 border-gold/40 pl-4">
                  <p className="font-serif text-3xl text-charcoal">{s.number}</p>
                  <p className="text-[10px] tracking-wide-3 text-muted uppercase mt-1">
                    {s.label[lang]}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default About
