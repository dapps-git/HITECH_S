'use client';
import styles from './TopBar.module.css';
import { FaPhone, FaTruck, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.item}>
            <FaShieldAlt className={styles.icon} />
            ISO Certified · 15+ Years Experience
          </span>
          <span className={styles.sep} />
          <span className={styles.item}>
            <FaTruck className={styles.icon} />
            Parcel Service — Kerala & All India
          </span>
        </div>
        <div className={styles.right}>
          <a href="https://wa.me/919645888250" className={styles.waBtn} target="_blank" rel="noreferrer">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href="tel:+919645888253" className={styles.callLink}>
            <FaPhone className={styles.icon} />
            +91 9645 888 253
          </a>
        </div>
      </div>
    </div>
  );
}
