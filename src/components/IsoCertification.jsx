'use client';
import Image from 'next/image';
import styles from './IsoCertification.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function IsoCertification() {
  useScrollReveal();

  return (
    <section className={styles.isoSection} id="iso-certified">
      <div className={`container ${styles.container}`}>

        {/* Section Title */}
        <div className={`${styles.titleBlock} reveal-up`}>
          <div className={styles.redBar} />
          <h2 className={styles.sectionTitle}>ISO 9001:2015 CERTIFIED</h2>
          <p className={styles.sectionSubtitle}>Quality Research Organisation (QRO) Accredited</p>
        </div>

        {/* Certificate Image */}
        <div className={`${styles.certWrapper} reveal-scale`}>
          <Image
            src="/images/iso_certificate.png"
            alt="ISO 9001:2015 Certificate of Registration - Hi Quality Silencers"
            width={620}
            height={880}
            className={styles.certImage}
            priority
          />
        </div>

        {/* Bottom Description */}
        <div className={`${styles.descBlock} reveal-up`}>
          <p className={styles.desc}>
            Hi Quality Silencers is independently assessed and certified by QRO for manufacturing automotive silencers and professional cleaning of DPF, DOC, SCR & ASC emission control systems.
          </p>
          <p className={styles.descMuted}>
            Certificate No: 305026071811Q &nbsp;|&nbsp; Valid until: 17th July 2029 &nbsp;|&nbsp; Issued by Quality Research Organisation (QRO), India
          </p>
        </div>

      </div>
    </section>
  );
}
