import FadeIn from "./FadeIn";
import menuData from "../data/menu.json";
import { useLanguage } from "../context/LanguageContext";

function MenuCategory({ category, baseDelay = 0, lang }) {
  const title =
    lang === "de" && category.titleDe ? category.titleDe : category.title;

  return (
    <div className="mb-20 last:mb-0">
      <FadeIn delay={baseDelay} className="text-center mb-14">
        <p className="eyebrow mb-3">{title}</p>
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal">
          {title}
        </h3>
        <div className="gold-divider mt-6" />
      </FadeIn>

      <ul className="space-y-10 max-w-3xl mx-auto">
        {category.items.map((item, idx) => (
          <FadeIn
            key={item.id}
            as="li"
            delay={baseDelay + 0.08 * idx}
            y={14}
            duration={1.2}
          >
            <div className="flex items-baseline gap-4">
              <h4 className="font-serif text-lg md:text-xl text-charcoal flex items-center gap-2">
                {item.name}
                {item.tag && (
                  <span className="text-[10px] uppercase tracking-widest text-gold-dark border border-gold/50 px-1.5 py-0.5">
                    {item.tag}
                  </span>
                )}
              </h4>
              <span
                className="flex-1 border-b border-dotted border-line/80 translate-y-[-4px]"
                aria-hidden="true"
              />
              <span className="font-serif text-lg md:text-xl text-gold-dark whitespace-nowrap">
                {item.price}
              </span>
            </div>
            <p className="mt-3 text-graphite leading-relaxed text-sm md:text-base font-light">
              {lang === "de" && item.descriptionDe
                ? item.descriptionDe
                : item.description}
            </p>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}

function Restaurant() {
  const { starters, mainCourses, desserts } = menuData.alaCarte;
  const { lang, t } = useLanguage();
  const r = t.restaurant;

  return (
    <section id="restaurant" className="relative bg-alabaster">
      {/* Intro hero panel */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="https://static.wixstatic.com/media/c1734e_b2e6acd0215547e5a8e4b981548c66a4~mv2.jpg/v1/fill/w_2000,h_900,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-restaurant.jpg"
          alt="Restaurant Zum Schwarzen Bären — Andermatt"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(28,15,0,0.35) 0%, rgba(28,15,0,0.70) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-wide-5 text-gold/80 mb-5">
              {r.eyebrow}
            </p>
            <h2 className="font-serif text-5xl md:text-7xl text-white leading-none">
              {r.titleMain}
              <br />
              <span className="italic text-gold-light">{r.titleItalic}</span>
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Story + hours */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <FadeIn>
            <p className="text-graphite leading-relaxed text-base md:text-lg font-light">
              {r.intro}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-graphite leading-relaxed text-base font-light mb-8">
              {r.p2}
            </p>
            {/* Hours card */}
            <div className="border border-line p-6 bg-cream/50">
              <p className="text-[9px] uppercase tracking-wide-4 text-graphite mb-4">
                Opening Hours
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    day: { en: "Monday — Tuesday", de: "Montag — Dienstag" },
                    time: { en: "Closed", de: "Geschlossen" },
                    closed: true,
                  },
                  {
                    day: { en: "Wednesday — Sunday", de: "Mittwoch — Sonntag" },
                    time: "15:00 – 22:00",
                  },
                  {
                    day: { en: "Kitchen", de: "Küche" },
                    time: "18:00 – 21:00",
                  },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-graphite text-sm">
                      {typeof h.day === "object" ? h.day[lang] : h.day}
                    </span>
                    <span
                      className={[
                        "text-sm font-medium",
                        h.closed ? "text-muted/60" : "text-charcoal",
                      ].join(" ")}
                    >
                      {typeof h.time === "object" ? h.time[lang] : h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Menu */}
        <MenuCategory category={starters} baseDelay={0.05} lang={lang} />
        <MenuCategory category={mainCourses} baseDelay={0.1} lang={lang} />
        <MenuCategory category={desserts} baseDelay={0.15} lang={lang} />

        <FadeIn delay={0.2} className="text-center mt-20">
          <p className="text-[10px] uppercase tracking-wide-3 text-graphite">
            {r.footer}
          </p>
          <div className="mt-8">
            <a
              href="mailto:Info@baeren-andermatt.ch"
              className="group relative inline-block px-12 py-4 border border-gold text-gold-dark text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
            >
              <span className="relative z-10 group-hover:text-alabaster transition-colors duration-700">
                {lang === "de" ? "Tisch reservieren" : "Reserve a Table"}
              </span>
              <span
                className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
                aria-hidden="true"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Restaurant;
