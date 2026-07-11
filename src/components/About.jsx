import { useTranslation } from 'react-i18next';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

export default function About() {
  const { t } = useTranslation();
  const [ref, visible] = useScrollAnimation();

  const highlights = [
    { icon: <GraduationCap size={22} />, label: t('about.highlight_degree'), sub: t('about.highlight_degree_sub') },
    { icon: <BookOpen size={22} />, label: t('about.highlight_master'), sub: t('about.highlight_master_sub') },
    { icon: <Briefcase size={22} />, label: t('about.highlight_job'), sub: t('about.highlight_job_sub') },
  ];

  return (
    <section className="section" id="about">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('about.subtitle')}</p>
          <h2 className="section-title">{t('about.title')}</h2>
        </div>

        <div className="about-grid">
          <div className={`about-text fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
            <p>{t('about.bio')}</p>
            <p>{t('about.bio2')}</p>
          </div>

          <div className={`about-highlights fade-in fade-in-delay-2${visible ? ' visible' : ''}`}>
            {highlights.map((h, i) => (
              <div className="highlight-card" key={i}>
                <span className="highlight-icon">{h.icon}</span>
                <div>
                  <strong>{h.label}</strong>
                  <p>{h.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
