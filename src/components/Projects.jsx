import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import { ArrowUpRight, Activity, Dna, Layers, Sparkles, Terminal } from 'lucide-react';
import './Projects.css';

// Featured Siamese Neural Network Visual Preview
function SnnVisualPreview({ isHovered, tilt }) {
  return (
    <div
      className={`snn-preview-container ${isHovered ? 'active' : ''}`}
      style={{
        transform: `translate3d(${tilt.ry * -1.2}px, ${tilt.rx * 1.2}px, 20px)`,
      }}
    >
      <div className="snn-preview-header">
        <div className="snn-hud-badge">
          <span className="hud-pulse-dot" />
          <span className="hud-text">SIAMESE NN DUAL-BRANCH ARCHITECTURE</span>
        </div>
        <div className="snn-dim-chip">128-D LATENT SPACE</div>
      </div>

      {/* SVG Neural Diagram with Animated Energy Paths */}
      <div className="snn-diagram-stage">
        <svg
          className="snn-svg"
          viewBox="0 0 460 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="streamGradA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="streamGradB" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="convergenceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Pathways */}
          {/* Branch A (Top) */}
          <path
            d="M 60 55 C 130 55, 140 65, 190 65"
            stroke="url(#streamGradA)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            className="snn-path-line"
          />
          <path
            d="M 230 65 C 290 65, 310 95, 350 105"
            stroke="url(#streamGradA)"
            strokeWidth="2"
            className="snn-path-line"
          />

          {/* Branch B (Bottom) */}
          <path
            d="M 60 155 C 130 155, 140 145, 190 145"
            stroke="url(#streamGradB)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            className="snn-path-line"
          />
          <path
            d="M 230 145 C 290 145, 310 115, 350 105"
            stroke="url(#streamGradB)"
            strokeWidth="2"
            className="snn-path-line"
          />

          {/* Metric Comparison Output */}
          <path
            d="M 390 105 L 430 105"
            stroke="url(#convergenceGrad)"
            strokeWidth="3"
            filter="url(#glowFilter)"
            className="snn-path-output"
          />

          {/* Nodes - Input A */}
          <circle cx="50" cy="55" r="14" fill="#111827" stroke="#4F6EF7" strokeWidth="2" />
          <circle cx="50" cy="55" r="5" fill="#4F6EF7" className="snn-pulse-circle" />

          {/* Nodes - Input B */}
          <circle cx="50" cy="155" r="14" fill="#111827" stroke="#00C2FF" strokeWidth="2" />
          <circle cx="50" cy="155" r="5" fill="#00C2FF" className="snn-pulse-circle" />

          {/* Encoder Twin A */}
          <rect
            x="190"
            y="42"
            width="40"
            height="46"
            rx="8"
            fill="#111827"
            stroke="#818CF8"
            strokeWidth="1.8"
          />
          <text x="210" y="69" textAnchor="middle" fill="#818CF8" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">f_θ</text>

          {/* Encoder Twin B */}
          <rect
            x="190"
            y="122"
            width="40"
            height="46"
            rx="8"
            fill="#111827"
            stroke="#34D399"
            strokeWidth="1.8"
          />
          <text x="210" y="149" textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">f_θ</text>

          {/* Shared Weights Link */}
          <line x1="210" y1="88" x2="210" y2="122" stroke="rgba(255, 255, 255, 0.25)" strokeDasharray="3 3" />
          <text x="228" y="108" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">W_shared</text>

          {/* Distance Comparator Node */}
          <circle
            cx="370"
            cy="105"
            r="18"
            fill="#0D1117"
            stroke="#34D399"
            strokeWidth="2.5"
            filter="url(#glowFilter)"
          />
          <text x="370" y="109" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">||d||</text>

          {/* Output Node */}
          <circle cx="435" cy="105" r="8" fill="#34D399" filter="url(#glowFilter)" />
        </svg>

        {/* Floating Telemetry Badges */}
        <div className="snn-node-label label-a">
          <Dna size={12} className="snn-label-icon" />
          <span>Profile x₁</span>
        </div>
        <div className="snn-node-label label-b">
          <Activity size={12} className="snn-label-icon" />
          <span>Subtype x₂</span>
        </div>
        <div className="snn-result-chip">
          <span className="res-tag">SIMILARITY CONCORDANCE</span>
          <span className="res-val">98.4%</span>
        </div>
      </div>

      {/* Telemetry Status Bar */}
      <div className="snn-telemetry-bar">
        <div className="telemetry-item">
          <span className="telemetry-k">LOSS:</span>
          <span className="telemetry-v">Contrastive Margin (0.12)</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-k">STATUS:</span>
          <span className="telemetry-v status-ok">CONVERGED ●</span>
        </div>
      </div>
    </div>
  );
}

// Bento Featured Card with Light Tilt and Hover Reveal
function BentoFeaturedCard({ project, onSelect, t }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, xPct: 50, yPct: 50, isHovered: false });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // Subtle tilt: max 4.5 degrees
    const rx = ((y - cy) / cy) * -4.5;
    const ry = ((x - cx) / cx) * 4.5;
    setTilt({
      rx,
      ry,
      xPct: (x / rect.width) * 100,
      yPct: (y / rect.height) * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, xPct: 50, yPct: 50, isHovered: false });
  }, []);

  const metrics = project.metrics || [
    { label: 'Paradigm', value: 'Few-Shot Learning' },
    { label: 'Loss Objective', value: 'Contrastive Metric' },
    { label: 'Domain', value: 'Computational Oncology' },
    { label: 'Framework', value: 'TensorFlow · Keras' },
  ];

  return (
    <motion.div
      className="bento-featured-wrapper"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`bento-card bento-featured ${tilt.isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
        style={{
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(0)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)',
          '--spotlight-x': `${tilt.xPct}%`,
          '--spotlight-y': `${tilt.yPct}%`,
        }}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div className="bento-spotlight" />

        {/* Glowing Gradient Border Envelope */}
        <div className="bento-border-glow" />

        <div className="bento-featured-content">
          {/* Left Column: Information & Metrics */}
          <div className="bento-info-pane">
            <div className="bento-meta-header">
              <span className="bento-category-tag">
                <Sparkles size={12} className="meta-icon" />
                <span>FEATURED R&amp;D PROJECT</span>
              </span>
              <span className="bento-status-pill">
                <span className="bento-pulse-dot" />
                <span>RESEARCH MILESTONE</span>
              </span>
            </div>

            <h3 className="bento-title">{project.title}</h3>
            <p className="bento-desc">{project.shortDesc}</p>

            {/* Tech Tag Chips in var(--font-mono) */}
            <div className="bento-tags-row">
              {project.tags.map((tag) => (
                <span className="bento-mono-tag" key={tag}>
                  <span className="tag-hash">#</span>
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactive Hover Reveal of Metrics/Details */}
            <div className="bento-metrics-reveal">
              <div className="metrics-reveal-header">
                <Terminal size={12} className="metrics-icon" />
                <span className="metrics-title">SYSTEM ARCHITECTURE TELEMETRY</span>
              </div>
              <div className="bento-metrics-grid">
                {metrics.map((m, idx) => (
                  <div className="metric-chip" key={idx}>
                    <span className="metric-label">{m.label}</span>
                    <span className="metric-value">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card CTA with Smooth Arrow Transition */}
            <div className="bento-action-row">
              <span className="bento-cta-btn">
                <span>{t('projects.view_details')}</span>
                <span className="arrow-box">
                  <ArrowUpRight size={16} className="bento-arrow-icon" />
                </span>
              </span>
              <span className="bento-hint-text">Click to open technical overview</span>
            </div>
          </div>

          {/* Right Column: Rich Visual Preview */}
          <div className="bento-visual-pane">
            <SnnVisualPreview isHovered={tilt.isHovered} tilt={tilt} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Standard Bento Card for other projects
function BentoStandardCard({ project, onSelect, t, index }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, xPct: 50, yPct: 50, isHovered: false });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -5;
    const ry = ((x - cx) / cx) * 5;
    setTilt({
      rx,
      ry,
      xPct: (x / rect.width) * 100,
      yPct: (y / rect.height) * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, xPct: 50, yPct: 50, isHovered: false });
  }, []);

  return (
    <motion.div
      className="bento-standard-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`bento-card bento-standard ${tilt.isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
        style={{
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(0)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)',
          '--spotlight-x': `${tilt.xPct}%`,
          '--spotlight-y': `${tilt.yPct}%`,
        }}
      >
        <div className="bento-spotlight" />
        <div className="bento-border-glow" />
        <div className="bento-accent-line" style={{ background: project.color }} />

        <div className="bento-body">
          <h4 className="bento-standard-title">{project.title}</h4>
          <p className="bento-standard-desc">{project.shortDesc}</p>

          <div className="bento-tags-row">
            {project.tags.slice(0, 3).map((tag) => (
              <span className="bento-mono-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="bento-footer">
            <span className="bento-cta-btn">
              <span>{t('projects.view_details')}</span>
              <span className="arrow-box">
                <ArrowUpRight size={15} className="bento-arrow-icon" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  // Identify featured projects (e.g. SNN project or first project)
  const featuredProject = projects.find((p) => p.featured || p.id === 1) || projects[0];
  const standardProjects = projects.filter((p) => p.id !== featuredProject.id);

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="projects-header-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-meta-chip">
            <Layers size={13} className="header-chip-icon" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <p className="section-label">{t('projects.subtitle')}</p>
          <h2 className="section-title">{t('projects.title')}</h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="projects-bento-grid">
          {featuredProject && (
            <BentoFeaturedCard
              project={featuredProject}
              onSelect={setSelected}
              t={t}
            />
          )}

          {standardProjects.map((p, idx) => (
            <BentoStandardCard
              key={p.id}
              project={p}
              onSelect={setSelected}
              t={t}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Retain Exact Modal Logic */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
