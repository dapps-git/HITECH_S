'use client';
import styles from './ProductGrid.module.css';
import { FaFlask, FaWind, FaFire, FaTachometerAlt, FaShieldAlt, FaCheckCircle, FaTruck, FaClock } from 'react-icons/fa';

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
            <div key={i} className={styles.stageCard}>
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
            <span className={styles.midBannerBadge}>NATIONWIDE PARCEL SERVICE</span>
            <h3 className={styles.midBannerTitle}>SEND YOUR DPF UNIT TO US FROM ANYWHERE IN INDIA</h3>
            <p className={styles.midBannerDesc}>
              Remove the DPF unit from your vehicle and send it via any courier or parcel service. After 4-stage professional cleaning & pressure certification, we return it ready for direct installation.
            </p>
            <a href="tel:+919876543210" className={styles.midBannerBtn}>
              <FaTruck /> Contact Us for Parcel Details
            </a>
          </div>
          <div className={styles.midBannerRight}>
            <div className={styles.priceCard}>
              <span className={styles.pFrom}>DPF Cleaning From</span>
              <span className={styles.pPrice}>₹6,000</span>
              <span className={styles.pNote}>Final price varies by vehicle model, DPF size & condition</span>
              <div className={styles.pItems}>
                <span><FaClock /> 1–2 Working Days</span>
                <span><FaShieldAlt /> Pressure Certified</span>
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
