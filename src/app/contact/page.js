'use client';

import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { FaArrowLeft } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '96px', paddingBottom: '2rem' }}>
        {/* Navigation Breadcrumb Bar */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#dc2626',
              fontSize: '0.78rem',
              fontWeight: '700',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <FaArrowLeft size={11} /> BACK TO HOME
            </Link>
          </div>
        </div>

        {/* 2-Column Contact Section (Badge, Address List, Map Card) */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
