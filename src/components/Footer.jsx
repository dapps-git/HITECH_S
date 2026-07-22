'use client';
import styles from './Footer.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaTruck } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.widgets}>
          {/* Col 1 */}
          <div className={styles.widget}>
            <div className={styles.logo}>
              <span className={styles.logoBox}>HI QUALITY</span>
              <span className={styles.logoText}>SILENCERS</span>
            </div>
            <p className={styles.text}>
              ISO Certified OEM specification silencer manufacturer with 15+ years of experience. Professional scientific DPF, DOC, SCR & ASC cleaning services in Kerala.
            </p>
            <div className={styles.contactList}>
              <p><FaMapMarkerAlt className={styles.icon} /> Workshop & Factory: Kerala, India</p>
              <p><FaPhone className={styles.icon} /> Helpline: +91 98765 43210</p>
              <p><FaEnvelope className={styles.icon} /> info@hiqualitysilencers.demo</p>
            </div>
          </div>

          {/* Col 2 */}
          <div className={styles.widget}>
            <h4 className={styles.title}>DPF CLEANING SERVICES</h4>
            <ul className={styles.list}>
              <li><a href="#faq">Diesel Particulate Filter (DPF)</a></li>
              <li><a href="#faq">Diesel Oxidation Catalyst (DOC)</a></li>
              <li><a href="#faq">Selective Catalytic Reduction (SCR)</a></li>
              <li><a href="#faq">Ammonia Slip Catalyst (ASC)</a></li>
              <li><a href="#faq">4-Stage Scientific Cleaning</a></li>
              <li><a href="#faq">Pressure & Airflow Certification</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className={styles.widget}>
            <h4 className={styles.title}>SILENCER MANUFACTURING</h4>
            <ul className={styles.list}>
              <li><a href="#products">OEM Specification Silencers</a></li>
              <li><a href="#products">Heavy Duty Truck Exhausts</a></li>
              <li><a href="#products">Bus & Commercial Exhausts</a></li>
              <li><a href="#products">Exhaust Manifolds & Pipes</a></li>
              <li><a href="#products">ISO Quality Certified</a></li>
              <li><a href="#products">Custom Fabrication</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className={styles.widget}>
            <h4 className={styles.title}>PARCEL SERVICE INDIA</h4>
            <div className={styles.parcelNotice}>
              <FaTruck className={styles.truckIcon} />
              <div>
                <strong>Send DPF Unit via Courier</strong>
                <p>We receive, clean, pressure-test, and return DPF units from anywhere in Kerala & all India.</p>
              </div>
            </div>
            <div className={styles.priceTag}>
              <span>DPF Cleaning Starts From</span>
              <strong>₹6,000</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Hi Quality Silencers. All Rights Reserved. ISO Certified OEM Specification Manufacturer & Professional DPF Cleaning Services.</p>
        </div>
      </div>
    </footer>
  );
}
