import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import './Experience.css';

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isIt = i18n.language?.startsWith('it');
  const items = t('experience.items', { returnObjects: true });
  const shouldReduceMotion = useReducedMotion();

  const parsePeriod = (periodStr = '') => {
    const parts = periodStr.split(/[—–-]/).map((s) => s.trim());
    return {
      startDate: parts[0] || periodStr,
      endDate: parts[1] || '',
    };
  };

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="experience-header-group"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <div className="section-kicker">
            <span className="section-index">02</span>
            <span className="section-index-line" />
            <p className="section-label">{t('experience.subtitle')}</p>
          </div>
          <h2 className="section-title experience-title">{t('experience.title')}</h2>
        </motion.div>

        {/* Full-Width Spotlight Cards Stack */}
        <div className="experience-cards-stack">
          {items.map((item, index) => {
            const { startDate, endDate } = parsePeriod(item.period);
            const isCurrent =
              item.period?.toLowerCase().includes('present') ||
              item.period?.toLowerCase().includes('presente');

            return (
              <motion.div
                key={item.company + index}
                className="experience-spotlight-card"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25 } }}
              >
                {/* Subtle Ambient Backlight Glow */}
                <div className="spotlight-ambient-glow" aria-hidden="true" />

                <div className="spotlight-grid">
                  {/* 1. Left Column: Essential Metadata Stack (~36%) with Internal Role Timeline */}
                  <div className="spotlight-meta-col">
                    {/* Background Letter Watermark */}
                    <span className="spotlight-watermark" aria-hidden="true">
                      {item.company ? item.company.charAt(0) : 'E'}
                    </span>

                    {/* Top: Company & Location */}
                    <div className="spotlight-company-bar">
                      <div className="spotlight-company-wrap">
                        <Building2 size={15} className="company-icon" />
                        <span className="spotlight-company-name">{item.company}</span>
                      </div>
                      <span className="company-meta-sep">·</span>
                      <div className="spotlight-location-wrap">
                        <MapPin size={13} className="telemetry-icon" />
                        <span className="telemetry-text-loc">{item.location}</span>
                      </div>
                    </div>

                    {/* Dominant Role Title */}
                    <h3 className="spotlight-role-title">{item.role}</h3>

                    {/* Internal Role Progression Timeline (Recent/Now on TOP -> Line -> Start/Oldest on BOTTOM) */}
                    <div className="role-timeline-track">
                      <div className="timeline-spine-col" aria-hidden="true">
                        {/* Top Dot: Most Recent Milestone (Active Now pulse or Past End Point) */}
                        {isCurrent ? (
                          <span className="timeline-dot-now">
                            <span className="timeline-pulse-ring" />
                          </span>
                        ) : (
                          <span className="timeline-dot-end" />
                        )}
                        {/* Connecting Gradient Line */}
                        <span className="timeline-track-line" />
                        {/* Bottom Dot: Oldest / Start Milestone (Static) */}
                        <span className="timeline-dot-start" />
                      </div>

                      <div className="timeline-nodes-col">
                        {/* Top Milestone: Most Recent (In corso or End Date) */}
                        <div className="timeline-node timeline-node-recent">
                          {isCurrent ? (
                            <div className="spotlight-live-pill">
                              <span className="live-pulse-dot" />
                              <span className="live-label">{isIt ? 'In corso' : 'Ongoing'}</span>
                            </div>
                          ) : (
                            <div className="spotlight-past-pill">
                              <span className="past-label">
                                {endDate || (isIt ? 'Concluso' : 'Completed')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Milestone: Oldest / Start Date */}
                        <div className="timeline-node timeline-node-start">
                          <Calendar size={13} className="timeline-icon-cal" />
                          <span className="timeline-date-text">{startDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Right Column: Role Narrative & Tech Stack (~65%) */}
                  <div className="spotlight-content-col">
                    <div className="spotlight-desc-wrap">
                      <p className="spotlight-description">{item.description}</p>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="spotlight-stack-wrap">
                        <span className="spotlight-stack-label">
                          {isIt ? 'STACK TECNOLOGICO & AMBITI' : 'TECHNOLOGY STACK & DOMAINS'}
                        </span>
                        <div className="spotlight-tags-grid">
                          {item.tags.map((tag) => (
                            <span className="spotlight-tech-tag" key={tag}>
                              <span className="tag-hash">#</span>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
