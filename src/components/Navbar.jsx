import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
]

function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen]     = useState(false)
  const { lang, setLang, t }        = useLanguage()
  const location                    = useLocation()
  const langRef                     = useRef(null)

  const isHome = location.pathname === '/'

  const NAV_LINKS = [
    { href: '/hotel',       label: t.nav.hotel },
    { href: '/restaurant',  label: t.nav.restaurant },
    { href: '/reservation', label: t.nav.reservation },
  ]

  const scrollToContact = (e) => {
    e.preventDefault()
    setMobileOpen(false)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!langOpen) return
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [langOpen])

  const transparent    = isHome && !scrolled
  const showBackground = scrolled || !isHome

  const linkClass = (isActive) =>
    `text-[12px] uppercase tracking-wide-3 font-medium transition-colors duration-500 relative group ${
      isActive
        ? 'text-gold'
        : transparent
          ? 'text-white/80 hover:text-gold'
          : 'text-charcoal hover:text-gold'
    }`

  const langBtnClass = (code) =>
    `text-[11px] font-medium tracking-wide transition-colors duration-300 select-none ${
      lang === code
        ? 'text-gold'
        : transparent
          ? 'text-white/60 hover:text-white'
          : 'text-charcoal/50 hover:text-charcoal'
    }`

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-silk',
          showBackground
            ? 'bg-alabaster/85 backdrop-blur-md border-b border-line/50 py-4'
            : 'bg-transparent py-7',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="Zum Schwarzen Bären — home">
            <img
              src="https://static.wixstatic.com/media/c1734e_c73676aa592241ffb2f4bc8a79b7ef9d~mv2.png/v1/fill/w_60,h_60,al_c,q_90,enc_avif,quality_auto/baeren-logo.png"
              alt="Zum Schwarzen Bären"
              className={['w-8 h-8 object-contain transition-all duration-500', showBackground ? 'opacity-100' : 'brightness-0 invert'].join(' ')}
            />
            <div className="flex flex-col items-start">
              <span className="text-[11px] uppercase tracking-wide-3 text-gold-dark font-semibold">
                Andermatt · Switzerland
              </span>
              <span
                className={[
                  'font-serif tracking-wide transition-colors duration-500',
                  transparent ? 'text-white text-xl' : 'text-charcoal text-lg',
                ].join(' ')}
              >
                Zum Schwarzen Bären
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={isActive ? (e) => e.preventDefault() : undefined}
                    className={linkClass(isActive)}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-700 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
            <li>
              <a href="#contact" onClick={scrollToContact} className={linkClass(false)}>
                {t.nav.contact}
                <span className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-700 w-0 group-hover:w-full" />
              </a>
            </li>
          </ul>

          {/* Right: language selector + hamburger */}
          <div className="flex items-center gap-4">

            {/* Desktop language selector */}
            <div ref={langRef} className="hidden md:block relative">
              {/* Trigger — always in flow, navbar never shifts */}
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-label="Select language"
                className={`text-[11px] font-medium tracking-wide hover:opacity-60 transition-opacity select-none ${
                  transparent ? 'text-white/80' : 'text-charcoal'
                }`}
              >
                {lang.toUpperCase()}
              </button>

              {/* Options — absolutely positioned so nothing else shifts */}
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 right-full pr-4 flex items-center gap-3 whitespace-nowrap"
                  >
                    {LANGS.map((l, i) => (
                      <motion.button
                        key={l.code}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        type="button"
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        aria-label={`Switch to ${l.label}`}
                        className={langBtnClass(l.code)}
                      >
                        {l.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={[
                    'block h-px transition-colors duration-300',
                    i === 2 ? 'w-4 ml-auto' : 'w-6',
                    scrolled ? 'bg-charcoal' : 'bg-white',
                  ].join(' ')}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-walnut"
          >
            <div className="flex items-center justify-between px-6 py-7">
              <span className="font-serif text-white text-xl tracking-wide-2">
                Zum Schwarzen Bären
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white hover:text-gold transition-colors duration-300"
                aria-label="Close menu"
              >
                <span className="block w-6 h-px bg-current rotate-45 translate-y-[1px]" />
                <span className="block w-6 h-px bg-current -rotate-45" />
              </button>
            </div>

            <motion.ul
              className="flex flex-col items-center justify-center gap-10 mt-20"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden:  { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        if (isActive) e.preventDefault()
                        setMobileOpen(false)
                      }}
                      className={`font-serif text-3xl transition-colors duration-500 ${
                        isActive ? 'text-gold' : 'text-white hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}

              <motion.li
                variants={{
                  hidden:  { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 } },
                }}
              >
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="font-serif text-3xl text-white hover:text-gold transition-colors duration-500"
                >
                  {t.nav.contact}
                </a>
              </motion.li>

              {/* Mobile language selector — always visible as a row */}
              <motion.li
                variants={{
                  hidden:  { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 } },
                }}
              >
                <div className="flex items-center gap-6 mt-4">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      aria-label={`Switch to ${l.label}`}
                      className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                        lang === l.code ? 'text-gold' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </motion.li>
            </motion.ul>

            <p className="absolute bottom-10 left-0 right-0 text-center text-[10px] uppercase tracking-wide-4 text-gold/50">
              {t.location.eyebrow}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
