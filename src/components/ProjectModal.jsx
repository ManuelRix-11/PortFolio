import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, GitFork, ExternalLink } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label={t('projects.close')}>
          <X size={20} />
        </button>

        <div className="modal-accent" style={{ background: project.color }} />

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>

          <div className="modal-tags">
            {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
          </div>

          <p className="modal-desc">{project.fullDesc}</p>

          <div className="modal-actions">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <GitFork size={16} /> {t('projects.github')}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={16} /> {t('projects.demo')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
