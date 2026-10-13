import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import './Projects.css';

// SVG Animated Thumbnails from Mockup
function MockThumbnail({ index }) {
  const type = index % 3;

  if (type === 0) {
    // Network Graph
    return (
      <svg
        className="thumb-svg"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Network graph"
      >
        <g stroke="var(--primary)" strokeOpacity="0.6" fill="none">
          <path className="thumb-ln" d="M60 60L170 110L90 170" />
          <path className="thumb-ln" d="M170 110L290 60L340 150" />
          <path className="thumb-ln" d="M170 110L260 170L340 150" />
          <path className="thumb-ln" d="M290 60L340 150" />
        </g>
        <g fill="var(--primary)">
          <circle className="thumb-nd" cx="60" cy="60" r="8" />
          <circle className="thumb-nd" cx="170" cy="110" r="13" style={{ animationDelay: '0.5s' }} />
          <circle className="thumb-nd" cx="90" cy="170" r="8" style={{ animationDelay: '1s' }} />
          <circle className="thumb-nd" cx="290" cy="60" r="10" style={{ animationDelay: '1.5s' }} />
          <circle className="thumb-nd" cx="260" cy="170" r="8" style={{ animationDelay: '0.8s' }} />
          <circle className="thumb-nd" cx="340" cy="150" r="10" style={{ animationDelay: '0.3s' }} />
        </g>
      </svg>
    );
  }

  if (type === 1) {
    // Metric Chart with dynamic drawn curve
    return (
      <svg
        className="thumb-svg"
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Metric chart"
      >
        <g stroke="var(--border)">
          <path d="M30 60H380M30 110H380M30 160H380" />
        </g>
        <g fill="var(--primary)" fillOpacity="0.22">
          <rect x="50" y="130" width="28" height="60" rx="4" />
          <rect x="100" y="105" width="28" height="85" rx="4" />
          <rect x="150" y="120" width="28" height="70" rx="4" />
          <rect x="200" y="80" width="28" height="110" rx="4" />
          <rect x="250" y="95" width="28" height="95" rx="4" />
          <rect x="300" y="55" width="28" height="135" rx="4" />
        </g>
        <path
          className="thumb-dr"
          d="M30 160C80 150 100 110 150 120S220 70 260 85S330 40 380 30"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Cluster Plot / Latent Space
  return (
    <svg
      className="thumb-svg"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Cluster plot"
    >
      <g fill="var(--primary)">
        <circle className="thumb-nd" cx="90" cy="80" r="5" />
        <circle className="thumb-nd" cx="115" cy="100" r="4" style={{ animationDelay: '0.4s' }} />
        <circle className="thumb-nd" cx="80" cy="115" r="6" style={{ animationDelay: '0.9s' }} />
        <circle className="thumb-nd" cx="120" cy="70" r="3" style={{ animationDelay: '1.3s' }} />
        <circle className="thumb-nd" cx="105" cy="130" r="4" style={{ animationDelay: '0.2s' }} />
      </g>
      <g fill="var(--accent)" fillOpacity="0.8">
        <circle className="thumb-nd" cx="270" cy="70" r="5" />
        <circle className="thumb-nd" cx="295" cy="95" r="4" style={{ animationDelay: '0.6s' }} />
        <circle className="thumb-nd" cx="260" cy="100" r="6" style={{ animationDelay: '1.1s' }} />
        <circle className="thumb-nd" cx="300" cy="60" r="3" style={{ animationDelay: '0.3s' }} />
      </g>
      <g fill="var(--muted)">
        <circle className="thumb-nd" cx="200" cy="165" r="5" />
        <circle className="thumb-nd" cx="225" cy="180" r="4" style={{ animationDelay: '0.7s' }} />
        <circle className="thumb-nd" cx="180" cy="185" r="6" style={{ animationDelay: '1.2s' }} />
        <circle className="thumb-nd" cx="215" cy="150" r="3" style={{ animationDelay: '0.1s' }} />
      </g>
      <g fill="none" stroke="var(--border)" strokeDasharray="4 6">
        <circle cx="100" cy="100" r="50" />
        <circle cx="280" cy="80" r="50" />
        <circle cx="205" cy="170" r="45" />
      </g>
    </svg>
  );
}

// ponytail: mockup card grid on home page; clicking any card opens full architectural detail modal
export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="container projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <span className="projects-kicker">{t('projects.kicker', '03 — Progetti')}</span>
          <h2 className="projects-title">{t('projects.selected_works', 'Lavori selezionati')}</h2>
        </div>

        {/* Mockup Card Grid */}
        <motion.div
          className="projects-mock-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-mock-card"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
            >
              {/* Card Top: Animated SVG Visual */}
              <div className="project-mock-thumb">
                <MockThumbnail index={index} />
              </div>

              {/* Card Bottom: Metadata and Description */}
              <div className="project-mock-body">
                <div className="project-mock-idx">{`[0${index + 1}]`}</div>
                <h3 className="project-mock-title">{project.title}</h3>
                <p className="project-mock-desc">{project.shortDesc}</p>
                <div className="project-mock-tags">
                  <span>{project.tags.slice(0, 3).map((tg) => `#${tg}`).join(' ')} ↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Deep-Dive Architectural Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
