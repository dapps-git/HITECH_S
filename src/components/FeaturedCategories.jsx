'use client';
import Image from 'next/image';
import styles from './FeaturedCategories.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    title: 'PROFESSIONAL DPF RESTORATION',
    desc: '4-stage scientific cleaning restoring original exhaust flow & back pressure',
    image: '/feature-wheels.png',
    link: '#dpf-cleaning',
  },
  {
    title: 'OEM SILENCER MANUFACTURING',
    desc: 'ISO certified silencer manufacturing with 15+ years of OEM precision experience',
    image: '/feature-cockpit.png',
    link: '#products',
  },
  {
    title: 'CATALYTIC CONVERTER & EXHAUST REPAIR',
    desc: 'High performance catalytic converter service, flex pipe replacement & custom exhaust repair',
    image: '/feature-leather.png',
    link: '#products',
  },
];

export default function FeaturedCategories() {
  useScrollReveal();

  return (
    <section className={styles.section} id="dpf-cleaning">
      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((item, i) => (
            <a key={i} href={item.link} className={`${styles.card} reveal-up`}>
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
