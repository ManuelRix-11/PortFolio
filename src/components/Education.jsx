import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, Building2, Calendar, CheckCircle2 } from 'lucide-react';
import './Education.css';

export default function Education() {
  const { t } = useTranslation();
  const items = t('education.items', { returnObjects: true });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="section education-section" id="education">
      <div className="container">
        {/* Section Header with Human / Clean Typography */}
        <motion.div
          className="education-header-group"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <div className="section-kicker">
            <span className="section-index">03</span>
            <span className="section-index-line" />
            <p className="section-label">{t('education.subtitle')}</p>
          </div>
          <h2 className="section-title education-title">{t('education.title')}</h2>
        </motion.div>

        {/* 2-Column Asymmetric Academic Cards Layout */}
        <motion.div
          className="education-asym-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, i) => {
            const isOngoing = item.status === 'In corso' || item.status === 'Ongoing';
            const isFeatured = isOngoing; // Flagship MSc card

            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                className={`academic-card ${isFeatured ? 'card-featured' : 'card-standard'}`}
                whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
              >
                {/* Subtle ambient lighting accent */}
                <div className="academic-ambient-glow" aria-hidden="true" />

                {/* Top Academic Header Row */}
                <div className="academic-top-bar">
                  <div className="degree-badge">
                    {isOngoing ? (
                      <GraduationCap size={15} className="degree-badge-icon" />
                    ) : (
                      <Award size={15} className="degree-badge-icon" />
                    )}
                    <span className="degree-badge-text">
                      {isOngoing ? 'MSc Degree' : 'BSc Degree'}
                    </span>
                  </div>

                  {/* Clean Status Pill with Real Verified State */}
                  <div className={`academic-status-pill ${isOngoing ? 'status-active' : 'status-completed'}`}>
                    {isOngoing ? (
                      <>
                        <span className="academic-status-dot" />
                        <span>{item.status}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={13} className="academic-check-icon" />
                        <span>{item.status}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="academic-degree-title">{item.degree}</h3>

                {/* Institution & Period Row */}
                <div className="academic-meta-row">
                  <div className="university-tag">
                    <Building2 size={13} className="uni-tag-icon" />
                    <span className="uni-tag-text">{item.school}</span>
                  </div>
                  <div className="period-badge-mono">
                    <Calendar size={12} className="period-icon" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Academic Description */}
                <p className="academic-desc">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
