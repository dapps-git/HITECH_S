'use client';
import styles from './ProductGrid.module.css';
import { FaFlask, FaWind, FaFire, FaTachometerAlt, FaShieldAlt, FaCheckCircle, FaTruck, FaClock } from 'react-icons/fa';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const cleaningStages = [
  {
    icon: <FaFlask />,
    stage: 'Stage 1',
    name: 'Chemical Soaking',
    desc: 'DPF immersed in a specially formulated solution to dissolve soot, ash & oil residues.',
  },
  {
    icon: <FaWind />,
    stage: 'Stage 2',
    name: 'Hydro-Pneumatic Cleaning',
    desc: 'Water & compressed air flush contaminants from both flow directions of the honeycomb.',
  },
  {
    icon: <FaFire />,
    stage: 'Stage 3',
    name: 'Thermal Regeneration',
    desc: 'Carbon deposits burned off under controlled temperature without damaging the substrate.',
  },
  {
    icon: <FaTachometerAlt />,
    stage: 'Stage 4',
    name: 'Final Pressure Test',
    desc: 'Back pressure & airflow certified to factory specification before dispatch.',
  },
];

const benefits = [
  'Restores proper exhaust airflow',
  'Reduces harmful back pressure',
  'Improves engine performance & power',
  'Improves mileage & fuel efficiency',
  'Extends DPF service life significantly',
  'Reduces likelihood of future blockages',
];

export default function ProductGrid() {
  useScrollReveal();

  return (
    <section className={styles.section} id="cleaning-process">
      {/* 4-STAGE CLEANING PROCESS */}
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>SCIENTIFIC & SAFE</span>
          <h2 className="section-title">OUR 4-STAGE PROFESSIONAL CLEANING PROCESS</h2>
          <p className={styles.sectionSubtitle}>
            Not just a water wash. Our multi-stage process removes soot, ash, oil residue & carbon deposits completely.
          </p>
        </div>

        <div className={styles.fourGrid}>
          {cleaningStages.map((s, i) => (
            <div key={i} className={`${styles.stageCard} reveal-up`}>
              <div className={styles.stageTop}>
                <span className={styles.stageIcon}>{s.icon}</span>
                <span className={styles.stageLabel}>{s.stage}</span>
              </div>
              <h4 className={styles.stageName}>{s.name}</h4>
              <p className={styles.stageDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE BANNER */}
      <div className={styles.midBannerWrapper}>
        <div className={styles.midBanner}>
          <div className={styles.midBannerLeft}>
            <span className={styles.midBannerBadge}>TUNEX® BRAND EXCELLENCE</span>
            <h3 className={styles.midBannerTitle}>HEAVY DUTY 2.00mm & 1.60mm GALVANISED STEEL</h3>
            <p className={styles.midBannerDesc}>
              Manufactured using premium grade tube pipes and heavy-gauge galvanised sheets for superior strength, rust resistance, and a 10+ year minimum service life.
            </p>
            <a href="https://wa.me/919645888250" target="_blank" rel="noreferrer" className={styles.midBannerBtn}>
              <FaShieldAlt /> Inquire for Silencer Orders
            </a>
          </div>
          <div className={styles.midBannerRight}>
            <div className={styles.priceCard}>
              <span className={styles.pFrom}>TUNEX® SILENCERS</span>
              <span className={styles.pPrice}>15 MONTH</span>
              <span className={styles.pNote}>Comprehensive Warranty Backing Every Product</span>
              <div className={styles.pItems}>
                <span><FaClock color="#DC2626" /> 10+ Year Service Life</span>
                <span><FaShieldAlt color="#DC2626" /> ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KEY BENEFITS */}
      <div className={styles.benefitsSection} id="symptoms">
        <div className={styles.container}>
          <h2 className="section-title">KEY BENEFITS OF PROFESSIONAL CLEANING</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div key={i} className={styles.benefitItem}>
                <FaCheckCircle className={styles.benefitIcon} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
