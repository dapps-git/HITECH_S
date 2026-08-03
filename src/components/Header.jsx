'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { LuMenu, LuX, LuDownload } from 'react-icons/lu';
import TopTicker from './TopTicker';

const links = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/#about' },
  { label: 'PRODUCTS', href: '/products' },
  { label: 'SERVICES', href: '/services' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT US', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e, href) => {
    setMobileOpen(false);

    if (href === '/') {
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className={styles.headerWrapper}>
      <TopTicker />
      <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        {/* Hi Quality Silencers Logo */}
        <Link href="/" onClick={(e) => handleNavClick(e, '/')} className={styles.logoLink}>
          <Image
            src="/images/logo_hq.png"
            alt="Hi Quality Silencers Logo"
            width={175}
            height={48}
            priority
            className={styles.logoImg}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={styles.navLink}
            >
              {l.label}
            </Link>
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
            <Link
              key={l.label}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={styles.mobileDrawerLink}
            >
              {l.label}
            </Link>
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
    </header>
  );
}

