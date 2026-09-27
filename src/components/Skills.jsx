import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Code2, BrainCircuit, Globe2, Blocks } from 'lucide-react';
import './Skills.css';

const SYSTEMS = [
  {
    id: 'languages',
    label: { it: 'Linguaggi', en: 'Languages' },
    symbol: <Code2 size={24} strokeWidth={2} />,
    color: '#4F6EF7',
    pos: { cx: 185, cy: 185 },
    rings: [
      {
        dir: 'cw', dur: 18, r: 98,
        items: [
          { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
          { name: 'R',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
          { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
          { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
          { name: 'Bash',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    label: { it: 'AI / ML', en: 'AI / ML' },
    symbol: <BrainCircuit size={24} strokeWidth={2} />,
    color: '#818CF8',
    pos: { cx: 620, cy: 200 },
    rings: [
      {
        dir: 'cw', dur: 24, r: 90,
        items: [
          { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
          { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
          { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
          { name: 'OpenCV',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
          { name: 'Jupyter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
        ],
      },
      {
        dir: 'ccw', dur: 36, r: 155,
        items: [
          { name: 'TensorFlow',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
          { name: 'PyTorch',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
          { name: 'HuggingFace', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
          { name: 'LangChain',   icon: 'https://cdn.worldvectorlogo.com/logos/langchain-1.svg', dark: true },
        ],
      },
    ],
  },
  {
    id: 'web',
    label: { it: 'Web & API', en: 'Web & API' },
    symbol: <Globe2 size={24} strokeWidth={2} />,
    color: '#34D399',
    pos: { cx: 270, cy: 530 },
    rings: [
      {
        dir: 'ccw', dur: 28, r: 110,
        items: [
          { name: 'React',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
          { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
          { name: 'Flask',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', dark: true },
        ],
      },
    ],
  },
  {
    id: 'devops',
    label: { it: 'Tools & DevOps', en: 'Tools & DevOps' },
    symbol: <Blocks size={24} strokeWidth={2} />,
    color: '#FBBF24',
    pos: { cx: 668, cy: 505 },
    rings: [
      {
        dir: 'cw', dur: 32, r: 110,
        items: [
          { name: 'Docker',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
          { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
          { name: 'GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', dark: true },
          { name: 'Linux',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
          { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
          { name: 'Qdrant',  icon: 'https://avatars.githubusercontent.com/u/73504361?s=200&v=4' },
        ],
      },
    ],
  },
];

/* ── Interactive Neural Network Canvas Component ── */
function SkillsCanvas({ mouseRef, isSectionVisible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isIntersecting = isSectionVisible;
    let width = 0;
    let height = 0;
    let particles = [];

    // System themed palette: Languages, AI, Web, DevOps, Soft Sky
    const PALETTE = [
      'rgba(79, 110, 247, ',
      'rgba(129, 140, 248, ',
      'rgba(52, 211, 153, ',
      'rgba(251, 191, 36, ',
      'rgba(147, 197, 253, ',
    ];

    const initSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Adaptive lightweight particle density
      const count = Math.min(Math.floor((width * height) / 16000), 52);
      particles = [];
      for (let i = 0; i < Math.max(count, 24); i++) {
        const colorPrefix = PALETTE[i % PALETTE.length];
        const baseAlpha = 0.2 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.2 + Math.random() * 1.5,
          colorPrefix,
          baseAlpha,
        });
      }
    };

    initSize();

    // ResizeObserver on parent
    const resizeObserver = new ResizeObserver(() => {
      initSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // IntersectionObserver to pause loop when scrolled away
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!animId) loop();
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    // Tab visibility handling
    const handleVisibility = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else if (isIntersecting && !animId) {
        loop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const maxLineDist = 120;
    const mouseRadius = 140;

    const loop = () => {
      if (!isIntersecting) return;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const len = particles.length;

      // Update & render particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Motion drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries with padding
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Cursor dynamic reaction: subtle fluid repulsion and synaptic connections
        if (mouse && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius && dist > 0.001) {
            const force = (1 - dist / mouseRadius) * 0.85;
            p.x += (dx / dist) * force * 1.4;
            p.y += (dy / dist) * force * 1.4;

            // Draw synaptic connection line from particle to cursor
            if (dist < 110) {
              const lineAlpha = (1 - dist / 110) * 0.32;
              ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.85;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        // Draw particle node
        ctx.fillStyle = `${p.colorPrefix}${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect mutual neighbors
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxLineDist) {
            const alpha = (1 - dist / maxLineDist) * 0.17;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [mouseRef, isSectionVisible]);

  return <canvas ref={canvasRef} className="skills-canvas" aria-hidden="true" />;
}

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'it' ? 'it' : 'en';
  const [ref, visible] = useScrollAnimation();

  // Mouse & Hover state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, active: false });
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredHub, setHoveredHub] = useState(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, active: true };
    setCursorPos({ x, y, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
    setCursorPos((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <section
      className="section section-alt skills-section"
      id="skills"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Signature Neural Canvas Background */}
      <SkillsCanvas mouseRef={mouseRef} isSectionVisible={visible} />

      {/* Dynamic Cursor-following Radial Glow */}
      <div
        className={`skills-cursor-glow ${cursorPos.active ? 'active' : ''}`}
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
        aria-hidden="true"
      />

      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label skills-section-label">{t('skills.subtitle')}</p>
          <h2 className="section-title">{t('skills.title')}</h2>
        </div>

        {/* ── Mobile Bento-Grid layout (< 900px) ── */}
        <div className={`skills-bento-grid fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
          {SYSTEMS.map((sys, idx) => {
            const allItems = sys.rings.flatMap((r) => r.items);
            return (
              <div
                key={sys.id}
                className={`bento-card bento-card-${sys.id}`}
                style={{ '--c': sys.color }}
              >
                <div className="bento-glow-corner" />
                <div className="bento-header">
                  <div className="bento-header-main">
                    <span className="bento-icon-box">{sys.symbol}</span>
                    <div className="bento-title-col">
                      <span className="bento-meta-tag">{`// 0${idx + 1} · ${sys.id.toUpperCase()}`}</span>
                      <h3 className="bento-title">{sys.label[lang]}</h3>
                    </div>
                  </div>
                  <span className="bento-counter">
                    {allItems.length < 10 ? `0${allItems.length}` : allItems.length} SKILLS
                  </span>
                </div>

                <div className="bento-badges">
                  {allItems.map((item) => (
                    <div key={item.name} className="bento-badge">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="bento-badge-icon"
                        style={item.dark ? { filter: 'brightness(0) invert(1)' } : undefined}
                        onError={(e) => { e.target.style.opacity = '0'; }}
                      />
                      <span className="bento-badge-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Desktop Living Solar System (≥ 900px) ── */}
      <div className="universe-wrap">
        {/* Desktop Telemetry HUD */}
        <div className="universe-hud">
          <div className="hud-badge">
            <span className="hud-status-dot" />
            <span className="hud-status-text">NEURAL ORBITAL SYSTEM // ACTIVE</span>
          </div>
          <div className="hud-counters">
            {SYSTEMS.map((sys) => {
              const count = sys.rings.flatMap((r) => r.items).length;
              return (
                <span key={sys.id} className="hud-counter-item">
                  <span className="hud-dot" style={{ background: sys.color }} />
                  <span className="hud-name">{sys.label[lang]}:</span>
                  <span className="hud-num">{count < 10 ? `0${count}` : count}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className={`universe fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
          {/* Subtle SVG Constellation Lines connecting hubs */}
          <svg className="universe-constellations" viewBox="0 0 900 720" aria-hidden="true">
            <defs>
              <linearGradient id="line-lang-ai" x1="185" y1="185" x2="620" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="line-lang-web" x1="185" y1="185" x2="270" y2="530" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="line-ai-ops" x1="620" y1="200" x2="668" y2="505" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="line-web-ops" x1="270" y1="530" x2="668" y2="505" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#34D399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="line-lang-ops" x1="185" y1="185" x2="668" y2="505" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="line-ai-web" x1="620" y1="200" x2="270" y2="530" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            <line
              x1="185" y1="185" x2="620" y2="200"
              stroke="url(#line-lang-ai)"
              strokeDasharray="4 6"
              className={`constellation-line ${hoveredHub === 'languages' || hoveredHub === 'ai' ? 'is-active' : ''}`}
            />
            <line
              x1="185" y1="185" x2="270" y2="530"
              stroke="url(#line-lang-web)"
              strokeDasharray="4 6"
              className={`constellation-line ${hoveredHub === 'languages' || hoveredHub === 'web' ? 'is-active' : ''}`}
            />
            <line
              x1="620" y1="200" x2="668" y2="505"
              stroke="url(#line-ai-ops)"
              strokeDasharray="4 6"
              className={`constellation-line ${hoveredHub === 'ai' || hoveredHub === 'devops' ? 'is-active' : ''}`}
            />
            <line
              x1="270" y1="530" x2="668" y2="505"
              stroke="url(#line-web-ops)"
              strokeDasharray="4 6"
              className={`constellation-line ${hoveredHub === 'web' || hoveredHub === 'devops' ? 'is-active' : ''}`}
            />
            <line
              x1="185" y1="185" x2="668" y2="505"
              stroke="url(#line-lang-ops)"
              strokeDasharray="3 8"
              className={`constellation-line ${hoveredHub === 'languages' || hoveredHub === 'devops' ? 'is-active' : ''}`}
            />
            <line
              x1="620" y1="200" x2="270" y2="530"
              stroke="url(#line-ai-web)"
              strokeDasharray="3 8"
              className={`constellation-line ${hoveredHub === 'ai' || hoveredHub === 'web' ? 'is-active' : ''}`}
            />
          </svg>

          {SYSTEMS.map((sys) => {
            const allItems = sys.rings.flatMap((r) => r.items);
            const isHubHovered = hoveredHub === sys.id;

            return (
              <div
                key={sys.id}
                className={`sys-wrap ${isHubHovered ? 'is-hub-active' : ''}`}
                style={{ '--cx': `${sys.pos.cx}px`, '--cy': `${sys.pos.cy}px`, '--c': sys.color }}
              >
                {sys.rings.map((ring, ri) => {
                  const isRingPaused = ring.items.some((it) => it.name === hoveredSkill);
                  return (
                    <div
                      key={ri}
                      className={`sys-ring ring-${ring.dir} ${isRingPaused ? 'is-paused' : ''}`}
                      style={{
                        width: ring.r * 2,
                        height: ring.r * 2,
                        borderColor: `${sys.color}28`,
                        animationDuration: `${ring.dur}s`,
                        '--ring-dur': `${ring.dur}s`,
                      }}
                    >
                      {ring.items.map((item, i) => {
                        const angle = (360 / ring.items.length) * i;
                        const isItemHovered = hoveredSkill === item.name;
                        return (
                          <div
                            key={item.name}
                            className="sys-item"
                            style={{
                              transform: `rotate(${angle}deg) translateX(${ring.r}px) rotate(-${angle}deg)`,
                            }}
                            onMouseEnter={() => setHoveredSkill(item.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div
                              className={`sys-icon-bg icon-${ring.dir} ${isRingPaused ? 'is-paused' : ''} ${isItemHovered ? 'is-active' : ''}`}
                              style={{
                                animationDuration: `${ring.dur}s`,
                              }}
                            >
                              <img
                                src={item.icon}
                                alt={item.name}
                                className="sys-icon"
                                style={item.dark ? { filter: 'brightness(0) invert(1)' } : undefined}
                                onError={(e) => { e.target.style.opacity = '0'; }}
                              />

                              {/* Elegant Tooltip with Active Glowing Ring */}
                              <div className="sys-tooltip" role="tooltip">
                                <span className="sys-tooltip-dot" style={{ background: sys.color }} />
                                <span className="sys-tooltip-text">{item.name}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Central Hub with Pulse on Hover */}
                <div
                  className="sys-center"
                  style={{ '--c': sys.color }}
                  onMouseEnter={() => setHoveredHub(sys.id)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <div className="sys-hub-radar" />
                  <span className="sys-symbol">{sys.symbol}</span>
                  <span className="sys-name">{sys.label[lang]}</span>
                  <span className="sys-hub-count">{allItems.length} SKILLS</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
