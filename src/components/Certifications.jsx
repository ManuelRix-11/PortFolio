import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications';
import { ExternalLink, ShieldCheck, Calendar, Clock } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <section className="section" id="certifications">
      <div className="container">
        {/* Header Block */}
        <motion.div
          className="cert-header-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="cert-meta-chip">
            <ShieldCheck size={13} className="meta-chip-icon" />
            <span>VERIFIED ACADEMIC &amp; CLOUD CREDENTIALS</span>
          </div>
          <p className="section-label">{t('certifications.subtitle')}</p>
          <h2 className="section-title">{t('certifications.title')}</h2>
        </motion.div>

        {/* Verifiable Credentials Grid */}
        <div className="cert-grid">
          {certifications.map((cert, index) => {
            const hasValidLink = cert.link && cert.link !== '#';

            return (
              <motion.div
                key={cert.id}
                className="cert-card-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`cert-credential-card ${cert.status ? `status-${cert.status}` : ''}`}>
                  {/* Holographic Top Highlight */}
                  <div className="cert-holo-strip" />
                  <div className="cert-border-glow" />

                  <div className="cert-inner-content">
                    {/* Header: Provider Emblem + Status Badge */}
                    <div className="cert-top-row">
                      <div className="cert-emblem-wrap">
                        <span className="cert-emoji-badge">{cert.badge}</span>
                        <div className="cert-issuer-info">
                          <span className="cert-provider-name">{cert.provider}</span>
                          <span className="cert-provider-sub">Official Accreditation</span>
                        </div>
                      </div>

                      {cert.status && (
                        <div className={`cert-status-pill status-${cert.status}`}>
                          <span className="cert-pulse-dot" />
                          <span className="cert-status-text">
                            {t(`certifications.status_${cert.status}`)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body: Title & Cryptographic Meta */}
                    <div className="cert-body-content">
                      <h3 className="cert-title">{cert.title}</h3>
                      <div className="cert-registry-meta">
                        <span className="registry-prefix">CREDENTIAL ID //</span>
                        <span className="registry-code">
                          {cert.provider.toUpperCase()}-AI-2026-FND
                        </span>
                      </div>
                    </div>

                    {/* Footer: Mono Date Stamp & Verification Link */}
                    <div className="cert-bottom-row">
                      <div className="cert-mono-date-stamp">
                        <Calendar size={12} className="date-stamp-icon" />
                        <span className="date-stamp-label">ISSUED //</span>
                        <span className="date-stamp-value">{cert.date}</span>
                      </div>

                      {hasValidLink ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-verify-action"
                          aria-label={t('certifications.verify')}
                        >
                          <span className="verify-text">{t('certifications.verify')}</span>
                          <ExternalLink size={13} className="verify-icon" />
                        </a>
                      ) : (
                        <div className="cert-verify-badge-pending">
                          <Clock size={12} className="pending-icon" />
                          <span className="pending-text">{t('certifications.status_in-progress')}</span>
                        </div>
                      )}
                    </div>
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
