import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">ER<span>.</span></span>
        <p className="footer-copy">
          {t('footer.made_with')} <Heart size={13} className="footer-heart" /> {t('footer.and')} {t('footer.coffee')} · © {new Date().getFullYear()} Emanuele Ragozzini · {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
