import { motion } from 'framer-motion'

/**
 * FadeIn – reusable wrapper, ktorý jemne odhaľuje obsah
 * pri scrollovaní do viewportu.
 *
 * Prečo vlastný komponent?
 *  - Aby sme animácie nemuseli v každej sekcii písať odznova.
 *  - Konzistentné tempo (duration, easing) v celej stránke = pocit "tichého luxusu".
 *
 * VLASTNOSTI:
 *  - delay   ............ oneskorenie v sekundách (pre stagger)
 *  - duration ........... trvanie animácie
 *  - y      ............. počiatočný posun (default: posun zdola hore)
 *  - once   ............. true = animuje sa iba pri prvom príchode do viewportu
 *  - amount ............. koľko % komponentu musí byť viditeľných (0 - 1)
 *
 * KĽÚČOVÉ FRAMER MOTION POJMY:
 *  - whileInView: animácia sa spustí, keď je element vo viewporte
 *  - viewport.once: true – animácia sa nespustí znovu pri scrolle naspäť
 */
function FadeIn({
  children,
  delay = 0,
  duration = 1.4,
  y = 24,
  once = true,
  amount = 0.2,
  as = 'div',
  className = '',
  ...rest
}) {
  // motion.[as] – Framer Motion má variant pre takmer každý HTML element.
  // Cez bracket notation vieme vytvoriť dynamický tag (div, section, h2, ...).
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default FadeIn
