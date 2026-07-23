'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { LuMessageCircle, LuShieldCheck, LuGauge, LuShieldAlert } from 'react-icons/lu';

const badges = [
  {
    icon: <LuShieldCheck size={20} color="#DC2626" strokeWidth={1.8} />,
    title: 'PREMIUM QUALITY',
    subtitle: 'OEM Standard'
  },
  {
    icon: <LuGauge size={20} color="#DC2626" strokeWidth={1.8} />,
    title: 'PERFORMANCE TESTED',
    subtitle: 'Dynamometer Proven'
  },
  {
    icon: <LuShieldAlert size={20} color="#DC2626" strokeWidth={1.8} />,
    title: 'RUST RESISTANT',
    subtitle: 'Galvanised Steel'
  },
];

export default function HeroBanner() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const h = window.innerHeight;
    el.style.height = `${Math.min(h, 850)}px`;
  }, []);

  return (
    <section id="hero" className={styles.heroSection}>
      <div ref={heroRef} className={styles.heroContainer}>
        {/* Background Image */}
        <div className={styles.bgWrap}>
          <Image
            src="/images/bmw_hero.webp"
            alt="HI QUALITY SILENCERS BMW Hero"
            fill
            priority
            quality={90}
            className={styles.bgImage}
          />
        </div>

        {/* Mobile-optimized high-contrast gradient overlay */}
        <div className={styles.overlay} />

        {/* Hero Content */}
        <div className={styles.content}>
          <h1 className={styles.heroH1}>
            PREMIUM EXHAUST SYSTEMS
          </h1>

          <h2 className={styles.heroH2}>
            BUILT FOR PERFORMANCE.
          </h2>

          <p className={styles.heroDesc}>
            High quality silencers, exhaust systems and performance parts for unmatched power and sound.
          </p>

          {/* WhatsApp CTA Button */}
          <div className={styles.btnWrapper}>
            <a
              href="https://wa.me/919645888250"
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <LuMessageCircle size={18} color="#DC2626" /> Contact Us on WhatsApp
            </a>
          </div>

          {/* 3 Badges Row — Glassmorphism Cards */}
          <div className={styles.heroBadges}>
            {badges.map((b, i) => (
              <div key={i} className={styles.heroBadgeCol}>
                <div className={styles.badgeIconWrap}>
                  {b.icon}
                </div>
                <div className={styles.badgeTitle}>
                  {b.title}
                </div>
                <div className={styles.badgeSubtitle}>
                  {b.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
