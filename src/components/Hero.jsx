import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Mail, Download, Network } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true });
  // Build sequence: text, pause, text, pause...
  const sequence = roles.flatMap(r => [r, 2200]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      {/* Background orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="hero-grid" />

      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-greeting">{t('hero.greeting')}</p>
          <h1 className="hero-name">{t('hero.name')}</h1>

          <div className="hero-role">
            <TypeAnimation
              sequence={sequence}
              wrapper="span"
              speed={50}
              deletionSpeed={60}
              repeat={Infinity}
              cursor={true}
            />
          </div>

          <p className="hero-desc">{t('hero.description')}</p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
              <Mail size={16} /> {t('hero.cta_contact')}
            </button>
            <a href="/cv.pdf" download className="btn btn-outline">
              <Download size={16} /> {t('hero.cta_cv')}
            </a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-image-ring" />
          <img src={profileImg} alt="Emanuele Ragozzini" className="hero-image" />
          <div className="hero-image-glow" />
        </div>
      </div>

      <button className="hero-scroll" onClick={() => scrollTo('about')} aria-label={t('hero.scroll')}>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
