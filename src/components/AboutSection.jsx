'use client';
import Image from 'next/image';
import styles from './AboutSection.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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

            <div className={styles.headingBlock}>
              <h2 className={styles.aboutH2}>COMPLETE EXHAUST SYSTEM SOLUTIONS</h2>
              <h3 className={styles.aboutH3}>OEM Specification Silencer Manufacturing &amp; Professional DPF, DOC, SCR &amp; ASC Cleaning Services</h3>
            </div>

            <div className={styles.parasWrap}>
              <p className={styles.para}>
                Hi Quality Silencers is an ISO Certified company and the proud manufacturer of the{' '}
                TUNEX®️ brand, specializing in OEM Specification Silencers and Professional DPF, DOC, SCR & ASC Cleaning Services for passenger and commercial vehicles.
              </p>
              <p className={styles.para}>
                Our TUNEX®️ OEM Specification Silencers are engineered for precise OEM fitment, superior noise reduction, and reliable long-term performance. Each silencer is manufactured using high-quality tube pipes and 1.60 mm or 2.00 mm galvanised sheets or pipe, ensuring exceptional strength, corrosion resistance, and durability.
              </p>
              <p className={styles.para}>
                Designed to deliver a minimum service life of 10 years under normal operating conditions, every product undergoes stringent quality inspections before dispatch. In addition, we provide professional DPF, DOC, SCR & ASC cleaning services using advanced cleaning technology to restore exhaust system efficiency without damaging the substrate.
              </p>
              <p className={styles.para}>
                Backed by 15 years of manufacturing excellence, every TUNEX®️ silencer comes with a{' '}
                15-month warranty, reflecting our unwavering commitment to quality, reliability, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className={`${styles.aboutRight} reveal-right`}>
            <div className={styles.imgCard}>
              <img
                src="/images/aboutus_banner.jpg"
                alt="Hi Quality Silencers Manufacturer & DPF Cleaning Expert"
                className={styles.silencerImg}
              />
              <div className={styles.imgRightBorder} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
