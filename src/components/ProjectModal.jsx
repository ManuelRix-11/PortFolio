import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, GitFork, ExternalLink, Dna, Activity, Terminal, Sparkles } from 'lucide-react';
import './ProjectModal.css';

// Project 1: Featured Siamese Neural Network Visual Preview
function SnnVisualPreview() {
  return (
    <div className="modal-snn-container">
      <div className="snn-preview-header">
        <div className="snn-hud-badge">
          <span className="hud-pulse-dot" />
          <span className="hud-text">SIAMESE NN DUAL-BRANCH ARCHITECTURE</span>
        </div>
        <div className="snn-dim-chip">128-D LATENT SPACE</div>
      </div>

      <div className="snn-diagram-stage">
        <svg
          className="snn-svg"
          viewBox="0 0 460 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="modalStreamA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="modalStreamB" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="modalConvGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
            <filter id="modalGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Branch A (Top) */}
          <path d="M 60 55 C 130 55, 140 65, 190 65" stroke="url(#modalStreamA)" strokeWidth="2.5" strokeDasharray="4 3" className="snn-path-line" />
          <path d="M 230 65 C 290 65, 310 95, 350 105" stroke="url(#modalStreamA)" strokeWidth="2" className="snn-path-line" />

          {/* Branch B (Bottom) */}
          <path d="M 60 155 C 130 155, 140 145, 190 145" stroke="url(#modalStreamB)" strokeWidth="2.5" strokeDasharray="4 3" className="snn-path-line" />
          <path d="M 230 145 C 290 145, 310 115, 350 105" stroke="url(#modalStreamB)" strokeWidth="2" className="snn-path-line" />

          {/* Metric Comparison Output */}
          <path d="M 390 105 L 430 105" stroke="url(#modalConvGrad)" strokeWidth="3" filter="url(#modalGlowFilter)" className="snn-path-output" />

          {/* Nodes - Input A */}
          <circle cx="50" cy="55" r="14" fill="#111827" stroke="#4F6EF7" strokeWidth="2" />
          <circle cx="50" cy="55" r="5" fill="#4F6EF7" className="snn-pulse-circle" />

          {/* Nodes - Input B */}
          <circle cx="50" cy="155" r="14" fill="#111827" stroke="#00C2FF" strokeWidth="2" />
          <circle cx="50" cy="155" r="5" fill="#00C2FF" className="snn-pulse-circle" />

          {/* Encoder Twin A */}
          <rect x="190" y="42" width="40" height="46" rx="8" fill="#111827" stroke="#818CF8" strokeWidth="1.8" />
          <text x="210" y="69" textAnchor="middle" fill="#818CF8" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">f_θ</text>

          {/* Encoder Twin B */}
          <rect x="190" y="122" width="40" height="46" rx="8" fill="#111827" stroke="#34D399" strokeWidth="1.8" />
          <text x="210" y="149" textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">f_θ</text>

          {/* Shared Weights Link */}
          <line x1="210" y1="88" x2="210" y2="122" stroke="rgba(255, 255, 255, 0.25)" strokeDasharray="3 3" />
          <text x="228" y="108" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">W_shared</text>

          {/* Distance Comparator Node */}
          <circle cx="370" cy="105" r="18" fill="#0D1117" stroke="#34D399" strokeWidth="2.5" filter="url(#modalGlowFilter)" />
          <text x="370" y="109" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">||d||</text>

          {/* Output Node */}
          <circle cx="435" cy="105" r="8" fill="#34D399" filter="url(#modalGlowFilter)" />
        </svg>

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

// Project 2: LLM Prompt Design & Synthetic Clinical Data Evaluation Pipeline
function LlmVisualPreview() {
  return (
    <div className="modal-snn-container">
      <div className="snn-preview-header">
        <div className="snn-hud-badge">
          <span className="hud-pulse-dot" />
          <span className="hud-text">LLM PROMPT EVALUATION PIPELINE</span>
        </div>
        <div className="snn-dim-chip">SYNTHETIC HEALTHCARE EHR</div>
      </div>

      <div className="snn-diagram-stage">
        <svg
          className="snn-svg"
          viewBox="0 0 460 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="llmStreamA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="llmStreamB" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="llmOutputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
            <filter id="llmGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Pathways: Prompts to LLM Engine */}
          <path d="M 65 60 C 130 60, 140 90, 185 95" stroke="url(#llmStreamA)" strokeWidth="2.5" strokeDasharray="4 3" className="snn-path-line" />
          <path d="M 65 150 C 130 150, 140 120, 185 115" stroke="url(#llmStreamB)" strokeWidth="2.5" strokeDasharray="4 3" className="snn-path-line" />

          {/* LLM Engine to Statistical Evaluator */}
          <path d="M 275 105 L 345 105" stroke="url(#llmStreamB)" strokeWidth="2.5" className="snn-path-line" />
          <path d="M 390 105 L 430 105" stroke="url(#llmOutputGrad)" strokeWidth="3" filter="url(#llmGlow)" className="snn-path-output" />

          {/* Input Node 1: Structured Prompt */}
          <circle cx="50" cy="60" r="14" fill="#111827" stroke="#4F6EF7" strokeWidth="2" />
          <circle cx="50" cy="60" r="5" fill="#4F6EF7" className="snn-pulse-circle" />

          {/* Input Node 2: Narrative Prompt */}
          <circle cx="50" cy="150" r="14" fill="#111827" stroke="#818CF8" strokeWidth="2" />
          <circle cx="50" cy="150" r="5" fill="#818CF8" className="snn-pulse-circle" />

          {/* Central Transformer / LLM Engine Node */}
          <rect
            x="185"
            y="70"
            width="90"
            height="70"
            rx="10"
            fill="#111827"
            stroke="#818CF8"
            strokeWidth="2"
          />
          <text x="230" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="700" fontFamily="var(--font-mono)">LLM ENGINE</text>
          <text x="230" y="122" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">Attention Heads</text>

          {/* Evaluator Comparator Node (Statistical Fidelity) */}
          <circle
            cx="368"
            cy="105"
            r="20"
            fill="#0D1117"
            stroke="#34D399"
            strokeWidth="2.5"
            filter="url(#llmGlow)"
          />
          <text x="368" y="109" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">W_dist</text>

          {/* Output Node */}
          <circle cx="435" cy="105" r="8" fill="#34D399" filter="url(#llmGlow)" />
        </svg>

        {/* Dynamic Labels */}
        <div className="snn-node-label label-a">
          <span>Structured Prompt p₁</span>
        </div>
        <div className="snn-node-label label-b">
          <span>Narrative Prompt p₂</span>
        </div>
        <div className="snn-result-chip">
          <span className="res-tag">STATISTICAL FIDELITY</span>
          <span className="res-val">94.7%</span>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="snn-telemetry-bar">
        <div className="telemetry-item">
          <span className="telemetry-k">METRIC:</span>
          <span className="telemetry-v">Wasserstein Dist (0.04)</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-k">STATUS:</span>
          <span className="telemetry-v status-ok">VALIDATED ●</span>
        </div>
      </div>
    </div>
  );
}

// ponytail: rich architectural modal displaying project-tailored AI architecture diagrams
export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  const metrics = project.metrics || [
    { label: 'Paradigm', value: 'Few-Shot Learning' },
    { label: 'Loss Objective', value: 'Contrastive Metric' },
    { label: 'Domain', value: 'Computational Oncology' },
    { label: 'Framework', value: 'TensorFlow · Keras' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-architectural" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label={t('projects.close', 'Chiudi')}>
          <X size={18} />
        </button>

        <div className="modal-grid-content">
          {/* Left Column: Details & Telemetry */}
          <div className="modal-info-pane">
            <div className="modal-meta-header">
              <span className="modal-badge-tag">
                <Sparkles size={12} />
                <span>{project.badge || 'FEATURED R&D PROJECT'}</span>
              </span>
              <span className="modal-status-pill">
                <span className="modal-pulse-dot" />
                <span>ACTIVE MILESTONE</span>
              </span>
            </div>

            <h2 className="modal-project-title">{project.title}</h2>
            <p className="modal-project-desc">{project.fullDesc || project.shortDesc}</p>

            <div className="modal-tags-row">
              {project.tags.map((tag) => (
                <span className="modal-tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className="modal-telemetry-panel">
              <div className="telemetry-title-row">
                <Terminal size={12} />
                <span>SYSTEM ARCHITECTURE TELEMETRY</span>
              </div>
              <div className="telemetry-chips-grid">
                {metrics.map((m, idx) => (
                  <div className="telemetry-chip" key={idx}>
                    <span className="chip-label">{m.label}</span>
                    <span className="chip-val">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions-row">
              {project.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline modal-btn">
                  <GitFork size={15} /> <span>{t('projects.github', 'GitHub')}</span>
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary modal-btn">
                  <ExternalLink size={15} /> <span>{t('projects.demo', 'Demo')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Visual Architecture Preview tailored to Project */}
          <div className="modal-visual-pane">
            {project.id === 2 ? <LlmVisualPreview /> : <SnnVisualPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}
