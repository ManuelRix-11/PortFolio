import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail, Download, Sparkles } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true });
  const sequence = roles.flatMap((r) => [r, 2200]);
  const shouldReduceMotion = useReducedMotion();

  // References for 60fps RAF lerp interactions (Cursor glow + Photo parallax)
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const photoRef = useRef(null);
  const isHovered = useRef(false);

  // Targets and interpolated values for smooth physical inertia
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const photoOffset = useRef({ x: 0, y: 0, r: 0 });
  const photoTarget = useRef({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Detect touch / coarse pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let animationFrameId;

    const animate = () => {
      // 1. Lerp cursor glow position with soft physical inertia
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.085;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.085;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouseCurrent.current.x - 300}px, ${mouseCurrent.current.y - 300}px, 0)`;
        glowRef.current.style.opacity = isHovered.current ? '1' : '0';
      }

      // 2. Lerp photo subtle counter-parallax
      photoOffset.current.x += (photoTarget.current.x - photoOffset.current.x) * 0.06;
      photoOffset.current.y += (photoTarget.current.y - photoOffset.current.y) * 0.06;
      photoOffset.current.r += (photoTarget.current.r - photoOffset.current.r) * 0.06;

      if (photoRef.current) {
        photoRef.current.style.transform = `translate3d(${photoOffset.current.x}px, ${photoOffset.current.y}px, 0) rotate(${photoOffset.current.r}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current || shouldReduceMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isHovered.current = true;
    mouseTarget.current = { x, y };

    // Normalized coordinates from center (-1 to 1) for photo parallax
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    // Subtle counter-movement in opposite direction (max 14px offset, 1.5deg tilt)
    photoTarget.current = {
      x: -normX * 14,
      y: -normY * 12,
      r: -normX * 1.5,
    };
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    // Smoothly return photo to rest position
    photoTarget.current = { x: 0, y: 0, r: 0 };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Signature Cursor Follow Glow (Lerped in RAF with inertia) */}
      <div ref={glowRef} className="hero-cursor-glow" aria-hidden="true" />

      {/* 2. Tactile Grain / Noise Texture Overlay */}
      <div className="hero-noise-overlay" aria-hidden="true" />

      {/* 3. Slow Ambient Gradient Mesh Background (18s Loop) */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh-orb mesh-1" />
        <div className="mesh-orb mesh-2" />
        <div className="mesh-orb mesh-3" />
      </div>

      {/* 4. Subtle Structural Grid */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        {/* Left Column: Asymmetrical Typography Stack (Offset slightly higher) */}
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Human Greeting Pill */}
          <motion.div variants={itemVariants} className="hero-greeting-wrap">
            <span className="hero-greeting-pill">
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Drastic Scale Display Title (Unclipped descenders) */}
          <motion.h1 variants={itemVariants} className="hero-name">
            <span className="name-first">Emanuele</span>
            <span className="name-last">Ragozzini</span>
          </motion.h1>

          {/* Terminal / AI Role Ticker (Explicitly sized, no truncation) */}
          <motion.div variants={itemVariants} className="hero-role-badge">
            <span className="role-prompt-symbol">&gt;</span>
            <span className="hero-role-text">
              <TypeAnimation
                sequence={sequence}
                wrapper="span"
                speed={50}
                deletionSpeed={60}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </motion.div>

          {/* Narrative Lead Description */}
          <motion.p variants={itemVariants} className="hero-desc">
            {t('hero.description')}
          </motion.p>

          {/* Magnetic CTA Group */}
          <motion.div variants={itemVariants} className="hero-cta">
            <button
              className="btn btn-primary hero-btn-main"
              onClick={() => scrollTo('contact')}
            >
              <Mail size={16} />
              <span>{t('hero.cta_contact')}</span>
              <Sparkles size={14} className="btn-sparkle" />
            </button>
            <a
              href="/cv.pdf"
              download
              className="btn btn-outline hero-btn-cv"
            >
              <Download size={16} />
              <span>{t('hero.cta_cv')}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Asymmetrical Bleed Photo Stage with Parallax & Revolving Border */}
        <motion.div
          className="hero-stage-wrap"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            delay: shouldReduceMotion ? 0 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div ref={photoRef} className="hero-card-frame">
            {/* Ambient Backlight Aura */}
            <div className="hero-card-glow" />

            {/* Revolving Gradient Border Envelope */}
            <div className="hero-card-border">
              <div className="hero-image-container">
                <img
                  src={profileImg}
                  alt="Emanuele Ragozzini"
                  className="hero-image"
                />
                <div className="hero-image-vignette" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        className="hero-scroll"
        onClick={() => scrollTo('about')}
        aria-label={t('hero.scroll')}
      >
        <span className="scroll-track">
          <ArrowDown size={17} />
        </span>
      </button>
    </section>
  );
}
