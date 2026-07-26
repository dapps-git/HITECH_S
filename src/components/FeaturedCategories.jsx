'use client';
import { useState, useEffect } from 'react';
import styles from './FeaturedCategories.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  FaFilter,
  FaIndustry,
  FaLeaf,
  FaLink,
  FaWrench,
  FaCar,
  FaCogs,
  FaTools
} from 'react-icons/fa';

const iconMap = {
  FaFilter,
  FaIndustry,
  FaLeaf,
  FaLink,
  FaWrench,
  FaCar,
  FaCogs,
  FaTools
};

const defaultServices = [
  {
    title: 'Professional DPF Restoration',
    desc: '4-stage scientific DPF cleaning restoring original exhaust flow & back pressure',
    iconName: 'FaFilter',
    link: '#dpf-cleaning',
  },
  {
    title: 'OEM Silencer Manufacturing',
    desc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience',
    iconName: 'FaIndustry',
    link: '#products',
  },
  {
    title: 'Catalytic Converter Service',
    desc: 'Complete diagnostic, cleaning & replacement for optimum emission control',
    iconName: 'FaLeaf',
    link: '#products',
  },
  {
    title: 'Flex Pipe Replacement',
    desc: 'Precision flex pipe welding, replacement & vibration dampening exhaust repair',
    iconName: 'FaLink',
    link: '#products',
  },
  {
    title: 'Exhaust Repair',
    desc: 'Complete exhaust system diagnostics, leak repair, and component restoration',
    iconName: 'FaWrench',
    link: '#contact',
  },
];

export default function FeaturedCategories() {
  useScrollReveal();
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    async function loadServices() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin';
        const res = await fetch(`${apiUrl}/api/services`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          const apiServices = data.services.map(s => ({
            ...s,
            iconName: s.icon || s.iconName || 'FaWrench'
          }));
          // Always keep ALL defaults, then append backend items that don't
          // already exist in the defaults list (match by title)
          const defaultTitles = new Set(defaultServices.map(d => d.title.toLowerCase()));
          const newFromBackend = apiServices.filter(
            s => !defaultTitles.has((s.title || '').toLowerCase())
          );
          setServices([...defaultServices, ...newFromBackend]);
        }
        // if no backend services → stay on defaults (do nothing)
      } catch (err) {
        // Network error → keep defaults (do nothing)
      }
    }
    loadServices();
  }, []);

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

        {/* Dynamic Service Cards */}
        <div className={styles.grid}>
          {services.map((item, i) => {
            const IconComponent = iconMap[item.iconName] || FaWrench;
            return (
              <a key={item.id || i} href={item.link || '#contact'} className={styles.card}>
                <div className={styles.iconWrap}>
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{item.title ? item.title.toUpperCase() : ''}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
