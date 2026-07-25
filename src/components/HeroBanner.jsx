'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { 
  LuPhoneCall, 
  LuMessageCircle, 
  LuAward, 
  LuSettings, 
  LuShieldCheck, 
  LuGlobe,
  LuUsers,
  LuCheck,
  LuGauge,
  LuHandshake
} from 'react-icons/lu';

const heroBadges = [
  {
    icon: <LuAward size={18} className={styles.badgeSvgIcon} />,
    value: '15+',
    label: 'YEARS EXPERIENCE'
  },
  {
    icon: <LuSettings size={18} className={styles.badgeSvgIcon} />,
    value: 'OEM',
    label: 'SPECIFICATION MANUFACTURER'
  },
  {
    icon: <LuShieldCheck size={18} className={styles.badgeSvgIcon} />,
    value: '15 MONTHS',
    label: 'WARRANTY'
  },
  {
    icon: <LuGlobe size={18} className={styles.badgeSvgIcon} />,
    value: 'ISO',
    label: 'CERTIFIED'
  },
];

function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const steps = 50;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

export default function HeroBanner() {
  const heroRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const silencerCount = useCountUp(3500, 1800, statsVisible);
  const networkCount = useCountUp(1800, 1800, statsVisible);

  return (
    <section id="hero" ref={heroRef} className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Crisp Background Image (bg.webp) */}
        <div className={styles.bgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bg.webp"
            alt="OEM Specification Silencer Manufacturer Workshop"
            className={styles.bgImage}
          />
          <div className={styles.bgOverlay} />
        </div>

        {/* Main Content Area */}
        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            {/* Main Headline - OEM SPECIFICATION SILENCER MANUFACTURER */}
            <h1 className={styles.heroH1}>
              OEM SPECIFICATION<br />
              SILENCER MANUFACTURER
            </h1>

            {/* Red Accent Subtitle - PROFESSIONAL DPF RESTORATION EXPERTS */}
            <h2 className={styles.heroH2}>
              PROFESSIONAL DPF RESTORATION EXPERTS
            </h2>
            <div className={styles.redUnderline} />

            {/* Description Paragraph */}
            <p className={styles.heroDesc}>
              High Quality OEM Specification Silencers &amp; Professional DPF Cleaning Services with 15+ Years of Manufacturing Excellence.
            </p>

            {/* CTA Action Buttons */}
            <div className={styles.btnWrapper}>
              <a href="tel:+917907700850" className={styles.callNowBtn}>
                <LuPhoneCall size={15} /> CALL NOW
              </a>

              <a
                href="https://wa.me/917907700850"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappBtn}
              >
                <LuMessageCircle size={15} /> WHATSAPP US
              </a>
            </div>

            {/* 4 Feature Badges (Transparent Inline Row) */}
            <div className={styles.heroBadgesContainer}>
              {heroBadges.map((b, i) => (
                <div key={i} className={styles.badgeCol}>
                  <div className={styles.badgeIconWrap}>
                    {b.icon}
                  </div>
                  <div className={styles.badgeValue}>{b.value}</div>
                  <div className={styles.badgeLabel}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transparent Stats Bar (Directly Inside Hero at the Bottom) */}
        <div className={styles.heroTransparentStatsBar}>
          <div className={styles.statsContainer}>
            {/* Left Stat */}
            <div className={styles.statBox}>
              <div className={styles.statIconWrap}>
                <Image
                  src="/images/silencer_stat.png"
                  alt="Silencer Model"
                  width={44}
                  height={44}
                  className={styles.statImage}
                />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>{silencerCount}+</span>
                <span className={styles.statTitle}>
                  DIFFERENT SILENCER<br />MODELS MANUFACTURED
                </span>
              </div>
            </div>

            <div className={styles.statDivider} />

            {/* Right Stat */}
            <div className={styles.statBox}>
              <div className={styles.statIconWrapRed}>
                <LuUsers size={22} color="#ffffff" />
              </div>
              <div className={styles.statTextGroup}>
                <span className={styles.statNumber}>{networkCount}+</span>
                <span className={styles.statTitle}>
                  DEALERS & CUSTOMERS<br />STRONG NETWORK
                </span>
              </div>
            </div>

            <div className={styles.statDivider} />

            {/* Trust Badges */}
            <div className={styles.heroTrustItems}>
              <span className={styles.trustItem}>
                <LuCheck size={14} color="#dc2626" /> QUALITY
              </span>
              <span className={styles.trustItem}>
                <LuGauge size={14} color="#dc2626" /> PERFORMANCE
              </span>
              <span className={styles.trustItem}>
                <LuHandshake size={14} color="#dc2626" /> RELIABILITY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pure Icon-only Floating WhatsApp Widget */}
      <a
        href="https://wa.me/917907700850"
        target="_blank"
        rel="noreferrer"
        className={styles.floatingWhatsappIcon}
        aria-label="WhatsApp Us"
      >
        <LuMessageCircle size={26} color="#ffffff" />
      </a>
    </section>
  );
}



