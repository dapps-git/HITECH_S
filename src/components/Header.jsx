'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import { LuMessageCircle, LuMenu, LuX } from 'react-icons/lu';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        {/* 15 Logo image — Height 60px */}
        <a href="#hero" className={styles.logoLink}>
          <Image
            src="/images/15.webp"
            alt="Hi Quality Silencers - 15 Years Experience"
            width={120}
            height={60}
            priority
            className={styles.logoImg}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </a>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
        </div>

        {/* WhatsApp CTA Link */}
        <a
          href="https://wa.me/919645888250"
          target="_blank"
          rel="noreferrer"
          className={styles.navCta}
        >
          <LuMessageCircle size={15} /> +91 9645 888 250
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={styles.mobileMenuBtn}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <LuX size={26} /> : <LuMenu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={styles.mobileDrawerLink}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/919645888250"
            target="_blank"
            rel="noreferrer"
            className={styles.mobileDrawerCta}
          >
            <LuMessageCircle size={16} /> +91 9645 888 250
          </a>
        </div>
      )}
    </nav>
  );
}
