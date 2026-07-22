'use client';
import Image from 'next/image';
import styles from './FeaturedCategories.module.css';

const services = [
  {
    title: 'DPF | DOC CLEANING',
    desc: '4-stage scientific cleaning restoring original exhaust flow & back pressure',
    image: '/feature-wheels.png',
    link: '#faq',
  },
  {
    title: 'OEM SILENCER MFG',
    desc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience',
    image: '/feature-cockpit.png',
    link: '#products',
  },
  {
    title: 'PARCEL SERVICE INDIA',
    desc: 'Courier parcel pick-up & delivery service across Kerala & nationwide',
    image: '/feature-leather.png',
    link: '#faq',
  },
];

export default function FeaturedCategories() {
  return (
    <section className={styles.section} id="dpf-cleaning">
      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((item, i) => (
            <a key={i} href={item.link} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.infoBox}>
                <span className={styles.pill}>{item.title}</span>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
