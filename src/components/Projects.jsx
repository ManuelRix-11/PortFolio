import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

export default function Projects() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section" id="projects">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('projects.subtitle')}</p>
          <h2 className="section-title">{t('projects.title')}</h2>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`project-card fade-in fade-in-delay-${(i % 3) + 1}${visible ? ' visible' : ''}`}
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setSelected(p)}
            >
              <div className="project-accent" style={{ background: p.color }} />
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.shortDesc}</p>
                <div className="project-footer">
                  <div className="project-tags">
                    {p.tags.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                  <span className="project-cta">
                    {t('projects.view_details')} <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
