import { useTranslation } from 'react-i18next';
import { MapPin, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Experience.css';

export default function Experience() {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true });
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section section-alt" id="experience">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('experience.subtitle')}</p>
          <h2 className="section-title">{t('experience.title')}</h2>
        </div>

        <div className="timeline">
          {items.map((item, i) => (
            <div key={i} className={`timeline-item fade-in fade-in-delay-${i + 1}${visible ? ' visible' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-company">{item.company}</span>
                  </div>
                  <div className="timeline-meta">
                    <span><Calendar size={13} /> {item.period}</span>
                    <span><MapPin size={13} /> {item.location}</span>
                  </div>
                </div>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
