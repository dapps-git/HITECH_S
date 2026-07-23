'use client';
import styles from './TopTicker.module.css';

const items = [
  '15+ Years Experience', '5,000+ Happy Customers', '250+ Silencer Models',
  'ISO 9001:2015 Certified', '98% Customer Satisfaction', '15 Month Warranty',
  '100% Quality Inspected', 'OEM Specification Quality', '10+ Year Service Life',
];

const repeated = [...items, ...items, ...items, ...items];

export default function TopTicker() {
  return (
    <div className={styles.topTicker}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <div className={styles.track}>
        {repeated.map((item, i) => (
          <span key={i} className={styles.itemWrap}>
            <span className={styles.itemText}>{item}</span>
            <span className={styles.dot}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
