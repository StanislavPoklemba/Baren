import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";
import { useLanguage } from "../context/LanguageContext";
import menuData from "../data/menu.json";
import winesData from "../data/wines.json";

const RESTAURANT_HERO =
  "https://static.wixstatic.com/media/c1734e_b2e6acd0215547e5a8e4b981548c66a4~mv2.jpg/v1/fill/w_2000,h_900,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/baeren-restaurant.jpg";
const CHEF_PHOTO =
  "https://www.gaultmillau.ch/fp/400/400/500/500/sites/default/files/media/field_image/2022-10/daniel_schiavetta.jpg";

// ─── Menu helpers ────────────────────────────────────────────────────────────

function MenuItemRow({ name, price, isLast }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 py-3">
        <span className="font-serif text-lg text-charcoal leading-snug">
          {name}
        </span>
        <span className="font-serif text-lg text-gold-dark whitespace-nowrap">
          {price ? `CHF ${price}` : ""}
        </span>
      </div>
      
    </>
  );
}

function TastingMenuCard({ menu }) {
  const { lang, t } = useLanguage();
  const desc = menu.description ? menu.description[lang] ?? menu.description.en : null;
  return (
    <FadeIn>
      <div className="border-t border-line pt-8 md:pt-10 pb-8 md:pb-10">
        <p className="text-[11px] uppercase tracking-wide-3 text-gold-dark font-semibold mb-2">
          {t.menu.forWholeParty}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
          {menu.title}
        </h3>
        <div className="gold-divider mx-0 mb-6" />

        {desc && (
          <p className="text-charcoal text-[0.9rem] leading-relaxed mb-8 max-w-2xl">
            {desc}
          </p>
        )}

        {menu.courses.length > 0 && (
          <ul className="space-y-2 mb-8">
            {menu.courses.map((course, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gold-dark mt-1 flex-shrink-0">·</span>
                <span className="text-charcoal text-[0.9rem] leading-relaxed">
                  {typeof course === "object" ? course[lang] ?? course.en : course}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-6">
          {menu.prices.map((p, i) => (
            <div key={i} className="border-l-2 border-gold/40 pl-4">
              <p className="text-[10px] uppercase tracking-wide-3 text-graphite mb-1">
                {typeof p.label === "object" ? p.label[lang] ?? p.label.en : p.label}
              </p>
              <p className="font-serif text-xl text-charcoal">CHF {p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function AlaCarteSection() {
  const { lang, t } = useLanguage();
  const m = t.menu;
  const { starters, primi, secondi, dolci } = menuData.alaCarte;
  const kids = menuData.kidsMenu;

  const categories = [
    { data: starters, delay: 0 },
    { data: primi, delay: 0.05 },
    { data: secondi, delay: 0.1 },
    { data: dolci, delay: 0.15 },
  ];

  return (
    <div className="mt-24">
      <FadeIn className="text-center mb-16">
        <p className="eyebrow mb-4">{m.alaCarteTitle}</p>
        <div className="gold-divider" />
      </FadeIn>

      <div className="max-w-3xl mx-auto space-y-20">
        {categories.map(({ data, delay }) => (
          <div key={data.title}>
            <FadeIn delay={delay} className="text-center mb-10">
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal">
                {data.title}
              </h3>
              <div className="gold-divider mt-5" />
            </FadeIn>
            <ul>
              {data.items.map((item, idx) => (
                <MenuItemRow
                  key={item.id}
                  name={typeof item.name === "object" ? item.name[lang] ?? item.name.en : item.name}
                  price={item.price}
                  isLast={idx === data.items.length - 1}
                />
              ))}
            </ul>
          </div>
        ))}

        {/* Kids menu */}
        <div>
          <FadeIn className="text-center mb-10">
            <h3 className="font-serif text-3xl text-charcoal">{m.kidsTitle}</h3>
            <div className="gold-divider mt-5" />
          </FadeIn>
          <ul>
            {kids.items.map((item, idx) => (
              <MenuItemRow
                key={item.id}
                name={typeof item.name === "object" ? item.name[lang] ?? item.name.en : item.name}
                price={item.price}
                isLast={idx === kids.items.length - 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Wine list ────────────────────────────────────────────────────────────────

const WINE_TABS = [
  { key: "glass",    en: "By the Glass", de: "Offene Weine", fr: "Au Verre",   it: "Al Bicchiere" },
  { key: "sparkling",en: "Sparkling",    de: "Schaumweine",  fr: "Pétillant",  it: "Spumante"     },
  { key: "white",    en: "White",        de: "Weiss",        fr: "Blanc",      it: "Bianco"       },
  { key: "rose",     en: "Rosé",         de: "Rosé",         fr: "Rosé",       it: "Rosato"       },
  { key: "red",      en: "Red",          de: "Rot",          fr: "Rouge",      it: "Rosso"        },
  { key: "sweet",    en: "Sweet",        de: "Süssweine",    fr: "Doux",       it: "Dolce"        },
];

// ── Per-category visual theme — all use Sweet (amber/honey) style ─────────────
const SWEET_THEME = {
  wrapper: "relative px-8 py-7",
  regionColor: "#8B6914",
  nameCls: "font-serif text-[1.05rem] leading-snug text-charcoal",
  subCls: "text-[11px] mt-0.5 text-[#8B6914]",
  dividerCls: "h-px bg-[#D4A830]/30",
  priceCHFCls: "font-serif text-[0.7rem] tracking-wide-2 mr-1 text-[#8B6914]",
  priceNumCls: "font-serif text-lg text-charcoal",
  noteCls: "text-[10px] uppercase tracking-wide-3 text-[#8B6914] text-center",
  tabActive: "#8B6914",
  tabIndicator: "#C5A030",
  rowPy: "py-4",
};

const WINE_THEMES = {
  glass: SWEET_THEME,
  sparkling: SWEET_THEME,
  white: SWEET_THEME,
  rose: SWEET_THEME,
  red: SWEET_THEME,
  sweet: SWEET_THEME,
};

function WineRow({ wine, isLast, theme }) {
  const meta = [wine.vintage, wine.vol].filter(Boolean).join(" · ");
  const sub = [wine.grape, wine.producer].filter(Boolean).join(" · ");
  return (
    <>
      <div className={`flex items-start justify-between gap-6 ${theme.rowPy}`}>
        <div className="flex-1 min-w-0">
          {(wine.region || wine.type) && (
            <p
              className="text-[10px] uppercase tracking-wide-3 mb-0.5"
              style={{ color: theme.regionColor }}
            >
              {wine.region || wine.type}
              {meta ? ` · ${meta}` : ""}
            </p>
          )}
          <p className={theme.nameCls}>{wine.name}</p>
          {sub && <p className={theme.subCls}>{sub}</p>}
        </div>
        <div className="flex-shrink-0 text-right pt-[1px]">
          <span className={theme.priceCHFCls}>CHF</span>
          <span className={theme.priceNumCls}>{wine.price}</span>
        </div>
      </div>
    </>
  );
}

function WineSection() {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState("glass");
  const w = t.wines;
  const m = t.menu;

  const items = winesData[active === "glass" ? "byGlass" : active] || [];
  const theme = WINE_THEMES[active];

  return (
    <div className="mt-24 pt-24 border-t border-line">
      <FadeIn className="text-center mb-14">
        <p className="eyebrow mb-5">{w.eyebrow}</p>
        <h2 className="section-title mb-3">
          {w.titleMain}{" "}
          <span className="italic text-gold-dark">{w.titleItalic}</span>
        </h2>
        <div className="gold-divider mt-8" />
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        {/* Tabs */}
        <FadeIn>
          <div className="flex gap-6 overflow-x-auto pb-0 mb-0 border-b border-line">
            {WINE_TABS.map((tab) => {
              const isActive = active === tab.key;
              const th = WINE_THEMES[tab.key];
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className="relative flex-shrink-0 pb-4 text-[11px] uppercase tracking-wide-3 transition-colors duration-500"
                  style={{ color: isActive ? th.tabActive : "#706B65" }}
                >
                  {tab[lang] || tab.en}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-700"
                    style={{
                      width: isActive ? "100%" : "0%",
                      background: th.tabIndicator,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Themed wine list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`transition-colors duration-500 ${theme.wrapper}`}
          >
            {/* Vertical gold line — starts at first item level, not at wrapper top */}
            <div
              className="absolute left-0 bottom-0 w-[3px] bg-[#C5A030]/60"
              style={{ top: "28px" }}
              aria-hidden="true"
            />
            {items.map((wine, i) => (
              <WineRow
                key={wine.id}
                wine={wine}
                isLast={i === items.length - 1}
                theme={theme}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <FadeIn delay={0.2} className="mt-10 pt-8 border-t border-line">
          <p className="text-[10px] uppercase tracking-wide-3 text-graphite text-center">
            {m.allergyNote}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

// ─── Side rail — jednoduché zlaté orámovanie ─────────────────────────────────

function SideRail({ side }) {
  return (
    <div
      className={`hidden xl:block absolute top-0 bottom-0 pointer-events-none z-10 ${
        side === "right" ? "right-[7%]" : "left-[7%]"
      }`}
      aria-hidden="true"
    >
      <div
        style={{
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, #C5A572 10%, #C5A572 90%, transparent 100%)',
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RestaurantPage() {
  const { lang, t } = useLanguage();
  const r = t.restaurant;
  const m = t.menu;

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={RESTAURANT_HERO}
          alt="Restaurant Zum Schwarzen Bären — Andermatt"
          className="w-full h-full object-cover"
          loading="eager"
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
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-none">
              {r.titleMain}
              <br />
              <span className="italic text-gold-light">{r.titleItalic}</span>
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* White content — side rails are absolute inside this relative wrapper */}
      <div className="relative">
        <SideRail side="left" />
        <SideRail side="right" />

        {/* Intro + Hours */}
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <FadeIn>
              <p className="text-graphite leading-relaxed text-base md:text-lg">
                {r.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p className="text-base md:text-lg font-light text-charcoal mb-4">
                  {r.hoursTitle}
                </p>
                <div className="space-y-2.5">
                  {[
                    {
                      day: { en: "Monday — Tuesday", de: "Montag — Dienstag", fr: "Lundi — Mardi", it: "Lunedì — Martedì" },
                      time: { en: "Closed", de: "Geschlossen", fr: "Fermé", it: "Chiuso" },
                    },
                    {
                      day: { en: "Wednesday — Sunday", de: "Mittwoch — Sonntag", fr: "Mercredi — Dimanche", it: "Mercoledì — Domenica" },
                      time: "15:00 – 22:00",
                    },
                    {
                      day: { en: "Kitchen open from 18:00 to 21:00.", de: "Küche geöffnet von 18:00 bis 21:00.", fr: "Cuisine ouverte de 18h00 à 21h00.", it: "Cucina aperta dalle 18:00 alle 21:00." },
                    },
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-charcoal text-sm">
                        {typeof h.day === "object" ? h.day[lang] : h.day}
                      </span>
                      {h.time && (
                        <span className="text-charcoal text-sm font-medium">
                          {typeof h.time === "object" ? h.time[lang] : h.time}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Chef section */}
          <FadeIn>
          <div className="border-t border-line pt-8 md:pt-10 pb-8 md:pb-10 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gold/30">
                    <img
                      src={CHEF_PHOTO}
                      alt="Chef Daniel Schiavetta"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide-3 text-gold-dark font-semibold mb-2">
                    {r.chefEyebrow}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                    {r.chefName}
                  </h3>
                  <p className="font-serif italic text-lg text-gold-dark mb-5">
                    {r.chefPoints}
                  </p>
                  <div className="gold-divider mx-0 mb-5" />
                  <p className="text-graphite text-sm md:text-base leading-relaxed">
                    {r.chefBio}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Tasting menus */}
          <FadeIn className="text-center mb-12">
            <p className="eyebrow mb-4">{m.tastingMenus}</p>
            <div className="gold-divider" />
          </FadeIn>
          <div className="space-y-6 mb-6">
            {menuData.tastingMenus.map((menu) => (
              <TastingMenuCard key={menu.id} menu={menu} />
            ))}
          </div>

          {/* À la carte */}
          <AlaCarteSection />

          {/* Reserve CTA */}
          <FadeIn delay={0.2} className="text-center mt-20 mb-8">
            <p className="text-[10px] uppercase tracking-wide-3 text-graphite mb-8">
              {r.footer}
            </p>
            <Link
              to="/reservation"
              className="group relative inline-block px-12 py-4 border border-gold text-gold-dark text-[10px] uppercase tracking-wide-4 overflow-hidden transition-colors duration-700"
            >
              <span className="relative z-10 group-hover:text-alabaster transition-colors duration-700">
                {r.reserveBtn}
              </span>
              <span
                className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-silk"
                aria-hidden="true"
              />
            </Link>
          </FadeIn>

          {/* Wine list */}
          <WineSection />
        </div>
      </div>
      {/* end relative wrapper */}
    </div>
  );
}
