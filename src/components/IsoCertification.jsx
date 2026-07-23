'use client';
import styles from './IsoCertification.module.css';
import { LuAward, LuShieldCheck, LuCheck, LuMicroscope } from 'react-icons/lu';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function IsoCertification() {
  useScrollReveal();

  return (
    <section className={styles.isoSection} id="iso-certified">
      <div className={`container ${styles.container}`}>
        <div className={`${styles.isoCard} reveal-scale`}>
          
          {/* Left Seal / Badge Graphic */}
          <div className={styles.sealCol}>
            <div className={styles.isoSeal}>
              <LuAward size={48} className={styles.sealIcon} />
              <span className={styles.sealTitle}>ISO 9001:2015</span>
              <span className={styles.sealSub}>CERTIFIED</span>
            </div>
          </div>

          {/* Center Info */}
          <div className={styles.infoCol}>
            <div className={styles.badgeRow}>
              <span className={styles.certifiedBadge}>
                <LuShieldCheck size={14} /> CERTIFIED MANUFACTURING & CLEANING FACILITY
              </span>
            </div>
            <h3 className={styles.heading}>
              ISO 9001:2015 CERTIFIED QUALITY MANAGEMENT
            </h3>
            <p className={styles.desc}>
              Hi Quality Silencers operates an ISO 9001:2015 certified production facility adhering to international quality standards for TUNEX® silencer fabrication and scientific DPF, DOC, SCR & ASC filter cleaning.
            </p>
          </div>

          {/* Right Highlights */}
          <div className={styles.specsCol}>
            <div className={styles.specItem}>
              <LuCheck size={18} color="#DC2626" />
              <span>Strict Pre-Dispatch Quality Control</span>
            </div>
            <div className={styles.specItem}>
              <LuCheck size={18} color="#DC2626" />
              <span>OEM Specification Fitment Standard</span>
            </div>
            <div className={styles.specItem}>
              <LuCheck size={18} color="#DC2626" />
              <span>Substrate-Safe DPF Cleaning Process</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
