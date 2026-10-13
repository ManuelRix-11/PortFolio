import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Download } from 'lucide-react';
import './Hero.css';

// ponytail: pure CSS GPU spotlight & fluid radar pulse; static role tags to avoid animation overload
export default function Hero() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleMouseEnter = () => {
    if (heroRef.current) {
      rectRef.current = heroRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !heroRef.current) return;
    if (!rectRef.current) {
      rectRef.current = heroRef.current.getBoundingClientRect();
    }
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!heroRef.current || !rectRef.current) return;
      const x = clientX - rectRef.current.left;
      const y = clientY - rectRef.current.top;
      heroRef.current.style.setProperty('--spotlight-x', `${x}px`);
      heroRef.current.style.setProperty('--spotlight-y', `${y}px`);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tickerItems = [
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'R&D',
    'Research',
    'Computer Vision',
    'NLP',
  ];

  return (
    <section
      ref={heroRef}
      className="hero"
      id="hero"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Interactive Cursor Spotlight Glow */}
      <div className="hero-cursor-spotlight" aria-hidden="true" />

      {/* 2. Background ambient mesh */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh-orb mesh-1" />
        <div className="mesh-orb mesh-2" />
      </div>

      {/* 3. Geometric grid */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        {/* Left Column: Typography Stack */}
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge with Ultra-Fluid Radar Pulse Dot */}
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>{t('hero.badge', 'Junior R&D Engineer · Eristack')}</span>
          </motion.div>

          {/* Display Name */}
          <motion.h1 variants={itemVariants} className="hero-name">
            <span className="name-first">Emanuele</span>
            <span className="name-last">Ragozzini</span>
          </motion.h1>

          {/* Clean Static Focus Chip (Zero Flicker / Visual Clutter) */}
          <motion.div variants={itemVariants} className="hero-role-badge">
            <span className="role-prompt-symbol">&gt;</span>
            <span className="hero-role-text">Data Science &amp; Machine Learning</span>
          </motion.div>

          {/* Narrative Lead Description */}
          <motion.p variants={itemVariants} className="hero-desc">
            {t('hero.description')}
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="hero-cta">
            <a
              href="#projects"
              className="btn btn-primary hero-btn-main"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
            >
              <span>{t('hero.cta_projects', 'Vedi i progetti')}</span>
            </a>
            <a
              href="#contact"
              className="btn btn-outline hero-btn-contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
              }}
            >
              <span>{t('hero.cta_contact', 'Contattami')}</span>
            </a>
            <a
              href="/cv.pdf"
              download
              className="btn btn-outline hero-btn-cv"
            >
              <Download size={15} />
              <span>{t('hero.cta_cv', 'Scarica CV')}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Subtle Ambient Neural Architecture Visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-bob">
            <svg
              viewBox="0 0 460 340"
              role="img"
              aria-label="Neural Network Motif"
              className="hero-network-svg"
            >
              {/* Subtle Synaptic Mesh (Low contrast, background texture) */}
              <g stroke="var(--primary)" strokeWidth="1" fill="none" opacity="0.18">
                {/* Layer 1 -> Layer 2 (3 x 4) */}
                {[60, 170, 280].flatMap((y1) =>
                  [50, 130, 210, 290].map((y2) => (
                    <line key={`s1-${y1}-${y2}`} x1="50" y1={y1} x2="180" y2={y2} />
                  ))
                )}

                {/* Layer 2 -> Layer 3 (4 x 4) */}
                {[50, 130, 210, 290].flatMap((y1) =>
                  [60, 135, 205, 280].map((y2) => (
                    <line key={`s2-${y1}-${y2}`} x1="180" y1={y1} x2="310" y2={y2} />
                  ))
                )}

                {/* Layer 3 -> Layer 4 (4 x 2) */}
                {[60, 135, 205, 280].flatMap((y1) =>
                  [110, 230].map((y2) => (
                    <line key={`s3-${y1}-${y2}`} x1="310" y1={y1} x2="420" y2={y2} />
                  ))
                )}
              </g>

              {/* Just 2 Soft Flowing Forward Signals */}
              <g stroke="var(--primary)" strokeWidth="1.6" fill="none" opacity="0.6">
                <path className="hero-fwd-signal" d="M50 170 L180 130 L310 205 L420 110" />
                <path className="hero-fwd-signal sig-d2" d="M50 280 L180 210 L310 135 L420 230" stroke="var(--accent)" />
              </g>

              {/* Minimal Clean Neurons */}
              {/* Layer 1 */}
              {[60, 170, 280].map((y, i) => (
                <circle key={`n1-${i}`} className="hero-nd" cx="50" cy={y} r="5" fill="#070B14" stroke="var(--primary)" strokeWidth="1.5" />
              ))}

              {/* Layer 2 */}
              {[50, 130, 210, 290].map((y, i) => (
                <circle key={`n2-${i}`} className={`hero-nd hero-nd-d${i + 1}`} cx="180" cy={y} r="5.5" fill="#070B14" stroke="var(--primary)" strokeWidth="1.5" />
              ))}

              {/* Layer 3 */}
              {[60, 135, 205, 280].map((y, i) => (
                <circle key={`n3-${i}`} className={`hero-nd hero-nd-d${i + 2}`} cx="310" cy={y} r="5.5" fill="#070B14" stroke="var(--accent)" strokeWidth="1.5" />
              ))}

              {/* Layer 4 */}
              <circle className="hero-nd hero-nd-d3" cx="420" cy="110" r="6" fill="var(--primary)" opacity="0.9" />
              <circle className="hero-nd hero-nd-d5" cx="420" cy="230" r="6" fill="var(--accent)" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>

      {/* Infinite Word Carousel / Marquee Ticker */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <span key={idx} className="hero-ticker-item">
              <span>{item}</span>
              <span className="ticker-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
