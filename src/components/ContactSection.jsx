'use client';

import { useState } from 'react';
import styles from './ContactSection.module.css';
import { LuMapPin, LuPhone, LuMail, LuExternalLink, LuBuilding, LuShare2, LuFacebook, LuInstagram, LuYoutube } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState('factory');

  const factoryMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.682855146816!2d75.8075!3d11.1738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTE8MTAnMjUuOCJOIDc1wrA0OCcyNy4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";
  const factoryGoogleLink = "https://maps.google.com/?q=Hi+Quality+Silencers+Beypore+Calicut+Kerala+673015";

  const salesMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8!2d75.7825!3d11.2685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTE8MTYnMDYuNiJOIDc1wrA0Nic1Ny4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";
  const salesGoogleLink = "https://share.google/AROzIKEhcgJSDgOcd";

  const currentMapUrl = activeTab === 'factory' ? factoryMapUrl : salesMapUrl;
  const currentGoogleLink = activeTab === 'factory' ? factoryGoogleLink : salesGoogleLink;

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>

        {/* Standard Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTitleRow}>
            <span className={styles.headerLine} />
            <h2 className={styles.headerTitle}>
              CONTACT <span className={styles.titleRed}>US</span>
            </h2>
            <span className={styles.headerLine} />
          </div>
          <p className={styles.headerSub}>
            Visit our factory or sales point in Calicut to explore our TUNEX® OEM specification silencer models and discuss your requirements.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Contact Information */}
          <div className={styles.leftCol}>
            <div className={styles.pillBadge}>
              DIRECT CONTACT
            </div>

            <div className={styles.infoList}>
              {/* Factory Address */}
              <div className={styles.infoRow}>
                <div className={styles.iconBadge}>
                  <LuMapPin />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>FACTORY ADDRESS</div>
                  <div className={styles.infoValue}>
                    47/1302C, Cheerpupalam, BC Road, Beypore,
                    <span className={styles.subText}>Calicut, Kerala – 673015</span>
                  </div>
                </div>
              </div>

              {/* Sales Point Address */}
              <div className={styles.infoRow}>
                <div className={styles.iconBadge}>
                  <LuBuilding />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>SALES POINT ADDRESS</div>
                  <div className={styles.infoValue}>
                    64/42 AV Building, Behind Ambika Hotel,
                    <span className={styles.subText}>Passport Office Cross Road, East Nadakkavu, Calicut – 673006</span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoRow}>
                <div className={styles.iconBadge}>
                  <LuPhone />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>PHONE</div>
                  <div className={styles.infoValue}>
                    <a href="tel:+919645888253" className={styles.infoLink}>+91 9645 888 253</a>
                    {'  |  '}
                    <a href="https://wa.me/919645888250" target="_blank" rel="noreferrer" className={styles.infoLink}>+91 9645 888 250 (WhatsApp)</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={styles.infoRow}>
                <div className={styles.iconBadge}>
                  <LuMail />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>EMAIL</div>
                  <div className={styles.infoValue}>
                    <a href="mailto:hiqualitysilencer@gmail.com" className={styles.infoLink}>hiqualitysilencer@gmail.com</a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className={styles.infoRow}>
                <div className={styles.iconBadge}>
                  <LuShare2 />
                </div>
                <div className={styles.infoContent}>
                  <div className={styles.infoLabel}>FOLLOW & CONNECT</div>
                  <div className={styles.socialList}>
                    <a
                      href="https://www.instagram.com/hi_quality_silencers?igsh=MXIwemZtNGhwaThyZw=="
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialItem}
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <LuInstagram />
                    </a>
                    <a
                      href="https://youtube.com/@silencerworld?si=yraHU90ehKv0nGuR"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialItem}
                      title="YouTube"
                      aria-label="YouTube"
                    >
                      <LuYoutube />
                    </a>
                    <a
                      href="https://www.facebook.com/share/1JCThxqeps/"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialItem}
                      title="Facebook"
                      aria-label="Facebook"
                    >
                      <LuFacebook />
                    </a>
                    <a
                      href="https://wa.me/919645888250"
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialItem}
                      title="WhatsApp"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Card */}
          <div className={styles.rightCol}>
            <div className={styles.mapCard}>
              {/* Overlay Top Bar */}
              <div className={styles.mapOverlayHeader}>
                <a
                  href={currentGoogleLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.openMapsBtn}
                >
                  Open in Maps <LuExternalLink size={13} />
                </a>

                {/* Location Switcher Pills */}
                <div className={styles.mapTabsPills}>
                  <button
                    type="button"
                    className={`${styles.mapTabPill} ${activeTab === 'factory' ? styles.mapTabPillActive : ''}`}
                    onClick={() => setActiveTab('factory')}
                  >
                    Factory (Beypore)
                  </button>
                  <button
                    type="button"
                    className={`${styles.mapTabPill} ${activeTab === 'sales' ? styles.mapTabPillActive : ''}`}
                    onClick={() => setActiveTab('sales')}
                  >
                    Sales Point (Nadakkavu)
                  </button>
                </div>
              </div>

              <iframe
                title="Location Map"
                src={currentMapUrl}
                className={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
