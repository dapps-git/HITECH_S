import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "All Products | OEM Silencers & DPF Catalog | Hi Quality Silencers",
  description: "Browse our complete catalog of OEM specification silencers, DPF systems, catalytic converters, and custom commercial exhaust components.",
};

const defaultCatalogProducts = [
  {
    id: 'prod-1',
    title: 'CAR SILENCERS',
    category: 'PASSENGER CARS',
    image: '/images/prod_passenger_car.png',
    shortDesc: 'High performance OEM specification silencers for all passenger cars. Built for maximum durability.',
    spec: '1.6mm Galvanised Sheets or Pipe'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    category: 'SUV & PICKUP',
    image: '/images/prod_suv_pickup.png',
    shortDesc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance and acoustic dampening.',
    spec: '2.0mm Galvanised Sheets or Pipe'
  },
  {
    id: 'prod-3',
    title: 'COMMERCIAL VEHICLE SILENCERS',
    category: 'COMMERCIAL LCV',
    image: '/images/prod_truck_bus.png',
    shortDesc: 'Heavy duty silencers for LCVs, trucks, and commercial fleet vehicles with OEM precision fitment.',
    spec: 'OEM Grade Flange Fitment'
  },
  {
    id: 'prod-4',
    title: 'GENERATOR SILENCERS',
    category: 'SPECIALIZED SILENCERS',
    image: '/images/prod_lcv.png',
    shortDesc: 'Precision generator silencers engineered for consistent flow dynamics, low backpressure and long service life.',
    spec: 'Industrial Heavy Drum Assembly'
  },
  {
    id: 'prod-5',
    title: 'CUSTOM SILENCERS',
    category: 'CUSTOM FABRICATION',
    image: '/images/prod_catalytic.png',
    shortDesc: 'Bespoke custom-built silencers tailored to exact vehicle specifications and customer performance requirements.',
    spec: 'Custom Flange & Baffle Tuning'
  }
];

async function getProducts() {
  const urlsToTry = [
    'http://localhost:5000/api/products',
    `${process.env.NEXT_PUBLIC_API_URL || 'https://tweaki.pw/hiquality/admin'}/api/products`
  ];

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;

      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        const defaultIds = new Set(['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5']);
        const legacyKeywords = [
          'passenger car silencers', 'suv & pickup silencers', 'lcv silencers',
          'truck & bus silencers', 'catalytic converters', 'dpf / doc / scr'
        ];

        const newFromApi = data.products.filter(p => {
          const pid = p.id || String(p._id);
          const t = (p.title || '').toLowerCase();
          if (defaultIds.has(pid)) return false;
          if (legacyKeywords.some(kw => t.includes(kw))) return false;
          return true;
        });

        return [...defaultCatalogProducts, ...newFromApi];
      }
    } catch (err) {}
  }
  return defaultCatalogProducts;
}

import BackButton from '@/components/BackButton';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '4rem' }}>
        {/* Page Hero Header */}
        <div className="prod-hero-header" style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          padding: '1.5rem 1.25rem 1.25rem',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative'
        }}>
          <div className="prod-hero-back" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', padding: '0 0.5rem 0.5rem' }}>
            <BackButton />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="prod-hero-badge" style={{
              fontSize: '0.68rem',
              fontWeight: '700',
              color: '#dc2626',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
              display: 'block'
            }}>
              ALL PRODUCTS CATALOG
            </span>
            <h1 className="prod-hero-title" style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.3rem 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em',
              color: '#0f172a'
            }}>
              OEM SILENCER <span style={{ color: '#dc2626' }}>MODELS</span>
            </h1>
            <p className="prod-hero-sub" style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, fontWeight: '400' }}>
              Select a model below to view full specifications &amp; technical details.
            </p>
          </div>
        </div>

        {/* 5-Column Responsive Minimal Grid */}
        <section style={{ maxWidth: '1400px', margin: '2.5rem auto 0', padding: '0 1.25rem' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .prod-page-grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 1.25rem;
            }
            .prod-page-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 0;
              overflow: hidden;
              box-shadow: 0 4px 16px rgba(0,0,0,0.04);
              transition: all 0.25s ease;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              color: inherit;
            }
            .prod-page-card:hover {
              transform: translateY(-5px);
              border-color: #dc2626;
              box-shadow: 0 12px 30px rgba(220, 38, 38, 0.15);
            }
            .prod-page-img-wrap {
              background: #ffffff;
              height: 160px;
              padding: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border-bottom: 1px solid #f1f5f9;
              position: relative;
            }
            .prod-page-img-wrap img {
              max-height: 120px;
              width: auto;
              object-fit: contain;
              transition: transform 0.3s ease;
            }
            .prod-page-card:hover .prod-page-img-wrap img {
              transform: scale(1.06);
            }
            .prod-page-badge {
              position: absolute;
              top: 8px;
              right: 8px;
              background: #fef2f2;
              color: #dc2626;
              border: 1px solid #fecaca;
              font-size: 0.56rem;
              font-weight: 600;
              padding: 2px 6px;
              border-radius: 3px;
              text-transform: uppercase;
              letter-spacing: 0.02em;
            }
            .prod-page-body {
              padding: 1rem 0.85rem 0.85rem;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: #ffffff;
            }
            .prod-page-title {
              font-size: 0.82rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 0.35rem 0;
              text-transform: uppercase;
              letter-spacing: 0.01em;
              line-height: 1.25;
            }
            .prod-page-desc {
              font-size: 0.72rem;
              color: #64748b;
              margin: 0 0 0.75rem 0;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .prod-page-cta {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 0.55rem;
              border-top: 1px solid #f1f5f9;
              font-size: 0.68rem;
              font-weight: 800;
              color: #dc2626;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            @media (max-width: 1200px) {
              .prod-page-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (max-width: 768px) {
              .prod-hero-header { padding: 0.85rem 1rem 0.75rem !important; }
              .prod-hero-title { font-size: 1.15rem !important; margin-bottom: 0.15rem !important; }
              .prod-hero-sub { display: none !important; }
              .prod-hero-badge { font-size: 0.62rem !important; margin-bottom: 0.15rem !important; }
              .prod-hero-back { padding-bottom: 0.35rem !important; }
              .prod-page-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-top: 0.85rem !important; }
              .prod-page-img-wrap { height: 120px; padding: 0.5rem; }
              .prod-page-img-wrap img { max-height: 90px; }
              .prod-page-body { padding: 0.65rem 0.55rem; }
              .prod-page-title { font-size: 0.75rem; }
              .prod-page-desc { font-size: 0.65rem; margin-bottom: 0.4rem; }
            }
          `}} />

          <div className="prod-page-grid">
            {products.map((p, idx) => (
              <Link
                href={`/products/${p.id || p._id || idx}`}
                key={`all-prod-${p.id || p._id || idx}-${idx}`}
                className="prod-page-card"
              >
                <div className="prod-page-img-wrap">
                  <span className="prod-page-badge">{p.category || 'SILENCER'}</span>
                  <img
                    src={p.image || '/images/prod_passenger_car.png'}
                    alt={p.title}
                  />
                </div>
                <div className="prod-page-body">
                  <div>
                    <h3 className="prod-page-title">{p.title}</h3>
                    <p className="prod-page-desc">
                      {p.shortDesc || p.desc || 'High performance OEM specification silencer built for maximum durability.'}
                    </p>
                  </div>
                  <div className="prod-page-cta">
                    <span>VIEW DETAILS</span>
                    <FaArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
