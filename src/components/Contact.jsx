import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GitFork, Link2, Mail, BookOpen } from 'lucide-react';
import './Contact.css';

const SOCIALS = [
  { id: 'github', icon: <GitFork size={22} />, label: 'GitHub', href: 'https://github.com/ManuelRix-11' },
  { id: 'linkedin', icon: <Link2 size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/emanuele-ragozzini/' },
  { id: 'scholar', icon: <BookOpen size={22} />, label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Emanuele-Ragozzini?ev=hdr_xprf/' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [ref, visible] = useScrollAnimation();

  return (
    <section className="section section-alt" id="contact">
      <div className="container" ref={ref}>
        <div className={`fade-in${visible ? ' visible' : ''}`}>
          <p className="section-label">{t('contact.subtitle')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.description')}</p>
        </div>

        <div className={`contact-socials-centered fade-in fade-in-delay-1${visible ? ' visible' : ''}`}>
          {SOCIALS.map(s => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              id={`social-${s.id}`}
            >
              <span className="social-icon">{s.icon}</span>
              <span className="social-label">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
