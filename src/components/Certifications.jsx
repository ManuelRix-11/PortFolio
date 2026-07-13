import { useTranslation } from 'react-i18next';
import { certifications } from '../data/certifications';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  const { t } = useTranslation();
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section" id="certifications">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('certifications.subtitle')}</p>
          <h2 className="section-title">{t('certifications.title')}</h2>
        </div>

        <div className={`cert-grid fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
          {certifications.map(cert => (
            <div className="cert-card" key={cert.id}>
              <span className="cert-badge">{cert.badge}</span>
              <div className="cert-info">
                <div className="cert-title-row">
                  <h3 className="cert-title">{cert.title}</h3>
                  {cert.status && (
                    <span className={`cert-status cert-status--${cert.status}`}>
                      {t(`certifications.status_${cert.status}`)}
                    </span>
                  )}
                </div>
                <p className="cert-provider">{cert.provider}</p>
                <p className="cert-date">{cert.date}</p>
              </div>
              {cert.link && cert.link !== '#' && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link" aria-label={t('certifications.verify')}>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
