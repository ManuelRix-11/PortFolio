import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import './Contact.css';

// Crisp Branded SVG Icons
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function ResearchGateIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437l-.046.22c-.083.4-.1.68-.052.839.053.16.184.24.394.24.128 0 .26-.037.397-.11.135-.074.275-.195.42-.36.143-.167.284-.367.42-.6.136-.232.277-.47.42-.714.143-.243.29-.472.44-.687.15-.213.315-.386.495-.518.18-.13.385-.2.613-.2.32 0 .59.102.808.307.218.204.327.495.327.873 0 .344-.093.68-.28 1.01-.186.328-.456.643-.81.944a9.92 9.92 0 0 1-1.22.86c-.453.272-.942.508-1.467.708-.525.2-1.07.337-1.637.41a9.97 9.97 0 0 1-1.683.058c-.615-.02-1.23-.113-1.844-.28-.616-.166-1.207-.42-1.775-.76-.567-.342-1.075-.78-1.523-1.314C3.89 4.79 3.55 4.147 3.328 3.42 3.104 2.695 3 1.892 3 1.01V0H0v24h3.125v-9.673c.48.51 1.042.94 1.684 1.288.643.35 1.34.618 2.09.803.753.187 1.537.28 2.353.28.988 0 1.93-.133 2.825-.4.896-.266 1.7-.66 2.414-1.18.714-.52 1.287-1.173 1.72-1.96.43-.786.646-1.71.646-2.772 0-.853-.162-1.656-.484-2.408-.323-.75-.8-1.41-1.433-1.98-.633-.57-1.415-1.025-2.346-1.365a12.56 12.56 0 0 0-3.08-.544c.485-.25.96-.54 1.424-.87.465-.33.882-.7 1.252-1.11.37-.41.67-.86.9-1.35.23-.49.345-1.02.345-1.59 0-.82-.244-1.52-.733-2.1-.488-.58-1.18-.87-2.074-.87z" />
    </svg>
  );
}

// ponytail: refined dark banner card eliminates bright blue glare while keeping mockup structure
export default function Contact() {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const isItalian = i18n.language === 'it';

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-container">
        <motion.div
          className="contact-banner-card"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Background Glow Aura */}
          <div className="contact-card-glow" aria-hidden="true" />

          {/* Decorative Orbital Rings in Bottom Right */}
          <svg className="contact-card-orb" viewBox="0 0 300 300" aria-hidden="true">
            <circle cx="150" cy="150" r="140" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 12" />
            <circle cx="150" cy="150" r="90" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="30 16" />
          </svg>

          {/* Display Title with Signature Gradient */}
          <h2 className="contact-banner-title">
            {isItalian ? (
              <>
                Costruiamo qualcosa di <span className="contact-title-gradient">intelligente.</span>
              </>
            ) : (
              <>
                Let's build something <span className="contact-title-gradient">intelligent.</span>
              </>
            )}
          </h2>

          {/* Narrative Lead */}
          <p className="contact-banner-desc">
            {t('contact.description')}
          </p>

          {/* Pill Action Buttons */}
          <div className="contact-pills-row">s
            <a
              href="https://www.linkedin.com/in/emanuele-ragozzini/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill contact-pill-primary"
            >
              <LinkedinIcon size={16} />
              <span>{t('contact.linkedin_btn', 'LinkedIn')}</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </a>

            <a
              href="https://github.com/ManuelRix-11"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill contact-pill-outline"
            >
              <GithubIcon size={16} />
              <span>{t('contact.github_btn', 'GitHub')}</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </a>

            <a
              href="https://www.researchgate.net/profile/Emanuele-Ragozzini?ev=hdr_xprf/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill contact-pill-outline"
            >
              <ResearchGateIcon size={16} />
              <span>{t('contact.scholar_btn', 'ResearchGate')}</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </a>
          </div>

          {/* Telemetry info bar */}
          <div className="contact-telemetry-row">
            <span>{t('contact.location', 'Salerno / Caserta · Italia')}</span>
            <span className="telemetry-sep">·</span>
            <span>{t('contact.timezone', 'CET (UTC+1) · Risposta rapida')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
