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
        dir: 'cw', dur: 22, r: 98,
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
        // Inner: data manipulation & classic ML tools (+ Jupyter)
        dir: 'cw', dur: 20, r: 90,
        items: [
          { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
          { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
          { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
          { name: 'OpenCV',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
          { name: 'Jupyter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
        ],
      },
      {
        // Outer: deep learning & LLM frameworks
        dir: 'ccw', dur: 34, r: 155,
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
        dir: 'ccw', dur: 26, r: 110,
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
        dir: 'cw', dur: 30, r: 110,
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

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'it' ? 'it' : 'en';
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section section-alt" id="skills">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('skills.subtitle')}</p>
          <h2 className="section-title">{t('skills.title')}</h2>
        </div>
      </div>

      <div className={`universe fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
        {SYSTEMS.map((sys) => (
          <div
            key={sys.id}
            className="sys-wrap"
            style={{ '--cx': `${sys.pos.cx}px`, '--cy': `${sys.pos.cy}px` }}
          >
            {sys.rings.map((ring, ri) => (
              <div
                key={ri}
                className={`sys-ring ring-${ring.dir}`}
                style={{
                  width: ring.r * 2,
                  height: ring.r * 2,
                  borderColor: `${sys.color}25`,
                  animationDuration: `${ring.dur}s`,
                }}
              >
                {ring.items.map((item, i) => {
                  const angle = (360 / ring.items.length) * i;
                  return (
                    <div
                      key={item.name}
                      className="sys-item"
                      style={{ transform: `rotate(${angle}deg) translateX(${ring.r}px) rotate(-${angle}deg)` }}
                      title={item.name}
                    >
                      {/*
                        ponytail: split into two elements so CSS filter on <img>
                        doesn't bleed onto the background circle.
                        .sys-icon-bg  → handles background, border, border-radius, counter-rotation
                        img           → handles image + optional invert filter (dark icons only)
                      */}
                      <div
                        className={`sys-icon-bg icon-${ring.dir}`}
                        style={{ animationDuration: `${ring.dur}s` }}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="sys-icon"
                          style={item.dark ? { filter: 'brightness(0) invert(1)' } : undefined}
                          onError={e => { e.target.style.opacity = '0'; }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="sys-center" style={{ '--c': sys.color }}>
              <span className="sys-symbol">{sys.symbol}</span>
              <span className="sys-name">{sys.label[lang]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
