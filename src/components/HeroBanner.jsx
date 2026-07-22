'use client';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { FaPhone } from 'react-icons/fa';

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.imageWrap}>
        <Image
          src="/dark-hero.png"
          alt="Hi Quality Silencers"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Ultra Clean Hero Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>HI QUALITY SILENCERS</h1>
        <p className={styles.subtitle}>
          Professional DPF | DOC | SCR | ASC Cleaning
        </p>

        <div className={styles.btnRow}>
          <a href="tel:+919876543210" className={styles.redBtn}>
            <FaPhone /> Book Cleaning
          </a>
        </div>
      </div>
    </section>
  );
}
