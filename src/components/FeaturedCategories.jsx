'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  FaTools,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt
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
    slug: 'dpf-restoration',
    title: 'Professional DPF Restoration',
    desc: '5-stage scientific DPF cleaning restoring original exhaust flow & back pressure',
    fullDesc: 'Our 5-stage scientific DPF restoration process removes 98%+ of accumulated soot, ash, and oil residue inside DPF honeycomb channels. Restores engine horsepower, fuel efficiency, and prevents expensive filter replacement.',
    iconName: 'FaFilter',
  },
  {
    slug: 'oem-silencer-manufacturing',
    title: 'OEM Silencer Manufacturing',
    desc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience',
    fullDesc: 'Precision engineered silencer manufacturing using heavy-duty 1.6mm or 2.0mm galvanised sheets or pipe. Built to exact vehicle specifications for long service life and acoustic dampening.',
    iconName: 'FaIndustry',
  },
  {
    slug: 'catalytic-converter-service',
    title: 'Catalytic Converter Service',
    desc: 'Complete diagnostic, cleaning & replacement for optimum emission control',
    fullDesc: 'Complete catalytic converter inspection, chemical channel flushing, substrate testing, and replacement services. Ensures your vehicle passes emission checks and operates at peak performance.',
    iconName: 'FaLeaf',
  },
  {
    slug: 'flex-pipe-replacement',
    title: 'Flex Pipe Replacement',
    desc: 'Precision flex pipe welding, replacement & vibration dampening exhaust repair',
    fullDesc: 'Heavy-duty stainless steel flex pipe replacement and precision TIG welding. Absorbs engine vibrations, prevents exhaust manifold cracking, and eliminates gas leakage.',
    iconName: 'FaLink',
  },
  {
    slug: 'exhaust-repair',
    title: 'Exhaust Repair',
    desc: 'Complete exhaust system diagnostics, leak repair, and component restoration',
    fullDesc: 'Comprehensive exhaust system diagnostics, pipe sealing, flange welding, acoustic tuning, and full system restoration for all passenger cars, SUVs, and commercial vehicles.',
    iconName: 'FaWrench',
  },
];

import { ServiceSkeleton } from './SkeletonLoader';

export default function FeaturedCategories() {
  useScrollReveal();
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      const urlsToTry = [
        '/api/services',
        'http://localhost:5000/api/services',
        `${process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin'}/api/services`
      ];

      for (const url of urlsToTry) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          const data = await res.json();
          if (data.success && Array.isArray(data.services) && data.services.length > 0) {
            const apiServices = data.services.map(s => ({
              ...s,
              iconName: s.icon || s.iconName || 'FaWrench'
            }));
            const defaultTitles = new Set(defaultServices.map(d => d.title.toLowerCase()));
            const newFromBackend = apiServices.filter(
              s => !defaultTitles.has((s.title || '').toLowerCase())
            );
            setServices([...defaultServices, ...newFromBackend]);
            break;
          }
        } catch (err) {}
      }
      setLoading(false);
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
          {loading ? (
            <ServiceSkeleton count={5} />
          ) : (
            services.map((item, i) => {
              const IconComponent = iconMap[item.iconName] || FaWrench;
              const targetHref = item.slug ? `/services/${item.slug}` : '/#dpf-cleaning';
              return (
                <Link
                  key={item.id || i}
                  href={targetHref}
                  className={styles.card}
                >
                  <div className={styles.iconWrap}>
                    <IconComponent className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>{item.title ? item.title.toUpperCase() : ''}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                  <div className={styles.tapMoreBtn}>VIEW DETAILS →</div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
