'use client';
import styles from './FeaturedCategories.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  FaFilter,
  FaIndustry,
  FaLeaf,
  FaLink,
  FaWrench,
} from 'react-icons/fa';

const services = [
  {
    title: 'Professional DPF Restoration',
    desc: '4-stage scientific DPF cleaning restoring original exhaust flow & back pressure',
    icon: FaFilter,
    link: '#dpf-cleaning',
  },
  {
    title: 'OEM Silencer Manufacturing',
    desc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience',
    icon: FaIndustry,
    link: '#products',
  },
  {
    title: 'Catalytic Converter Service',
    desc: 'Complete diagnostic, cleaning & replacement for optimum emission control',
    icon: FaLeaf,
    link: '#products',
  },
  {
    title: 'Flex Pipe Replacement',
    desc: 'Precision flex pipe welding, replacement & vibration dampening exhaust repair',
    icon: FaLink,
    link: '#products',
  },
  {
    title: 'Exhaust Repair',
    desc: 'Complete exhaust system diagnostics, leak repair, and component restoration',
    icon: FaWrench,
    link: '#contact',
  },
];

export default function FeaturedCategories() {
  useScrollReveal();

  return (
    <section className={styles.section} id="dpf-cleaning">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerLine} />
            <h2 className={styles.headerTitle}>
              OUR <span className={styles.titleRed}>SERVICES</span>
            </h2>
            <span className={styles.headerLine} />
          </div>
          <p className={styles.headerSub}>
            Specialized OEM Silencer Manufacturing &amp; Professional DPF Restoration Services
          </p>
        </div>

        {/* 5 Service Cards */}
        <div className={styles.grid}>
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <a key={i} href={item.link} className={`${styles.card} reveal-up`}>
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
