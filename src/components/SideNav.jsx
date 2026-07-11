import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './SideNav.css';

const SECTIONS = [
  'hero',
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'publications',
  'certifications',
  'contact',
];

export default function SideNav() {
  const { t } = useTranslation();
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show sidebar only after scrolling past the hero
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className={`side-nav${visible ? ' visible' : ''}`} aria-label="Section navigation">
      {SECTIONS.map(id => (
        <button
          key={id}
          className={`side-nav-item${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          title={id === 'hero' ? 'Top' : t(`nav.${id}`, id)}
          aria-label={id === 'hero' ? 'Top' : t(`nav.${id}`, id)}
        >
          <span className="side-nav-bar" />
          <span className="side-nav-label">
            {id === 'hero' ? 'Top' : t(`nav.${id}`, id)}
          </span>
        </button>
      ))}
    </nav>
  );
}
