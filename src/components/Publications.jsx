import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { publications } from '../data/publications';
import { ExternalLink, Award } from 'lucide-react';
import './Publications.css';

const STATUS_KEY = {
  published: 'status_published',
  review: 'status_review',
  preprint: 'status_preprint',
};

export default function Publications() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section section-alt" id="publications">
      <div className="container">
        {/* Header Block */}
        <motion.div
          className="pub-header-block"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div className="pub-meta-chip">
            <Award size={13} className="meta-chip-icon" />
            <span>ACADEMIC CONTRIBUTIONS</span>
          </div>
          <p className="section-label">{t('publications.subtitle')}</p>
          <h2 className="section-title">{t('publications.title')}</h2>
        </motion.div>

        {/* Editorial Publications List */}
        <div className="pub-editorial-list">
          {publications.map((pub, i) => {
            const authorList = pub.authors ? pub.authors.split(',') : [];

            return (
              <motion.article
                key={pub.id}
                className="pub-editorial-card"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  delay: shouldReduceMotion ? 0 : i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Glowing Ambient Top Highlight & Border */}
                <div className="pub-card-glow" />
                <div className="pub-card-border" />

                {/* Subtle Neural Network Research Watermark (Corner Graphic) */}
                <div className="pub-card-watermark" aria-hidden="true">
                  <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
                    <circle cx="20" cy="20" r="3" fill="currentColor" />
                    <circle cx="80" cy="20" r="3" fill="currentColor" />
                    <circle cx="50" cy="50" r="4.5" fill="currentColor" />
                    <circle cx="20" cy="80" r="3" fill="currentColor" />
                    <circle cx="80" cy="80" r="3" fill="currentColor" />
                    <path
                      d="M20 20L50 50M80 20L50 50M20 80L50 50M80 80L50 50M20 20L80 20M20 80L80 80"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />
                    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="0.4"
                      opacity="0.25"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>

                <div className="pub-editorial-body">
                  {/* Top Editorial Bar */}
                  <div className="pub-top-bar">
                    <div className="pub-index-tag">
                      <span className="index-bracket">[</span>
                      <span className="index-text">ARTICLE // 0{i + 1}</span>
                      <span className="index-bracket">]</span>
                      <span className="pub-type-label">PEER-REVIEWED CONFERENCE PROCEEDING</span>
                    </div>

                    {/* Status indicator pill with green pulse dot */}
                    <div className={`pub-status-pill status-${pub.status || 'published'}`}>
                      <span className="pub-pulse-dot" />
                      <span className="pub-status-text">
                        {t(`publications.${STATUS_KEY[pub.status] || 'status_published'}`)}
                      </span>
                    </div>
                  </div>

                  {/* 1. Dominant Publication Title */}
                  <h3 className="pub-editorial-title">{pub.title}</h3>

                  {/* 2. Unified Authors & Venue Duo Row (Side-by-Side on Desktop) */}
                  <div className="pub-meta-duo-row">
                    {/* Authors Column */}
                    <div className="pub-meta-col pub-meta-col-authors">
                      <span className="pub-field-label">AUTHORS</span>
                      <div className="pub-authors-high-contrast">
                        {authorList.map((author, aIdx) => {
                          const cleanName = author.trim();
                          const isSelf = cleanName.toLowerCase().includes('emanuele ragozzini');

                          return (
                            <span
                              key={aIdx}
                              className={`author-name ${isSelf ? 'author-self-highlight' : 'author-colleague'}`}
                            >
                              {cleanName}
                              {aIdx < authorList.length - 1 && <span className="author-sep">, </span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Venue Column */}
                    <div className="pub-meta-col pub-meta-col-venue">
                      <span className="pub-field-label">VENUE</span>
                      <div className="pub-venue-details">
                        <span className="venue-name">{pub.venue}</span>
                        <span className="venue-year-badge">{pub.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Pure Content Abstract (No heavy box, luminous left border only) */}
                  <div className="pub-abstract-narrative">
                    <span className="pub-field-label abstract-label">ABSTRACT</span>
                    <p className="pub-abstract-text">{pub.abstract}</p>
                  </div>

                  {/* 4. High-Contrast DOI & Thematic Tags Row */}
                  <div className="pub-footer-row">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pub-doi-btn"
                        aria-label={`Open DOI ${pub.doi}`}
                      >
                        <span className="doi-tag-prefix">DOI</span>
                        <span className="doi-tag-id">{pub.doi}</span>
                        <ExternalLink size={14} className="doi-arrow-icon" />
                      </a>
                    )}

                    <div className="pub-editorial-pills">
                      <span className="editorial-pill">LLM Prompt Design</span>
                      <span className="editorial-pill">Synthetic Healthcare Data</span>
                      <span className="editorial-pill">Bioinformatics</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
