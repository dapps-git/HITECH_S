'use client';
import Image from 'next/image';
import styles from './Footer.module.css';
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

const quickLinks = ['Home', 'Products', 'About Us', 'Contact Us'];
const services = ['OEM Silencers', 'Sedan & Hatchback', 'SUV & MUV Silencers', 'Commercial Vehicles', 'DPF Cleaning', 'Custom Exhaust'];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.footerGrid}>

          {/* Col 1: Brand */}
          <div>
            <div className={styles.logoWrap}>
              <Image
                src="/images/15.webp"
                alt="Hi Quality Silencers"
                width={140}
                height={48}
                className={styles.logoImg}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <p className={styles.brandDesc}>
              Manufacturer of TUNEX® OEM specification silencers for passenger and commercial vehicles. ISO 9001:2015 certified, based in Calicut, Kerala.
            </p>

            {/* Social Icons */}
            <div className={styles.socialList}>
              <a
                href="https://www.facebook.com/share/1JCThxqeps/"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <LuFacebook size={15} />
              </a>
              <a
                href="https://www.instagram.com/hi_quality_silencers?igsh=MXIwemZtNGhwaThyZw=="
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <LuInstagram size={15} />
              </a>
              <a
                href="https://wa.me/919645888250"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className={styles.colTitle}>
              Quick Links
            </h4>
            <div className={styles.titleLine} />
            <ul className={styles.linkList}>
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                    className={styles.footerLink}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className={styles.colTitle}>
              Our Services
            </h4>
            <div className={styles.titleLine} />
            <ul className={styles.linkList}>
              {services.map((s, i) => (
                <li key={i}>
                  <a
                    href="#products"
                    className={styles.footerLink}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className={styles.colTitle}>
              Contact Info
            </h4>
            <div className={styles.titleLine} />

            <div className={styles.contactCol}>
              <a
                href="https://maps.google.com/?q=Hi+Quality+Silencers+Beypore+Calicut+Kerala+673015"
                target="_blank"
                rel="noreferrer"
                className={styles.contactItem}
              >
                <div className={styles.iconCircle}>
                  <LuMapPin size={14} color="#DC2626" />
                </div>
                <span className={styles.contactText}>
                  47/1302C, Cheerpupalam BC Road,<br />Beypore, Calicut, Kerala – 673015
                </span>
              </a>

              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <LuPhone size={14} color="#DC2626" />
                </div>
                <div className={styles.phoneSub}>
                  <a href="tel:+919645888253" className={styles.contactText}>
                    +91 9645 888 253
                  </a>
                  <a href="https://wa.me/919645888250" target="_blank" rel="noreferrer" className={styles.contactText}>
                    +91 9645 888 250 (WhatsApp)
                  </a>
                </div>
              </div>

              <a
                href="mailto:hiqualitysilencer@gmail.com"
                className={styles.contactItem}
              >
                <div className={styles.iconCircle}>
                  <LuMail size={14} color="#DC2626" />
                </div>
                <span className={styles.contactText}>
                  hiqualitysilencer@gmail.com
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <span className={styles.copyText}>© {new Date().getFullYear()} Hi Quality Silencers. All rights reserved.</span>
          <div className={styles.policyLinks}>
            <a href="#" className={styles.policyLink}>Privacy Policy</a>
            <a href="#" className={styles.policyLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
