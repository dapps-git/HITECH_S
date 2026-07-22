'use client';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'DPF Cleaning', href: '#dpf-cleaning' },
  { label: 'Process', href: '#cleaning-process' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <span className={styles.logoRed}>HI QUALITY</span>
          <span className={styles.logoWhite}>SILENCERS</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`${styles.navLink} ${i === 1 ? styles.active : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className={styles.actions}>
          <a href="tel:+919876543210" className={styles.callBtn}>
            <FaPhone /> <span>+91 98765 43210</span>
          </a>

          <button
            className={styles.burger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.mobileList}>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:+919876543210" className={styles.mobileCall}>
          <FaPhone /> Call Helpline: +91 98765 43210
        </a>
      </div>
    </header>
  );
}
