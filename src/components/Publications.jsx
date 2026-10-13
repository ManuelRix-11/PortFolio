import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { publications } from '../data/publications';
import { ExternalLink, X } from 'lucide-react';
import './Publications.css';

const STATUS_KEY = {
  published: 'status_published',
  review: 'status_review',
  preprint: 'status_preprint',
};

// ponytail: simplified research section matching mockup with minimal border-left items; full modal card on click
export default function Publications() {
  const { t } = useTranslation();
  const [selectedPub, setSelectedPub] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Escape key handler to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedPub(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (selectedPub) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedPub]);

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
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section research-section" id="publications">
      <div className="container research-container">
        {/* Header Block from Mockup */}
        <div className="research-header">
          <span className="research-kicker">{t('publications.kicker', '04 — Ricerca')}</span>
          <h2 className="research-title">{t('publications.title', 'Ricerca & Pubblicazioni')}</h2>
        </div>

        {/* Minimal Grid Items matching Mockup */}
        <motion.div
          className="research-minimal-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
              className="research-minimal-item"
              onClick={() => setSelectedPub(pub)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPub(pub)}
            >
              <h3 className="research-item-title">{pub.title}</h3>
              <p className="research-item-meta">
                <span className="meta-venue">{pub.venue}</span>
                <span className="meta-sep">·</span>
                <span className="meta-year">{pub.year}</span>
                <span className="meta-click-hint">{t('publications.read_more', 'Leggi dettagli ↗')}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal with Full Research Paper Card */}
      {selectedPub && (
        <div className="pub-modal-overlay" onClick={() => setSelectedPub(null)}>
          <div
            className="pub-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="pub-modal-close-btn"
              onClick={() => setSelectedPub(null)}
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>

            <article className="pub-editorial-card modal-view">
              {/* Glowing Ambient Top Highlight & Border */}
              <div className="pub-card-glow" />
              <div className="pub-card-border" />

              {/* Neural Network Research Watermark */}
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
                {/* Top Bar */}
                <div className="pub-top-bar">
                  <div className="pub-index-tag">
                    <span className="index-bracket">[</span>
                    <span className="index-text">PEER-REVIEWED CONFERENCE PROCEEDING</span>
                    <span className="index-bracket">]</span>
                  </div>

                  <div className={`pub-status-pill status-${selectedPub.status || 'published'}`}>
                    <span className="pub-pulse-dot" />
                    <span className="pub-status-text">
                      {t(`publications.${STATUS_KEY[selectedPub.status] || 'status_published'}`)}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="pub-editorial-title">{selectedPub.title}</h3>

                {/* Authors & Venue */}
                <div className="pub-meta-duo-row">
                  <div className="pub-meta-col pub-meta-col-authors">
                    <span className="pub-field-label">AUTHORS</span>
                    <div className="pub-authors-high-contrast">
                      {selectedPub.authors.split(',').map((author, aIdx, arr) => {
                        const cleanName = author.trim();
                        const isSelf = cleanName.toLowerCase().includes('emanuele ragozzini');
                        return (
                          <span
                            key={aIdx}
                            className={`author-name ${isSelf ? 'author-self-highlight' : 'author-colleague'}`}
                          >
                            {cleanName}
                            {aIdx < arr.length - 1 && <span className="author-sep">, </span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pub-meta-col pub-meta-col-venue">
                    <span className="pub-field-label">VENUE</span>
                    <div className="pub-venue-details">
                      <span className="venue-name">{selectedPub.venue}</span>
                      <span className="venue-year-badge">{selectedPub.year}</span>
                    </div>
                  </div>
                </div>

                {/* Abstract Narrative */}
                <div className="pub-abstract-narrative">
                  <span className="pub-field-label abstract-label">ABSTRACT</span>
                  <p className="pub-abstract-text">{selectedPub.abstract}</p>
                </div>

                {/* DOI & Pills */}
                <div className="pub-footer-row">
                  {selectedPub.doi && (
                    <a
                      href={`https://doi.org/${selectedPub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pub-doi-btn"
                    >
                      <span className="doi-tag-prefix">DOI</span>
                      <span className="doi-tag-id">{selectedPub.doi}</span>
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
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
