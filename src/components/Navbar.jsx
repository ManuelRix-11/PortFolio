import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Hexagon } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it');

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <span className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ER<span className="logo-dot">.</span>
        </span>

        <div className="navbar-actions">
          <button className="lang-btn" onClick={toggle} aria-label="Toggle language">
            {i18n.language === 'it' ? 'EN' : 'IT'}
          </button>
          <a href="/cv.pdf" download className="btn btn-primary btn-sm">
            <Download size={14} /> {t('nav.download_cv')}
          </a>
        </div>
      </div>
    </nav>
  );
}
