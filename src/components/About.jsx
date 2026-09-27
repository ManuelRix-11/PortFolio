import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import './About.css';

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
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
      <div className="container">
        <motion.div
          className="about-unified-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="about-header-meta">
            <div className="section-kicker">
              <span className="section-index">01</span>
              <span className="section-index-line" />
              <p className="section-label">{t('about.subtitle')}</p>
            </div>
            <h2 className="section-title about-title">{t('about.title')}</h2>
          </motion.div>

          {/* Narrative Editorial Flow (No duplicate cards) */}
          <div className="about-editorial-layout">
            {/* Primary Quote-Style Lead Statement */}
            <motion.div variants={itemVariants} className="about-quote-lead">
              <p className="about-lead-statement">
                {t('about.bio')}
              </p>
            </motion.div>

            {/* Secondary Narrative Block */}
            <motion.div variants={itemVariants} className="about-secondary-block">
              <p className="about-body-statement">
                {t('about.bio2')}
              </p>
            </motion.div>

            {/* Current Focus Distinctive Line (Non-duplicate contextual pulse) */}
            <motion.div variants={itemVariants} className="about-current-focus-bar">
              <div className="focus-pill">
                <span className="focus-pulse-dot" />
                <span className="focus-label">{t('about.focus_label')}</span>
              </div>
              <p className="focus-statement">
                {t('about.focus_text')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
