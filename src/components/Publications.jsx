import { useTranslation } from 'react-i18next';
import { publications } from '../data/publications';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { BookOpen, ExternalLink } from 'lucide-react';
import './Publications.css';

const STATUS_KEY = { published: 'status_published', review: 'status_review', preprint: 'status_preprint' };

export default function Publications() {
  const { t } = useTranslation();
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section section-alt" id="publications">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('publications.subtitle')}</p>
          <h2 className="section-title">{t('publications.title')}</h2>
        </div>

        <div className="pub-list">
          {publications.map((pub, i) => (
            <div key={pub.id} className={`pub-card fade-in fade-in-delay-${i + 1}${visible ? ' visible' : ''}`}>
              <div className="pub-icon"><BookOpen size={18} /></div>
              <div className="pub-content">
                <div className="pub-header">
                  <h3 className="pub-title">{pub.title}</h3>
                  <span className={`pub-status ${pub.status}`}>
                    {t(`publications.${STATUS_KEY[pub.status]}`)}
                  </span>
                </div>
                <p className="pub-authors">{pub.authors} · {<br />} {pub.venue} · {pub.year}</p>
                <p className="pub-abstract">{pub.abstract}</p>
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="pub-doi">
                    DOI <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
