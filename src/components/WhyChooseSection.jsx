'use client';
import styles from './WhyChooseSection.module.css';
import { 
  LuShieldCheck, 
  LuAward, 
  LuSettings, 
  LuDownload, 
  LuShield, 
  LuTruck, 
  LuHeadphones, 
  LuHandshake 
} from 'react-icons/lu';

const whyChooseCards = [
  {
    icon: <LuShieldCheck size={24} className={styles.iconRed} />,
    title: 'OEM SPECIFICATION MANUFACTURING',
    desc: 'All silencers are manufactured as per OEM specifications for perfect fit, performance and durability.'
  },
  {
    icon: <LuAward size={24} className={styles.iconRed} />,
    title: 'PREMIUM QUALITY MATERIALS',
    desc: 'Manufactured using premium quality tube pipes and 2.00 mm & 1.60 mm galvanised steel sheets for superior strength, corrosion resistance, and long-lasting durability.'
  },
  {
    icon: <LuSettings size={24} className={styles.iconRed} />,
    title: 'ADVANCED MANUFACTURING',
    desc: 'State-of-the-art technology, skilled workforce and strict quality control to deliver consistent excellence.'
  },
  {
    icon: <LuDownload size={24} className={styles.iconRed} />,
    title: 'ISO CERTIFIED',
    desc: 'Our processes are ISO certified ensuring international quality standards. Click to download certificate.',
    downloadLink: '/images/iso_certificate.png',
    downloadName: 'Hi_Quality_Silencers_ISO_Certificate.png'
  },
  {
    icon: <LuShield size={24} className={styles.iconRed} />,
    title: '15 MONTHS WARRANTY',
    desc: 'We stand behind our quality with 15 months warranty for complete peace of mind.'
  },
  {
    icon: <LuTruck size={24} className={styles.iconRed} />,
    title: 'FAST DELIVERY ACROSS INDIA',
    desc: 'Strong logistics network ensuring on-time delivery to every corner of India.'
  },
  {
    icon: <LuHeadphones size={24} className={styles.iconRed} />,
    title: 'PROFESSIONAL TECHNICAL SUPPORT',
    desc: 'Expert technical team always ready to assist you with the right solutions and guidance.'
  },
  {
    icon: <LuHandshake size={24} className={styles.iconRed} />,
    title: 'TRUSTED BY 1800+ CUSTOMERS',
    desc: 'Our commitment to quality and customer satisfaction has built a strong network of 1800+ dealers and customers.'
  }
];

export default function WhyChooseSection() {
  return (
    <section className={styles.whySection} id="why-choose">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerLine} />
            <h2 className={styles.headerTitle}>
              WHY CHOOSE <span className={styles.titleRed}>HI QUALITY SILENCERS?</span>
            </h2>
            <span className={styles.headerLine} />
          </div>
          <p className={styles.headerSub}>
            Delivering OEM Quality, Performance &amp; Trust Since Day One
          </p>
        </div>

        {/* 8 Cards Grid (Light Theme) */}
        <div className={styles.cardsGrid}>
          {whyChooseCards.map((card, idx) => {
            const cardContent = (
              <>
                {/* Double Circle Icon Badge */}
                <div className={styles.badgeRing}>
                  <div className={styles.badgeInner}>
                    {card.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{card.title}</h3>

                {/* Description */}
                <p className={styles.cardDesc}>{card.desc}</p>
              </>
            );

            if (card.downloadLink) {
              return (
                <a
                  key={idx}
                  href={card.downloadLink}
                  download={card.downloadName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  title="Click to Download ISO Certificate"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={idx} className={styles.card}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
