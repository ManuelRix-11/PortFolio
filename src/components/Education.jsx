import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Education.css';

export default function Education() {
  const { t } = useTranslation();
  const items = t('education.items', { returnObjects: true });
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section" id="education">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('education.subtitle')}</p>
          <h2 className="section-title">{t('education.title')}</h2>
        </div>

        <div className="education-grid">
          {items.map((item, i) => (
            <div key={i} className={`edu-card fade-in fade-in-delay-${i + 1}${visible ? ' visible' : ''}`}>
              <div className="edu-status">
                <span className={`status-badge ${item.status === 'In corso' || item.status === 'Ongoing' ? 'active' : 'done'}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="edu-degree">{item.degree}</h3>
              <p className="edu-school">{item.school}</p>
              <p className="edu-period">{item.period}</p>
              <p className="edu-desc">{item.description}</p>
              <div className="edu-bar">
                <div className="edu-bar-fill" style={{ width: item.status === 'In corso' || item.status === 'Ongoing' ? '60%' : '100%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
