import Link from 'next/link';
import Image from 'next/image';
import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import headerStyles from '@/components/Header.module.css';
import { connectDB, getJsonDb } from '@/lib/db';
import Product from '@/lib/models/Product';
import { FaCar, FaTruck, FaBus, FaCogs, FaWrench, FaShuttleVan, FaArrowRight } from 'react-icons/fa';

export const metadata = {
  title: "OEM Silencers & DPF Product Catalog | Hi Quality Silencers",
  description: "Browse our complete range of OEM specification silencers, DPF systems, catalytic converters, and heavy duty commercial exhaust components.",
};

async function getProducts() {
  try {
    const db = await connectDB();
    if (db) {
      const products = await Product.find({}).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(products));
    } else {
      const data = getJsonDb();
      return data.products || [];
    }
  } catch (err) {
    const data = getJsonDb();
    return data.products || [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f172a', color: '#ffffff' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .products-grid-5 {
          display: grid !important;
          grid-template-columns: repeat(5, 1fr) !important;
          gap: 1.25rem !important;
        }
        @media (max-width: 1200px) {
          .products-grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .products-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-grid-5 { grid-template-columns: 1fr !important; }
        }
        .prod-item-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }
        .prod-item-card:hover {
          transform: translateY(-5px);
          border-color: #dc2626;
          box-shadow: 0 12px 30px rgba(220, 38, 38, 0.2);
        }
        .prod-item-img-box {
          background: #ffffff;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }
        .prod-item-img-box img {
          max-height: 140px;
          width: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .prod-item-card:hover .prod-item-img-box img {
          transform: scale(1.06);
        }
        .prod-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #dc2626;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
      `}} />

      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '5rem' }}>
        {/* Page Banner */}
        <div style={{
          backgroundColor: '#090d16',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '3px solid #dc2626'
        }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#dc2626',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              display: 'block'
            }}>
              OEM EXHAUST CATALOG
            </span>
            <h1 style={{
              fontSize: '2.3rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              margin: '0 0 0.5rem 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em'
            }}>
              ALL PRODUCT <span style={{ color: '#dc2626' }}>MODELS</span>
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
              Precision engineered silencers, DPF systems &amp; exhaust components for all vehicle segments.
            </p>
          </div>
        </div>

        {/* 5 COLUMNS GRID LAYOUT */}
        <section className="container" style={{ maxWidth: '1400px', margin: '3rem auto 0', padding: '0 1.25rem' }}>
          <div className="products-grid-5">
            {products.map((p, idx) => (
              <Link href={`/products/${p.id || p._id || idx}`} key={p.id || p._id || idx} className="prod-item-card">
                <div className="prod-item-img-box">
                  <span className="prod-badge">{p.category || 'SILENCER'}</span>
                  <img
                    src={p.image || '/images/prod_passenger_car.png'}
                    alt={p.title}
                  />
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '800', textTransform: 'uppercase', color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.45',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {p.shortDesc || p.desc || 'High performance OEM specification silencer built for maximum durability.'}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify-content: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #334155',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#dc2626'
                  }}>
                    <span>VIEW DETAILS</span>
                    <FaArrowRight size={12} />
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
