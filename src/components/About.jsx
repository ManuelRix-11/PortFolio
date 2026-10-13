import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';
import './About.css';

// ponytail: hybrid about layout (photo with orbital SVG ring left + bio text and 3 key cards right)
export default function About() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section about-section" id="about">
      <div className="container about-container">
        {/* Section Header */}
        <div className="about-header">
          <span className="about-kicker">{t('about.kicker', '01 — Un po’ su di me')}</span>
          <h2 className="about-title">{t('about.title', 'Chi sono')}</h2>
        </div>

        {/* Content Row: Photo on the left, Bio + Cards on the right */}
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Circular Photo Frame with Animated Orbital Rings */}
          <motion.div variants={itemVariants} className="about-avatar-wrap">
            <div className="about-avatar-container">
              <svg className="about-orb" viewBox="0 0 240 240" aria-hidden="true">
                <circle
                  cx="120"
                  cy="120"
                  r="116"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeDasharray="50 22"
                />
                <circle
                  className="about-orb-rev"
                  cx="120"
                  cy="120"
                  r="116"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="14 36"
                />
              </svg>
              <div className="about-avatar-inner">
                <img
                  src={profileImg}
                  alt="Emanuele Ragozzini"
                  className="about-avatar-img"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Description + 3 Summary Cards */}
          <div className="about-content">
            <motion.p variants={itemVariants} className="about-bio-text">
              {t('about.bio')}
            </motion.p>

            <motion.div variants={itemVariants} className="about-cards-grid">
              <div className="about-card">
                <span className="about-card-label">{t('about.card_role_label', 'Ruolo')}</span>
                <span className="about-card-val">{t('about.card_role_val', 'Junior R&D Engineer · Eristack')}</span>
              </div>
              <div className="about-card">
                <span className="about-card-label">{t('about.card_studies_label', 'Studi')}</span>
                <span className="about-card-val">{t('about.card_studies_val', 'MSc Data Science & ML · UniSA')}</span>
              </div>
              <div className="about-card">
                <span className="about-card-label">{t('about.card_focus_label', 'Focus')}</span>
                <span className="about-card-val">{t('about.card_focus_val', 'AI & Machine Learning')}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
