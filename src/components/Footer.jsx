'use client';
import Image from 'next/image';
import styles from './Footer.module.css';
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram, LuYoutube } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/contact' },
];

const servicesList = [
  { label: 'Professional DPF Restoration', href: '/services/dpf-restoration' },
  { label: 'OEM Silencer Manufacturing', href: '/services/oem-silencer-manufacturing' },
  { label: 'Catalytic Converter Service', href: '/services/catalytic-converter-service' },
  { label: 'Flex Pipe Replacement', href: '/services/flex-pipe-replacement' },
  { label: 'Exhaust Repair', href: '/services/exhaust-repair' },
];

const productsList = [
  { label: 'Car Silencers', href: '/products/prod-1' },
  { label: 'SUV Silencers', href: '/products/prod-2' },
  { label: 'Commercial Vehicle Silencers', href: '/products/prod-3' },
  { label: 'Generated Silencers', href: '/products/prod-4' },
  { label: 'Custom Silencers', href: '/products/prod-5' },
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.footerGrid}>

          {/* Col 1: Brand */}
          <div>
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
                href="https://youtube.com/@silencerworld?si=yraHU90ehKv0nGuR"
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
              >
                <LuYoutube size={15} />
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
                    href={l.href}
                    className={styles.footerLink}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <div className={styles.titleLine} />
            <ul className={styles.linkList}>
              {servicesList.map((s, i) => (
                <li key={i}>
                  <a href={s.href} className={styles.footerLink}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Products */}
          <div>
            <h4 className={styles.colTitle}>Products</h4>
            <div className={styles.titleLine} />
            <ul className={styles.linkList}>
              {productsList.map((p, i) => (
                <li key={i}>
                  <a href={p.href} className={styles.footerLink}>{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className={styles.colTitle}>
              Contact Info
            </h4>
            <div className={styles.titleLine} />

            <div className={styles.contactCol}>
              <div className={styles.contactItem} style={{ alignItems: 'flex-start' }}>
                <div className={styles.iconCircle} style={{ marginTop: '2px' }}>
                  <LuMapPin size={14} color="#dc2626" />
                </div>
                <span className={styles.contactText}>
                  <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px', fontSize: '0.78rem' }}>Factory Address:</strong>
                  47/1302C, Cheerpupalam<br />
                  BC Road, Beypore, Calicut<br />
                  Kerala – 673015
                </span>
              </div>

              <div className={styles.contactItem} style={{ alignItems: 'flex-start' }}>
                <div className={styles.iconCircle} style={{ marginTop: '2px' }}>
                  <LuMapPin size={14} color="#dc2626" />
                </div>
                <span className={styles.contactText}>
                  <strong style={{ color: '#ffffff', display: 'block', marginBottom: '2px', fontSize: '0.78rem' }}>Sales Point Address:</strong>
                  64/42 AV Building<br />
                  Behind Ambika Hotel<br />
                  Passport Office Cross Road East<br />
                  Nadakkavu, Calicut – 673006
                </span>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <LuPhone size={14} color="#dc2626" />
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
                  <LuMail size={14} color="#dc2626" />
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
