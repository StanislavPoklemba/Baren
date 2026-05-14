import FadeIn from "./FadeIn";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer id="contact" className="relative bg-walnut">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        {/* Bear ornament + logo */}
        <FadeIn className="text-center mb-16">
          <div className="text-gold/30 text-6xl mb-4" aria-hidden="true">
            ◈
          </div>
          <h3 className="font-serif text-3xl tracking-wide-2 text-white">
            ZUM SCHWARZEN BÄREN
          </h3>
          <p className="mt-2 text-[9px] uppercase tracking-wide-4 text-gold/60">
            Andermatt · Switzerland · Est. 19th Century
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-wide-3 text-white/30">
            Valursera Hospitality AG
          </p>
        </FadeIn>

        {/* Three info columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <FadeIn delay={0.1}>
            <p className="text-[10px] uppercase tracking-wide-4 text-gold/70 mb-5">
              {f.visit}
            </p>
            <p className="text-white/60 leading-relaxed text-sm font-light">
              Gotthardstrasse 137
              <br />
              6490 Andermatt
              <br />
              Uri · Switzerland
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[10px] uppercase tracking-wide-4 text-gold/70 mb-5">
              {f.hours}
            </p>
            <p className="text-white/60 leading-relaxed text-sm font-light">
              {f.hoursMain}
              <br />
              15:00 — 22:00
              <br />
              <span className="text-white/30">{f.hoursClosed}</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[10px] uppercase tracking-wide-4 text-gold/70 mb-5">
              {f.contact}
            </p>
            <p className="text-white/60 leading-relaxed text-sm font-light">
              <a
                href="tel:+41418870303"
                className="hover:text-gold transition-colors duration-500"
              >
                +41 41 887 03 03
              </a>
              <br />
              <a
                href="mailto:Info@baeren-andermatt.ch"
                className="hover:text-gold transition-colors duration-500 break-all"
              >
                Info@baeren-andermatt.ch
              </a>
            </p>
            <div className="flex items-center justify-center gap-6 mt-5">
              <a
                href="https://www.instagram.com/zumschwarzenbaren/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wide-3 text-white/30 hover:text-gold transition-colors duration-500"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/Hotel-Restaurant-zum-schwarzen-B%C3%A4ren-103667191558595"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wide-3 text-white/30 hover:text-gold transition-colors duration-500"
              >
                Facebook
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="my-14 h-px bg-white/10" />

        {/* Copyright */}
        <FadeIn delay={0.1} className="text-center">
          <p className="text-[9px] uppercase tracking-wide-3 text-white/25">
            © {year} Zum Schwarzen Bären · {f.copyright}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}

export default Footer;
