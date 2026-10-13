import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import './Skills.css';

// ponytail: Simplified modular skills rows matching mockup with clean dark glass cards & badge dots
const SKILL_CATEGORIES = [
  {
    id: 'languages',
    labelKey: 'skills.categories.languages',
    defaultLabel: 'Linguaggi',
    color: '#818CF8', // accent soft blue/indigo
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },
  {
    id: 'ai',
    labelKey: 'skills.categories.ai',
    defaultLabel: 'AI / ML',
    color: '#A78BFA', // purple/violet
    skills: [
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
      { name: 'HuggingFace', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
      { name: 'LangChain', icon: 'https://cdn.worldvectorlogo.com/logos/langchain-1.svg', dark: true },
      { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ],
  },
  {
    id: 'web',
    labelKey: 'skills.categories.web',
    defaultLabel: 'Web & API',
    color: '#34D399', // emerald / cyan
    skills: [
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', dark: true },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
  },
  {
    id: 'devops',
    labelKey: 'skills.categories.devops',
    defaultLabel: 'Tools & DevOps',
    color: '#FBBF24', // amber
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', dark: true },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Qdrant', icon: 'https://avatars.githubusercontent.com/u/73504361?s=200&v=4' },
    ],
  },
];

export default function Skills() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [activeTooltip, setActiveTooltip] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section skills-section" id="skills">
      <div className="container skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <span className="skills-kicker">{t('skills.kicker', '04 — Tecnologie e strumenti che utilizzo')}</span>
          <h2 className="skills-title">{t('skills.title', 'Competenze')}</h2>
        </div>

        {/* Master Card Container */}
        <motion.div
          className="skills-card-board"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              className={`skills-row skills-row-${cat.id}`}
              variants={rowVariants}
              style={{ '--cat-color': cat.color }}
            >
              {/* Left Column: Category Info */}
              <div className="skills-row-meta">
                <div className="skills-row-title-wrap">
                  <span className="skills-row-dot" style={{ backgroundColor: cat.color }} />
                  <h3 className="skills-row-title">{t(cat.labelKey, cat.defaultLabel)}</h3>
                </div>
                <span className="skills-row-count">
                  {cat.skills.length} {t('skills.skills_count', 'SKILLS')}
                </span>
              </div>

              {/* Right Column: Icon Chips Grid */}
              <div className="skills-chips-wrap">
                {cat.skills.map((skill) => {
                  const tooltipKey = `${cat.id}-${skill.name}`;
                  const isHovered = activeTooltip === tooltipKey;

                  return (
                    <div
                      key={skill.name}
                      className="skill-chip"
                      onMouseEnter={() => setActiveTooltip(tooltipKey)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onFocus={() => setActiveTooltip(tooltipKey)}
                      onBlur={() => setActiveTooltip(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={skill.name}
                    >
                      <div className="skill-chip-inner">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="skill-icon"
                          style={skill.dark ? { filter: 'brightness(0) invert(1)' } : undefined}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.style.display = 'block';
                            }
                          }}
                        />
                        <span className="skill-icon-fallback" style={{ display: 'none' }}>
                          {skill.name.charAt(0)}
                        </span>
                      </div>

                      {/* Floating Tooltip */}
                      {isHovered && (
                        <div className="skill-tooltip" role="tooltip">
                          <span className="skill-tooltip-dot" style={{ backgroundColor: cat.color }} />
                          <span className="skill-tooltip-name">{skill.name}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
