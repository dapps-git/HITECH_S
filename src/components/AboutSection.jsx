'use client';
import Image from 'next/image';
import styles from './AboutSection.module.css';
import { LuShieldCheck, LuVolume2, LuLayers, LuClock, LuCheck, LuUsers, LuLink } from 'react-icons/lu';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  { icon: <LuShieldCheck size={28} color="#DC2626" />, title: 'OEM SPECIFICATION', desc: 'Perfect fitment for passenger & commercial vehicles.' },
  { icon: <LuVolume2 size={28} color="#DC2626" />, title: 'SUPERIOR NOISE REDUCTION', desc: 'Designed to deliver quieter drives and better performance.' },
  { icon: <LuLayers size={28} color="#DC2626" />, title: 'PREMIUM MATERIALS', desc: 'Made with high-quality tube pipes and 2.00 mm & 1.60 mm galvanised sheets.' },
  { icon: <LuClock size={28} color="#DC2626" />, title: 'LONG LASTING DURABILITY', desc: 'Built to last with a minimum service life of 10 years.' },
];

const bottomBadges = [
  { icon: <LuShieldCheck size={24} color="#DC2626" />, title: 'STRICT QUALITY INSPECTION', desc: 'Every product is thoroughly tested before dispatch.' },
  { icon: <span className={styles.badgeNum}>15</span>, title: '15-MONTH WARRANTY', desc: 'Backed by a 15-month warranty for complete peace of mind.' },
  { icon: <LuLink size={24} color="#DC2626" />, title: 'STRONG & DURABLE', desc: 'Built with precision for exceptional strength and reliability.' },
  { icon: <LuShieldCheck size={24} color="#DC2626" />, title: 'CORROSION RESISTANT', desc: 'Galvanised sheets ensure long-lasting rust protection.' },
  { icon: <LuCheck size={24} color="#DC2626" />, title: 'TRUSTED QUALITY', desc: 'Committed to delivering quality, reliability, and customer satisfaction.' },
  { icon: <LuUsers size={24} color="#DC2626" />, title: 'CUSTOMER FOCUSED', desc: 'Your satisfaction is our top priority.' },
];

export default function AboutSection() {
  useScrollReveal();

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Main Split Grid */}
      <div className={`container ${styles.container}`}>
        <div className={styles.aboutGrid}>

          {/* Left: Text */}
          <div className={`${styles.aboutText} reveal-left`}>
            <div className={styles.badgeRow}>
              <div className={styles.redBar} />
              <span className={styles.badgeText}>About Us</span>
            </div>

            <h2 className={styles.aboutH2}>
              ENGINEERED FOR<br />PERFORMANCE.
            </h2>
            <h3 className={styles.aboutH3}>
              BUILT TO LAST.
            </h3>

            <div className={styles.parasWrap}>
              <p className={styles.para}>
                <strong>Hi Quality Silencers</strong> is an <strong>ISO Certified company</strong> and the proud manufacturer of the{' '}
                <strong className={styles.redText}>TUNEX®️</strong> brand, specializing in OEM Specification Silencers and Professional DPF, DOC, SCR & ASC Cleaning Services for passenger and commercial vehicles.
              </p>
              <p className={styles.para}>
                Our <strong>TUNEX®️ OEM Specification Silencers</strong> are engineered for precise OEM fitment, superior noise reduction, and reliable long-term performance. Each silencer is manufactured using high-quality tube pipes and <strong>2.00 mm & 1.60 mm galvanised sheets</strong>, ensuring exceptional strength, corrosion resistance, and durability.
              </p>
              <p className={styles.para}>
                Designed to deliver a minimum service life of <strong>10 years</strong> under normal operating conditions, every product undergoes stringent quality inspections before dispatch. In addition, we provide professional DPF, DOC, SCR & ASC cleaning services using advanced cleaning technology to restore exhaust system efficiency without damaging the substrate.
              </p>
              <p className={styles.para}>
                Backed by 15 years of manufacturing excellence, every TUNEX®️ silencer comes with a{' '}
                <strong className={styles.redText}>15-month warranty</strong>, reflecting our unwavering commitment to quality, reliability, innovation, and customer satisfaction.
              </p>
            </div>

            <div className={styles.btnRow}>
              <a
                href="https://wa.me/919645888250"
                target="_blank"
                rel="noreferrer"
                className={styles.warrantyBtn}
              >
                <LuShieldCheck size={17} /> Our Warranty
              </a>
            </div>
          </div>

          {/* Right: Image + Feature Cards */}
          <div className={`${styles.aboutRight} reveal-right`}>
            <div className={styles.imgCard}>
              <Image
                src="/images/about.webp"
                alt="Hi Quality Silencers TUNEX About"
                width={600}
                height={360}
                className={styles.silencerImg}
              />
              <div className={styles.imgRightBorder} />
            </div>

            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Badges Strip */}
      <div className={`${styles.bottomStrip} reveal-up`}>
        <div className={`container ${styles.container}`}>
          <div className={styles.badgesGrid}>
            {bottomBadges.map((b, i) => (
              <div key={i} className={styles.bottomBadgeCol}>
                <div className={styles.circleIconWrap}>
                  {b.icon}
                </div>
                <div className={styles.bottomBadgeTitle}>{b.title}</div>
                <div className={styles.bottomBadgeDesc}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
