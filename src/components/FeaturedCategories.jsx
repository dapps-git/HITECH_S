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
    desc: '4-stage scientific DPF cleaning restoring original exhaust flow & back pressure',
    fullDesc: 'Our 4-stage scientific DPF restoration process removes 98%+ of accumulated soot, ash, and oil residue inside DPF honeycomb channels. Restores engine horsepower, fuel efficiency, and prevents expensive filter replacement.',
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

export default function FeaturedCategories() {
  useScrollReveal();
  const [services, setServices] = useState(defaultServices);
  const [selectedService, setSelectedService] = useState(null);

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
          const defaultTitles = new Set(defaultServices.map(d => d.title.toLowerCase()));
          const newFromBackend = apiServices.filter(
            s => !defaultTitles.has((s.title || '').toLowerCase())
          );
          setServices([...defaultServices, ...newFromBackend]);
        }
      } catch (err) {}
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
              <div
                key={item.id || i}
                className={styles.card}
                onClick={() => setSelectedService(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.iconWrap}>
                  <IconComponent className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{item.title ? item.title.toUpperCase() : ''}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                {item.slug && (
                  <Link
                    href={`/services/${item.slug}`}
                    className={styles.tapMoreBtn}
                    onClick={e => e.stopPropagation()}
                  >VIEW DETAILS →</Link>
                )}
                {!item.slug && (
                  <div className={styles.tapMoreBtn}>VIEW DETAILS</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SERVICE POP-UP MODAL */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedService(null)}>
              <FaTimes />
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap}>
                {(() => {
                  const ModalIcon = iconMap[selectedService.iconName] || FaWrench;
                  return <ModalIcon className={styles.modalIcon} />;
                })()}
              </div>
              <div>
                <span className={styles.modalBadge}>SERVICE OVERVIEW</span>
                <h3 className={styles.modalTitle}>
                  {selectedService.title ? selectedService.title.toUpperCase() : ''}
                </h3>
              </div>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalFullDesc}>
                {selectedService.fullDesc || selectedService.desc || 'Specialized service engineered for maximum durability, optimal exhaust flow, and OEM specification fitment.'}
              </p>

              <div className={styles.modalHighlights}>
                <div className={styles.highlightItem}>✓ 100% Quality Inspected &amp; Tested</div>
                <div className={styles.highlightItem}>✓ OEM Specification Guaranteed</div>
                <div className={styles.highlightItem}>✓ Experienced Technicians &amp; 15-Month Warranty</div>
              </div>

              {selectedService.slug && (
                <Link
                  href={`/services/${selectedService.slug}`}
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginTop: '1rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  VIEW FULL GALLERY &amp; DETAILS →
                </Link>
              )}
            </div>

            <div className={styles.modalFooter}>
              <a
                href={`https://wa.me/919876543210?text=Hi%20Quality%20Silencers,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(selectedService.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalWaBtn}
              >
                <FaWhatsapp size={15} /> WhatsApp Inquiry
              </a>
              <a href="tel:+919876543210" className={styles.modalCallBtn}>
                <FaPhoneAlt size={13} /> Call Us
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
