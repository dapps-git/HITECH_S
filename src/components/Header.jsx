'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import { LuMenu, LuX, LuDownload } from 'react-icons/lu';

const links = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/#about' },
  { label: 'PRODUCTS', href: '/products' },
  { label: 'SERVICES', href: '/#dpf-cleaning' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT US', href: '/#contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        {/* Hi Quality Silencers Logo */}
        <a href="/#hero" className={styles.logoLink}>
          <Image
            src="/images/logo_hq.png"
            alt="Hi Quality Silencers Logo"
            width={175}
            height={48}
            priority
            className={styles.logoImg}
          />
        </a>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
          <a
            href="/DPF FAQ 18.5 x 25 cm-3.pdf"
            download="Hi_Quality_DPF_FAQ_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.faqLink}
          >
            <LuDownload size={13} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} /> FAQ
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={styles.mobileMenuBtn}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <LuX size={24} /> : <LuMenu size={24} />}
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
            href="/DPF FAQ 18.5 x 25 cm-3.pdf"
            download="Hi_Quality_DPF_FAQ_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={styles.mobileFaqLink}
          >
            <LuDownload size={15} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} /> FAQ
          </a>
        </div>
      )}
    </nav>
  );
}


