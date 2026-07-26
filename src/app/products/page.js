import Link from 'next/link';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';
import { FaArrowRight, FaCar, FaShuttleVan, FaTruck, FaCogs, FaWrench } from 'react-icons/fa';

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
    spec: 'Galvanised / Stainless Steel 1.6mm'
  },
  {
    id: 'prod-2',
    title: 'SUV SILENCERS',
    category: 'SUV & PICKUP',
    image: '/images/prod_suv_pickup.png',
    shortDesc: 'Robust silencers designed for SUVs and pickup trucks for powerful performance and acoustic dampening.',
    spec: 'Heavy Duty 2.0mm Steel'
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
    title: 'GENERATED SILENCERS',
    category: 'SPECIALIZED SILENCERS',
    image: '/images/prod_lcv.png',
    shortDesc: 'Precision generated silencers engineered for consistent flow dynamics, low backpressure and long service life.',
    spec: 'Industrial Heavy Drum Assembly'
  },
  {
    id: 'prod-5',
    title: 'CUSTOM SILENCERS',
    category: 'EMISSION CONTROL',
    image: '/images/prod_catalytic.png',
    shortDesc: 'Bespoke custom-built silencers tailored to exact vehicle specifications and customer performance requirements.',
    spec: 'Custom Flange & Baffle Tuning'
  }
];

async function getProducts() {
  try {
    const db = await connectDB();
    let dbProducts = [];
    if (db) {
      const items = await Product.find({}).sort({ createdAt: -1 }).lean();
      dbProducts = JSON.parse(JSON.stringify(items));
    } else {
      const data = getJsonDb();
      dbProducts = data.products || [];
    }

    const defaultIds = new Set(['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5']);
    const legacyKeywords = ['passenger car', 'suv & pickup', 'lcv silencers', 'truck & bus', 'catalytic converters', 'dpf / doc / scr'];

    const newFromDb = dbProducts.filter(p => {
      const pid = p.id || p._id;
      const t = (p.title || '').toLowerCase();
      if (defaultIds.has(pid)) return false;
      if (legacyKeywords.some(kw => t.includes(kw))) return false;
      return true;
    });

    return [...defaultCatalogProducts, ...newFromDb];
  } catch (err) {
    return defaultCatalogProducts;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '100px', paddingBottom: '4rem' }}>
        {/* Minimal Hero Header */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '3rem 1.5rem 2.5rem',
          textAlign: 'center',
          borderBottom: '3px solid #dc2626'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              display: 'block'
            }}>
              OEM EXHAUST CATALOG
            </span>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.5rem 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em'
            }}>
              ALL PRODUCT <span style={{ color: '#dc2626' }}>MODELS</span>
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
              Precision engineered silencers, DPF systems &amp; exhaust components for all vehicle segments.
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
              border-radius: 10px;
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
              height: 180px;
              padding: 1.25rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border-bottom: 1px solid #f1f5f9;
              position: relative;
            }
            .prod-page-img-wrap img {
              max-height: 130px;
              width: auto;
              object-fit: contain;
              transition: transform 0.3s ease;
            }
            .prod-page-card:hover .prod-page-img-wrap img {
              transform: scale(1.06);
            }
            .prod-page-badge {
              position: absolute;
              top: 10px;
              right: 10px;
              background: #dc2626;
              color: #ffffff;
              font-size: 0.65rem;
              font-weight: 800;
              padding: 3px 8px;
              border-radius: 4px;
              text-transform: uppercase;
            }
            .prod-page-body {
              padding: 1.25rem 1rem 1rem;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: #ffffff;
            }
            .prod-page-title {
              font-size: 0.88rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 0.4rem 0;
              text-transform: uppercase;
              letter-spacing: 0.01em;
            }
            .prod-page-desc {
              font-size: 0.76rem;
              color: #64748b;
              margin: 0 0 1rem 0;
              line-height: 1.45;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .prod-page-cta {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 0.65rem;
              border-top: 1px solid #f1f5f9;
              font-size: 0.72rem;
              font-weight: 800;
              color: #dc2626;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            @media (max-width: 1200px) {
              .prod-page-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (max-width: 768px) {
              .prod-page-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
              .prod-page-img-wrap { height: 140px; padding: 0.75rem; }
              .prod-page-img-wrap img { max-height: 100px; }
              .prod-page-body { padding: 0.85rem 0.75rem; }
              .prod-page-title { font-size: 0.78rem; }
              .prod-page-desc { font-size: 0.7rem; margin-bottom: 0.65rem; }
            }
          `}} />

          <div className="prod-page-grid">
            {products.map((p, idx) => (
              <Link href={`/products/${p.id || p._id || idx}`} key={`all-prod-${p.id || p._id || idx}-${idx}`} className="prod-page-card">
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
